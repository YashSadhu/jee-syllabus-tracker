import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';

const SyllabusHeader = () => {
  return (
    <CardHeader className="text-center space-y-4">
      <div className="flex items-center justify-center gap-3">
        <div className="p-3 rounded-full bg-gradient-to-r from-primary to-secondary">
          <GraduationCap className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          JEE Advanced 2025 Syllabus Checklist
        </CardTitle>
      </div>
      <p className="text-lg text-muted-foreground">
        Track your preparation progress across all subjects (Class 11 & 12)
      </p>
    </CardHeader>
  );
};

export default SyllabusHeader;