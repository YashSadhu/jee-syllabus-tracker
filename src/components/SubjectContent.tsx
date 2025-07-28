import React from 'react';
import ChapterCard from './ChapterCard';

interface SubjectContentProps {
  subjectData: {
    [standard: string]: {
      [chapter: string]: string[];
    };
  };
  subject: string;
  expandedChapters: Set<string>;
  isChapterFullyChecked: (chapterId: string, topics: string[]) => boolean;
  isChapterPartiallyChecked: (chapterId: string, topics: string[]) => boolean;
  toggleChapter: (chapterId: string) => void;
  toggleWholeChapter: (chapterId: string, topics: string[]) => void;
  toggleItem: (itemId: string) => void;
  checkedItems: Set<string>;
}

const SubjectContent: React.FC<SubjectContentProps> = ({
  subjectData,
  subject,
  expandedChapters,
  isChapterFullyChecked,
  isChapterPartiallyChecked,
  toggleChapter,
  toggleWholeChapter,
  toggleItem,
  checkedItems
}) => {
  return (
    <div className="space-y-6">
      {Object.entries(subjectData).map(([standard, chapters]) => (
        <div key={standard} className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2">
            {standard}
          </h2>
          <div className="space-y-4">
            {Object.entries(chapters).map(([chapterName, topics]) => {
              const chapterId = `${subject}-${standard}-${chapterName}`;
              
              return (
                <ChapterCard
                  key={chapterId}
                  chapterId={chapterId}
                  chapterName={chapterName}
                  topics={topics}
                  standard={standard}
                  isExpanded={expandedChapters.has(chapterId)}
                  isFullyChecked={isChapterFullyChecked(chapterId, topics)}
                  isPartiallyChecked={isChapterPartiallyChecked(chapterId, topics)}
                  onToggleChapter={() => toggleChapter(chapterId)}
                  onToggleWholeChapter={() => toggleWholeChapter(chapterId, topics)}
                  onToggleItem={toggleItem}
                  checkedItems={checkedItems}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubjectContent;