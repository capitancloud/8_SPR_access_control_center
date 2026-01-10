/**
 * HOME PAGE - Pagina principale dell'Access Control Center
 * 
 * Questa pagina introduce i concetti di autorizzazione e permette
 * di selezionare un ruolo per esplorare l'applicazione.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import RoleSelector from '@/components/RoleSelector';
import EducationalNote from '@/components/EducationalNote';
import { Shield, ArrowRight, Code, Server, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
        
        {/* Animated circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6 animate-slide-in">
              <Shield className="w-4 h-4" />
              App Educativa
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-in">
              <span className="gradient-text">Access Control</span>
              <br />
              <span className="text-foreground">Center</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-in">
              Impara come funzionano i <strong>ruoli</strong> e i <strong>permessi</strong> nelle 
              applicazioni web moderne. Sperimenta con diversi livelli di accesso.
            </p>

            {isAuthenticated && (
              <div className="flex flex-wrap justify-center gap-4 animate-slide-in">
                <Button asChild size="lg" className="group">
                  <Link to="/dashboard">
                    Vai alla Dashboard
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                {isAdmin && (
                  <Button asChild variant="outline" size="lg">
                    <Link to="/admin">
                      Pannello Admin
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Role Selector */}
          <div className="max-w-md mx-auto">
            <RoleSelector />
          </div>
        </div>
      </section>

      {/* Educational Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Cosa Imparerai
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <EducationalNote type="learn" title="Autenticazione vs Autorizzazione">
              <p>
                <strong>Autenticazione</strong>: Chi sei? (login)
              </p>
              <p>
                <strong>Autorizzazione</strong>: Cosa puoi fare? (permessi)
              </p>
            </EducationalNote>

            <EducationalNote type="info" title="Ruoli e Permessi">
              <p>
                I ruoli (admin, user) raggruppano permessi. Un utente con ruolo "admin" 
                ha accesso a funzionalità riservate.
              </p>
            </EducationalNote>

            <EducationalNote type="warning" title="Sicurezza Lato Server">
              <p>
                I controlli frontend sono solo per UX. La vera sicurezza 
                è sempre implementata sul <strong>server</strong>.
              </p>
            </EducationalNote>
          </div>
        </div>
      </section>

      {/* Key Concepts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">
            Concetti Chiave
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Client-side */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-warning/20">
                  <Code className="w-6 h-6 text-warning" />
                </div>
                <h3 className="text-lg font-semibold">Controlli Lato Client</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-warning">⚠️</span>
                  <span>Nascondere elementi dell'UI in base al ruolo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-warning">⚠️</span>
                  <span>Reindirizzare utenti non autorizzati</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-warning">⚠️</span>
                  <span>Migliorare l'esperienza utente</span>
                </li>
              </ul>
              <div className="mt-4 p-3 rounded-lg bg-destructive/10 text-xs text-destructive">
                ❌ NON sono sicuri! Possono essere bypassati.
              </div>
            </div>

            {/* Server-side */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-success/20">
                  <Server className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-lg font-semibold">Controlli Lato Server</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>Validare token JWT ad ogni richiesta</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>Verificare permessi prima di eseguire azioni</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>Proteggere dati sensibili nelle API</span>
                </li>
              </ul>
              <div className="mt-4 p-3 rounded-lg bg-success/10 text-xs text-success">
                ✓ Sicuri! L'utente non può modificare il codice server.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Lock className="w-4 h-4" />
            <span>Access Control Center - App Educativa</span>
          </div>
          <p>Impara i concetti di autorizzazione in modo interattivo</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
