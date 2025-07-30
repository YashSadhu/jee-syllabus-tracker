import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Calculator, Atom } from 'lucide-react';
import { useSyllabus } from '@/hooks/useSyllabus';
import SyllabusHeader from '@/components/SyllabusHeader';
import SyllabusControls from '@/components/SyllabusControls';
import SelectedTopicsView from '@/components/SelectedTopicsView';
import SubjectContent from '@/components/SubjectContent';

const Index = () => {
  const {
    checkedItems,
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
  } = useSyllabus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto p-6 max-w-6xl">
        <Card className="backdrop-blur-md bg-white/90 border-white/20 shadow-xl">
          <SyllabusHeader />

          <CardContent className="space-y-6">
            <SyllabusControls
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              expandedChapters={expandedChapters}
              toggleAllChapters={toggleAllChapters}
              showSelected={showSelected}
              setShowSelected={setShowSelected}
              checkedItems={checkedItems}
              getSelectedTopics={getSelectedTopics}
            />

            {showSelected && (
              <SelectedTopicsView
                checkedItems={checkedItems}
                getSelectedTopics={getSelectedTopics}
              />
            )}

            {!showSelected && (
              <Tabs defaultValue="Chemistry" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
                  <TabsTrigger value="Chemistry" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-400 data-[state=active]:to-red-600 data-[state=active]:text-white">
                    <Atom className="h-4 w-4 mr-2" />
                    Chemistry
                  </TabsTrigger>
                  <TabsTrigger value="Mathematics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-400 data-[state=active]:to-blue-600 data-[state=active]:text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Mathematics
                  </TabsTrigger>
                  <TabsTrigger value="Physics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-green-600 data-[state=active]:text-white">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Physics
                  </TabsTrigger>
                </TabsList>

                {Object.entries(filteredData).map(([subject, standards]) => (
                  <TabsContent key={subject} value={subject} className="mt-6">
                    <SubjectContent
                      subjectData={standards}
                      subject={subject}
                      expandedChapters={expandedChapters}
                      isChapterFullyChecked={isChapterFullyChecked}
                      isChapterPartiallyChecked={isChapterPartiallyChecked}
                      toggleChapter={toggleChapter}
                      toggleWholeChapter={toggleWholeChapter}
                      toggleItem={toggleItem}
                      checkedItems={checkedItems}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
