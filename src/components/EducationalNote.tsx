/**
 * EDUCATIONAL NOTE - Componente per note educative
 * 
 * Usato per mostrare informazioni didattiche nel contesto dell'app.
 */

import React, { ReactNode } from 'react';
import { Info, AlertTriangle, CheckCircle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

type NoteType = 'info' | 'warning' | 'success' | 'learn';

interface EducationalNoteProps {
  type?: NoteType;
  title: string;
  children: ReactNode;
  className?: string;
}

const noteConfig = {
  info: {
    icon: Info,
    bgClass: 'bg-primary/10 border-primary/30',
    iconClass: 'text-primary',
    titleClass: 'text-primary',
  },
  warning: {
    icon: AlertTriangle,
    bgClass: 'bg-warning/10 border-warning/30',
    iconClass: 'text-warning',
    titleClass: 'text-warning',
  },
  success: {
    icon: CheckCircle,
    bgClass: 'bg-success/10 border-success/30',
    iconClass: 'text-success',
    titleClass: 'text-success',
  },
  learn: {
    icon: BookOpen,
    bgClass: 'bg-accent/10 border-accent/30',
    iconClass: 'text-accent',
    titleClass: 'text-accent',
  },
};

const EducationalNote: React.FC<EducationalNoteProps> = ({
  type = 'info',
  title,
  children,
  className,
}) => {
  const config = noteConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'rounded-lg border p-4 animate-slide-in',
        config.bgClass,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn('w-5 h-5 mt-0.5 flex-shrink-0', config.iconClass)} />
        <div className="flex-1 min-w-0">
          <h4 className={cn('font-medium mb-1', config.titleClass)}>{title}</h4>
          <div className="text-sm text-muted-foreground space-y-2">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default EducationalNote;
