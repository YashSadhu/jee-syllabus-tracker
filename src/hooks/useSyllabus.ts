import { useState, useMemo } from 'react';
import { CheckedItems } from '@/types/syllabus';
import { syllabusData } from '@/data/syllabusData';

export const useSyllabus = () => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [checkedChapters, setCheckedChapters] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [showSelected, setShowSelected] = useState(false);

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
    filteredData
  };
};