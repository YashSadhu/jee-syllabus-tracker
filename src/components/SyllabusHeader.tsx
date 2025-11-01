import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { GraduationCap, CheckCircle, Target, ExternalLink } from 'lucide-react';

interface SyllabusHeaderProps {
  progressStats?: {
    checked: number;
    total: number;
    percentage: number;
  };
}

const SyllabusHeader = ({ progressStats }: SyllabusHeaderProps) => {
  const stats = progressStats || { checked: 0, total: 0, percentage: 0 };

  return (
    <CardHeader className="text-center space-y-6 relative">
      {/* Header Links */}
      <div className="absolute top-4 right-6 flex items-center gap-5 text-sm text-muted-foreground">
        <a
          href="https://perplexa.bolt.host/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-primary transition-colors"
          title="Dive deep into AI-powered performance insights"
        >
          perplexa.bolt.host <ExternalLink className="h-3 w-3" />
          <span className="hidden sm:inline text-xs italic text-muted-foreground">
            — where your results tell their story
          </span>
        </a>
        <a
          href="https://yessgate.bolt.host/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-primary transition-colors"
          title="Your main quiz platform"
        >
          yessgate.bolt.host <ExternalLink className="h-3 w-3" />
        </a>
        <a
          href="mailto:networks.yash@gmail.com"
          className="hover:text-primary transition-colors"
          title="Contact support"
        >
          networks.yash@gmail.com
        </a>
      </div>

      {/* Title Section */}
      <div className="flex items-center justify-center gap-3 pt-8">
        <div className="p-3 rounded-full bg-gradient-to-r from-primary to-secondary">
          <GraduationCap className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-4xl font-bold text-foreground">
          JEE Advanced Syllabus Checklist
        </CardTitle>
      </div>

      {/* Stats */}
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>{stats.checked} completed</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span>{stats.total} total topics</span>
          </div>
        </div>

        <div className="max-w-md mx-auto space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{stats.percentage}%</span>
          </div>
          <Progress value={stats.percentage} className="h-3" />
        </div>
      </div>
    </CardHeader>
  );
};

export default SyllabusHeader;
