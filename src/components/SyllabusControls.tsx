import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Copy, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SyllabusControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  expandedChapters: Set<string>;
  toggleAllChapters: () => void;
  showSelected: boolean;
  setShowSelected: (show: boolean) => void;
  checkedItems: Set<string>;
  getSelectedTopics: () => string[];
}

const SyllabusControls: React.FC<SyllabusControlsProps> = ({
  searchTerm,
  setSearchTerm,
  expandedChapters,
  toggleAllChapters,
  showSelected,
  setShowSelected,
  checkedItems,
  getSelectedTopics
}) => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    const selectedTopics = getSelectedTopics().join('\n');
    navigator.clipboard.writeText(selectedTopics);
    toast({
      title: "Copied to clipboard!",
      description: `${checkedItems.size} topics copied successfully.`,
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
      <div className="flex items-center gap-2 w-full lg:w-auto">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search topics and chapters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white/80 backdrop-blur-sm border-white/30 focus:border-primary/50"
        />
      </div>
      
      <div className="flex flex-wrap gap-2 items-center">
        <Button 
          onClick={toggleAllChapters}
          variant="outline"
          className="bg-white/80 backdrop-blur-sm border-white/30 hover:bg-white/90 text-gray-800"
        >
          {expandedChapters.size > 0 ? 'Collapse All' : 'Expand All'}
        </Button>

        <Button 
          onClick={() => setShowSelected(!showSelected)}
          variant="outline"
          className="bg-white/80 backdrop-blur-sm border-white/30 hover:bg-white/90 text-gray-800"
        >
          <Eye className="h-4 w-4 mr-2" />
          {showSelected ? 'Show All' : 'View Selected'}
        </Button>

        <Button 
          onClick={copyToClipboard}
          disabled={checkedItems.size === 0}
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy Selected ({checkedItems.size})
        </Button>
      </div>
    </div>
  );
};

export default SyllabusControls;