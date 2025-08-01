import { useState, useMemo, useEffect } from 'react';
import { CheckedItems } from '@/types/syllabus';
import { syllabusData } from '@/data/syllabusData';

// Local storage keys
const STORAGE_KEYS = {
  CHECKED_ITEMS: 'syllabus_checked_items',
  CHECKED_CHAPTERS: 'syllabus_checked_chapters',
  EXPANDED_CHAPTERS: 'syllabus_expanded_chapters'
};

// Helper functions for localStorage
const loadFromStorage = (key: string): Set<string> => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
};

const saveToStorage = (key: string, data: Set<string>) => {
  try {
    localStorage.setItem(key, JSON.stringify(Array.from(data)));
  } catch {
    // Silently fail if localStorage is not available
  }
};

export const useSyllabus = () => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(() => 
    loadFromStorage(STORAGE_KEYS.CHECKED_ITEMS)
  );
  const [checkedChapters, setCheckedChapters] = useState<Set<string>>(() => 
    loadFromStorage(STORAGE_KEYS.CHECKED_CHAPTERS)
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(() => 
    loadFromStorage(STORAGE_KEYS.EXPANDED_CHAPTERS)
  );
  const [showSelected, setShowSelected] = useState(false);

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CHECKED_ITEMS, checkedItems);
  }, [checkedItems]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CHECKED_CHAPTERS, checkedChapters);
  }, [checkedChapters]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.EXPANDED_CHAPTERS, expandedChapters);
  }, [expandedChapters]);

  const toggleItem = (itemId: string) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(itemId)) {
      newCheckedItems.delete(itemId);
    } else {
      newCheckedItems.add(itemId);
    }
    setCheckedItems(newCheckedItems);
    
    // Update chapter status
    updateChapterStatus(itemId, newCheckedItems);
  };

  const toggleChapter = (chapterId: string) => {
    const newExpandedChapters = new Set(expandedChapters);
    if (newExpandedChapters.has(chapterId)) {
      newExpandedChapters.delete(chapterId);
    } else {
      newExpandedChapters.add(chapterId);
    }
    setExpandedChapters(newExpandedChapters);
  };

  const toggleWholeChapter = (chapterId: string, topics: string[]) => {
    const newCheckedItems = new Set(checkedItems);
    const newCheckedChapters = new Set(checkedChapters);
    
    const topicIds = topics.map(topic => `${chapterId}-${topic}`);
    const allTopicsChecked = topicIds.every(id => checkedItems.has(id));
    
    if (allTopicsChecked) {
      // Uncheck all topics in chapter
      topicIds.forEach(id => newCheckedItems.delete(id));
      newCheckedChapters.delete(chapterId);
    } else {
      // Check all topics in chapter
      topicIds.forEach(id => newCheckedItems.add(id));
      newCheckedChapters.add(chapterId);
    }
    
    setCheckedItems(newCheckedItems);
    setCheckedChapters(newCheckedChapters);
  };

  const updateChapterStatus = (itemId: string, currentCheckedItems: Set<string>) => {
    const [, , chapterName] = itemId.split('-', 3);
    if (!chapterName) return;
    
    // Find all topics for this chapter
    let allTopicsForChapter: string[] = [];
    Object.entries(syllabusData).forEach(([subject, standards]) => {
      Object.entries(standards).forEach(([standard, chapters]) => {
        Object.entries(chapters).forEach(([chapter, topics]) => {
          if (chapter === chapterName) {
            allTopicsForChapter = topics.map(topic => `${subject}-${standard}-${chapter}-${topic}`);
          }
        });
      });
    });
    
    const allTopicsChecked = allTopicsForChapter.every(id => currentCheckedItems.has(id));
    const newCheckedChapters = new Set(checkedChapters);
    
    if (allTopicsChecked && allTopicsForChapter.length > 0) {
      newCheckedChapters.add(`${itemId.split('-').slice(0, 3).join('-')}`);
    } else {
      newCheckedChapters.delete(`${itemId.split('-').slice(0, 3).join('-')}`);
    }
    
    setCheckedChapters(newCheckedChapters);
  };

  const toggleAllChapters = () => {
    if (expandedChapters.size > 0) {
      setExpandedChapters(new Set());
    } else {
      const allChapters = new Set<string>();
      Object.entries(syllabusData).forEach(([subject, standards]) => {
        Object.entries(standards).forEach(([standard, chapters]) => {
          Object.keys(chapters).forEach(chapter => {
            allChapters.add(`${subject}-${standard}-${chapter}`);
          });
        });
      });
      setExpandedChapters(allChapters);
    }
  };

  const getSelectedTopics = () => {
    return Array.from(checkedItems);
  };

  const getProgressStats = () => {
    let totalTopics = 0;
    let checkedTopicsCount = 0;

    Object.entries(syllabusData).forEach(([subject, standards]) => {
      Object.entries(standards).forEach(([standard, chapters]) => {
        Object.entries(chapters).forEach(([chapter, topics]) => {
          totalTopics += topics.length;
          topics.forEach(topic => {
            const topicId = `${subject}-${standard}-${chapter}-${topic}`;
            if (checkedItems.has(topicId)) {
              checkedTopicsCount++;
            }
          });
        });
      });
    });

    const percentage = totalTopics > 0 ? Math.round((checkedTopicsCount / totalTopics) * 100) : 0;
    
    return {
      checked: checkedTopicsCount,
      total: totalTopics,
      percentage
    };
  };

  const isChapterFullyChecked = (chapterId: string, topics: string[]) => {
    return topics.every(topic => checkedItems.has(`${chapterId}-${topic}`));
  };

  const isChapterPartiallyChecked = (chapterId: string, topics: string[]) => {
    return topics.some(topic => checkedItems.has(`${chapterId}-${topic}`)) && 
           !isChapterFullyChecked(chapterId, topics);
  };

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return syllabusData;
    
    const filtered: typeof syllabusData = {};
    
    Object.entries(syllabusData).forEach(([subject, standards]) => {
      Object.entries(standards).forEach(([standard, chapters]) => {
        Object.entries(chapters).forEach(([chapter, topics]) => {
          const matchingTopics = topics.filter(topic =>
            topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chapter.toLowerCase().includes(searchTerm.toLowerCase())
          );
          
          if (matchingTopics.length > 0) {
            if (!filtered[subject]) filtered[subject] = {};
            if (!filtered[subject][standard]) filtered[subject][standard] = {};
            filtered[subject][standard][chapter] = matchingTopics;
          }
        });
      });
    });
    
    return filtered;
  }, [searchTerm]);

  return {
    checkedItems,
    checkedChapters,
    searchTerm,
    setSearchTerm,
    expandedChapters,
    showSelected,
    setShowSelected,
    toggleItem,
    toggleChapter,
    toggleWholeChapter,
    toggleAllChapters,
    getSelectedTopics,
    isChapterFullyChecked,
    isChapterPartiallyChecked,
    filteredData,
    getProgressStats
  };
};