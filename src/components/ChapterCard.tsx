import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CheckCircle2, Circle, ChevronDown, ChevronRight, Minus } from 'lucide-react';

interface ChapterCardProps {
  chapterId: string;
  chapterName: string;
  topics: string[];
  isExpanded: boolean;
  isFullyChecked: boolean;
  isPartiallyChecked: boolean;
  onToggleChapter: () => void;
  onToggleWholeChapter: () => void;
  onToggleItem: (itemId: string) => void;
  checkedItems: Set<string>;
  standard: string;
}

const ChapterCard: React.FC<ChapterCardProps> = ({
  chapterId,
  chapterName,
  topics,
  isExpanded,
  isFullyChecked,
  isPartiallyChecked,
  onToggleChapter,
  onToggleWholeChapter,
  onToggleItem,
  checkedItems,
  standard
}) => {
  const getChapterIcon = () => {
    if (isFullyChecked) return <CheckCircle2 className="h-5 w-5 text-green-600" />;
    if (isPartiallyChecked) return <Minus className="h-5 w-5 text-yellow-600" />;
    return <Circle className="h-5 w-5 text-gray-400" />;
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/30 overflow-hidden">
      <Collapsible open={isExpanded} onOpenChange={onToggleChapter}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between p-4 hover:bg-white/90 transition-colors">
            <div className="flex items-center gap-3">
              <div 
                className="cursor-pointer hover:scale-110 transition-transform"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWholeChapter();
                }}
              >
                {getChapterIcon()}
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-800">{chapterName}</h3>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                  {standard}
                </Badge>
              </div>
              <Badge variant="secondary" className="bg-white/60 text-gray-800">
                {topics.length} topics
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-800" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-800" />
              )}
            </div>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="px-4 pb-4 space-y-2">
            <Separator className="mb-4" />
            {topics.map((topic, index) => {
              const topicId = `${chapterId}-${topic}`;
              const isChecked = checkedItems.has(topicId);
              
              return (
                <div 
                  key={index} 
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/60 hover:bg-white/80 transition-colors group"
                >
                  <div 
                    className="w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
                    onClick={() => onToggleItem(topicId)}
                  >
                    {isChecked && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                  </div>
                  <span className="flex-1 text-sm text-gray-800 group-hover:text-gray-900">
                    {topic}
                  </span>
                </div>
              );
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default ChapterCard;