/**
 * SKELETON LOADER - Componenti di caricamento con effetto shimmer
 * 
 * Questi componenti mostrano placeholder animati durante il caricamento dei dati.
 * Migliorano la UX dando feedback visivo all'utente.
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

// Base skeleton con effetto shimmer
export const Skeleton: React.FC<SkeletonProps> = ({ className, style }) => (
  <div
    className={cn(
      'relative overflow-hidden rounded-md bg-secondary/50',
      'before:absolute before:inset-0',
      'before:bg-gradient-to-r before:from-transparent before:via-muted/30 before:to-transparent',
      'before:animate-shimmer',
      className
    )}
    style={style}
  />
);

// Skeleton per avatar/immagini circolari
export const SkeletonAvatar: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };
  return <Skeleton className={cn('rounded-full', sizes[size])} />;
};

// Skeleton per testo (linee)
export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 1, 
  className 
}) => (
  <div className={cn('space-y-2', className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        className={cn(
          'h-4',
          i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'
        )}
        style={{ animationDelay: `${i * 0.1}s` }}
      />
    ))}
  </div>
);

// Skeleton per card utente
export const SkeletonUserCard: React.FC = () => (
  <div className="glass-card rounded-xl p-6 animate-fade-in">
    <div className="flex items-center gap-4 mb-4">
      <SkeletonAvatar size="lg" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>
      <Skeleton className="h-8 w-20 rounded-full" />
    </div>
    <SkeletonText lines={2} />
  </div>
);

// Skeleton per access card
export const SkeletonAccessCard: React.FC = () => (
  <div className="glass-card rounded-xl p-6 animate-fade-in">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
      <Skeleton className="h-7 w-20 rounded-full" />
    </div>
    <Skeleton className="h-4 w-32 mb-4" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  </div>
);

// Skeleton per tabella
export const SkeletonTable: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="glass-card rounded-xl overflow-hidden animate-fade-in">
    {/* Header */}
    <div className="bg-secondary/50 p-4 flex gap-4">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-1/6" />
      <Skeleton className="h-4 w-1/6" />
      <Skeleton className="h-4 w-1/6" />
      <Skeleton className="h-4 w-1/6 ml-auto" />
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, i) => (
      <div
        key={i}
        className="p-4 border-b border-border/50 flex items-center gap-4"
        style={{ animationDelay: `${i * 0.05}s` }}
      >
        <div className="flex items-center gap-3 flex-1">
          <SkeletonAvatar />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-5 w-14" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    ))}
  </div>
);

// Skeleton per stats card
export const SkeletonStatsCard: React.FC = () => (
  <div className="p-4 rounded-lg bg-secondary/30 border border-border/50 animate-fade-in">
    <Skeleton className="h-8 w-16 mb-2" />
    <Skeleton className="h-4 w-24" />
  </div>
);

// Skeleton per dashboard completa
export const SkeletonDashboard: React.FC = () => (
  <div className="space-y-6 animate-fade-in">
    {/* Header */}
    <div className="flex items-center gap-4 mb-8">
      <Skeleton className="w-14 h-14 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="h-8 w-28 rounded-full ml-4" />
    </div>

    {/* Note educativa skeleton */}
    <Skeleton className="h-24 w-full rounded-lg" />

    {/* Grid di cards */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonAccessCard key={i} />
      ))}
    </div>
  </div>
);
