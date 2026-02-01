/**
 * LOGIN PAGE - Pagina di accesso con codice
 * 
 * Questa pagina richiede l'inserimento di un codice di accesso
 * per entrare nell'applicazione.
 * 
 * ⚠️ NOTA EDUCATIVA:
 * Il codice viene verificato tramite hash SHA-256.
 * In produzione, questa verifica dovrebbe avvenire lato server!
 */

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Lock, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import EducationalNote from '@/components/EducationalNote';

const LoginPage: React.FC = () => {
  const { loginWithCode, isLoading, error } = useAuth();
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      await loginWithCode(code);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
      
      {/* Animated circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo e titolo */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-primary/20 mb-4 animate-float">
            <Shield className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">Access Control</span>
          </h1>
          <p className="text-muted-foreground">
            Inserisci il codice di accesso per continuare
          </p>
        </div>

        {/* Form di login */}
        <div className="glass-card rounded-xl p-6 hover-glow transition-all duration-500 animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="accessCode" className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" />
                Codice di Accesso
              </Label>
              <div className="relative">
                <Input
                  id="accessCode"
                  type={showCode ? 'text' : 'password'}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Inserisci il codice..."
                  className="pr-12 font-mono"
                  autoComplete="off"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showCode ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Messaggio di errore */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm animate-fade-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              className="w-full group hover-lift"
              size="lg"
              disabled={isLoading || !code.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifica in corso...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Accedi
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Nota educativa */}
        <div className="mt-6 animate-fade-in opacity-0 stagger-3" style={{ animationFillMode: 'forwards' }}>
          <EducationalNote type="info" title="Come funziona?">
            <p>
              Il codice inserito viene trasformato in un <strong>hash SHA-256</strong> e 
              confrontato con l'hash memorizzato. Il codice originale non viene mai 
              salvato in chiaro.
            </p>
          </EducationalNote>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
