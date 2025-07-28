import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

interface SelectedTopicsViewProps {
  checkedItems: Set<string>;
  getSelectedTopics: () => string[];
}

const SelectedTopicsView: React.FC<SelectedTopicsViewProps> = ({ 
  checkedItems, 
  getSelectedTopics 
}) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/30">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">
          Selected Topics ({checkedItems.size})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {checkedItems.size === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No topics selected yet.
          </p>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {getSelectedTopics().map((topic, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 p-2 rounded-lg bg-white/60 text-gray-800"
              >
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span className="text-sm">{topic.split('-').slice(3).join('-')}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SelectedTopicsView;