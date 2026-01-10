/**
 * LOADING DEMO - Pagina dimostrativa per skeleton loaders
 * 
 * Questa pagina mostra tutti i componenti skeleton disponibili
 * e permette di testare il comportamento di caricamento.
 */

import React, { useState, useEffect } from 'react';
import {
  Skeleton,
  SkeletonAvatar,
  SkeletonText,
  SkeletonUserCard,
  SkeletonAccessCard,
  SkeletonTable,
  SkeletonStatsCard,
  SkeletonDashboard,
} from '@/components/SkeletonLoader';
import EducationalNote from '@/components/EducationalNote';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw, Sparkles } from 'lucide-react';

const LoadingDemo: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [simulatedData, setSimulatedData] = useState<string | null>(null);

  // Simula caricamento iniziale
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setSimulatedData('Dati caricati con successo!');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleReload = () => {
    setIsLoading(true);
    setSimulatedData(null);
    setTimeout(() => {
      setIsLoading(false);
      setSimulatedData('Dati ricaricati!');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-xl bg-accent/20 animate-float">
            <Sparkles className="w-8 h-8 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Skeleton Loaders</h1>
            <p className="text-muted-foreground">
              Componenti di caricamento con effetto shimmer
            </p>
          </div>
        </div>

        <EducationalNote type="learn" title="Perché usare gli Skeleton?">
          <p>
            Gli skeleton loader migliorano la <strong>perceived performance</strong> 
            dell'app. Invece di mostrare uno spinner generico, mostrano la struttura 
            del contenuto che sta per apparire, riducendo l'ansia dell'attesa.
          </p>
        </EducationalNote>
      </div>

      {/* Demo interattiva */}
      <div className="glass-card rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Demo Interattiva</h2>
          <Button
            onClick={handleReload}
            variant="outline"
            size="sm"
            disabled={isLoading}
            className="hover-scale"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            {isLoading ? 'Caricamento...' : 'Ricarica'}
          </Button>
        </div>

        <div className="min-h-[120px] flex items-center justify-center">
          {isLoading ? (
            <div className="w-full">
              <SkeletonUserCard />
            </div>
          ) : (
            <div className="glass-card rounded-xl p-6 w-full animate-scale-in border-success/30">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-success">{simulatedData}</h3>
                  <p className="text-muted-foreground">
                    Il contenuto è stato caricato correttamente
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Catalogo componenti */}
      <h2 className="text-2xl font-bold mb-6">Catalogo Componenti</h2>

      <div className="grid gap-8">
        {/* Skeleton Base */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="font-semibold mb-4">Skeleton Base</h3>
          <div className="flex gap-4 items-center">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <Skeleton className="h-8 w-32 rounded-md" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-24 rounded-full" />
          </div>
        </div>

        {/* Avatar */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="font-semibold mb-4">Avatar Skeleton</h3>
          <div className="flex gap-6 items-center">
            <div className="text-center">
              <SkeletonAvatar size="sm" />
              <span className="text-xs text-muted-foreground mt-2 block">Small</span>
            </div>
            <div className="text-center">
              <SkeletonAvatar size="md" />
              <span className="text-xs text-muted-foreground mt-2 block">Medium</span>
            </div>
            <div className="text-center">
              <SkeletonAvatar size="lg" />
              <span className="text-xs text-muted-foreground mt-2 block">Large</span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="font-semibold mb-4">Text Skeleton</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <span className="text-xs text-muted-foreground mb-2 block">1 linea</span>
              <SkeletonText lines={1} />
            </div>
            <div>
              <span className="text-xs text-muted-foreground mb-2 block">3 linee</span>
              <SkeletonText lines={3} />
            </div>
            <div>
              <span className="text-xs text-muted-foreground mb-2 block">5 linee</span>
              <SkeletonText lines={5} />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="font-semibold mb-4">Stats Cards</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <SkeletonStatsCard />
            <SkeletonStatsCard />
            <SkeletonStatsCard />
          </div>
        </div>

        {/* Access Cards */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="font-semibold mb-4">Access Cards</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SkeletonAccessCard />
            <SkeletonAccessCard />
            <SkeletonAccessCard />
          </div>
        </div>

        {/* Table */}
        <div>
          <h3 className="font-semibold mb-4">Table Skeleton</h3>
          <SkeletonTable rows={4} />
        </div>

        {/* Full Dashboard */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="font-semibold mb-4">Dashboard Completa</h3>
          <div className="p-4 bg-background/50 rounded-lg">
            <SkeletonDashboard />
          </div>
        </div>
      </div>

      {/* Codice esempio */}
      <div className="glass-card rounded-xl p-6 mt-8">
        <h3 className="font-semibold mb-4">Come Usare</h3>
        <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
          <pre className="text-muted-foreground">
{`import { Skeleton, SkeletonTable } from '@/components/SkeletonLoader';

// Uso condizionale
{isLoading ? (
  <SkeletonTable rows={5} />
) : (
  <DataTable data={users} />
)}

// Skeleton custom
<Skeleton className="h-20 w-full rounded-xl" />`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default LoadingDemo;
