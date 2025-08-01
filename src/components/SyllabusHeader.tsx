import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { GraduationCap, CheckCircle, Target } from 'lucide-react';

interface SyllabusHeaderProps {
  progressStats: {
    checked: number;
    total: number;
    percentage: number;
  };
}

const SyllabusHeader = ({ progressStats }: SyllabusHeaderProps) => {
  return (
    <CardHeader className="text-center space-y-6">
      <div className="flex items-center justify-center gap-3">
        <div className="p-3 rounded-full bg-gradient-to-r from-primary to-secondary">
          <GraduationCap className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-4xl font-bold text-foreground">
          JEE Advanced 2025 Syllabus Checklist
        </CardTitle>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>{progressStats.checked} completed</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span>{progressStats.total} total topics</span>
          </div>
        </div>
        
        <div className="max-w-md mx-auto space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progressStats.percentage}%</span>
          </div>
          <Progress value={progressStats.percentage} className="h-3" />
        </div>
      </div>
    </CardHeader>
  );
};

export default SyllabusHeader;