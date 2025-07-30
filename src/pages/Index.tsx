import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Calculator, Atom, Zap, Cpu, Radio, CircuitBoard, Settings } from 'lucide-react';
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

  // Get subject names dynamically from the data
  const subjects = Object.keys(filteredData);
  const firstSubject = subjects[0] || 'mathematics';

  // Icon mapping for subjects
  const getSubjectIcon = (subject: string) => {
    const subjectLower = subject.toLowerCase();
    if (subjectLower.includes('math')) return Calculator;
    if (subjectLower.includes('network') || subjectLower.includes('signal')) return Radio;
    if (subjectLower.includes('electronic') || subjectLower.includes('device')) return Cpu;
    if (subjectLower.includes('analog') || subjectLower.includes('digital')) return CircuitBoard;
    if (subjectLower.includes('control')) return Settings;
    if (subjectLower.includes('communication')) return Zap;
    if (subjectLower.includes('electromagnet')) return Atom;
    return BookOpen;
  };

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
              <Tabs defaultValue={firstSubject} className="w-full">
                <TabsList className={`grid w-full grid-cols-${Math.min(subjects.length, 4)} bg-white/80 backdrop-blur-sm gap-1`}>
                  {subjects.map((subject, index) => {
                    const Icon = getSubjectIcon(subject);
                    const colors = [
                      'data-[state=active]:from-blue-400 data-[state=active]:to-blue-600',
                      'data-[state=active]:from-green-400 data-[state=active]:to-green-600', 
                      'data-[state=active]:from-purple-400 data-[state=active]:to-purple-600',
                      'data-[state=active]:from-red-400 data-[state=active]:to-red-600',
                      'data-[state=active]:from-yellow-400 data-[state=active]:to-yellow-600',
                      'data-[state=active]:from-pink-400 data-[state=active]:to-pink-600',
                      'data-[state=active]:from-indigo-400 data-[state=active]:to-indigo-600',
                      'data-[state=active]:from-teal-400 data-[state=active]:to-teal-600'
                    ];
                    return (
                      <TabsTrigger 
                        key={subject} 
                        value={subject} 
                        className={`data-[state=active]:bg-gradient-to-r ${colors[index % colors.length]} data-[state=active]:text-white text-sm`}
                      >
                        <Icon className="h-4 w-4 mr-1" />
                        <span className="truncate">{subject.replace(/([A-Z])/g, ' $1').trim()}</span>
                      </TabsTrigger>
                    );
                  })}
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
