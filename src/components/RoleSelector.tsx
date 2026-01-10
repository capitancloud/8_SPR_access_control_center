/**
 * ROLE SELECTOR - Selettore di ruolo per demo
 * 
 * Questo componente permette di cambiare ruolo per testare l'app.
 * 
 * ⚠️ SOLO PER SCOPI EDUCATIVI!
 * In produzione, MAI permettere il cambio ruolo lato client!
 */

import React from 'react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Crown, User, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';

const RoleSelector: React.FC = () => {
  const { user, login, logout, isAuthenticated } = useAuth();

  const roles: { role: UserRole; label: string; icon: React.ReactNode; description: string }[] = [
    {
      role: 'admin',
      label: 'Admin',
      icon: <Crown className="w-5 h-5" />,
      description: 'Accesso completo a tutte le funzionalità',
    },
    {
      role: 'user',
      label: 'User',
      icon: <User className="w-5 h-5" />,
      description: 'Accesso limitato alle funzionalità base',
    },
  ];

  return (
    <div className="glass-card rounded-xl p-6 animate-slide-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/20">
          <LogIn className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">Seleziona un Ruolo</h3>
          <p className="text-sm text-muted-foreground">
            Scegli un ruolo per esplorare l'app
          </p>
        </div>
      </div>

      <div className="grid gap-3">
        {roles.map(({ role, label, icon, description }) => {
          const isSelected = user?.role === role;
          const isAdminRole = role === 'admin';

          return (
            <button
              key={role}
              onClick={() => login(role)}
              className={cn(
                'p-4 rounded-lg border text-left transition-all duration-300',
                'hover:scale-[1.02] active:scale-[0.98]',
                isSelected
                  ? isAdminRole
                    ? 'bg-admin/20 border-admin/50 glow-admin'
                    : 'bg-user/20 border-user/50 glow-user'
                  : 'bg-secondary/50 border-border hover:bg-secondary'
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'p-2 rounded-lg',
                    isSelected
                      ? isAdminRole
                        ? 'bg-admin/30 text-admin'
                        : 'bg-user/30 text-user'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{label}</div>
                  <div className="text-sm text-muted-foreground">{description}</div>
                </div>
                {isSelected && (
                  <div
                    className={cn(
                      'px-2 py-1 rounded text-xs font-medium',
                      isAdminRole ? 'bg-admin text-admin-foreground' : 'bg-user text-user-foreground'
                    )}
                  >
                    Attivo
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {isAuthenticated && (
        <button
          onClick={logout}
          className="w-full mt-4 p-3 rounded-lg border border-destructive/30 text-destructive 
                     hover:bg-destructive/10 transition-colors text-sm font-medium"
        >
          Esci dall'account
        </button>
      )}

      {/* Nota educativa */}
      <div className="mt-4 p-3 rounded-lg bg-warning/10 border border-warning/30 text-xs">
        <p className="text-warning font-medium mb-1">⚠️ Solo per Demo</p>
        <p className="text-muted-foreground">
          In produzione, il ruolo viene assegnato dal server durante l'autenticazione
          e non può essere modificato dal client.
        </p>
      </div>
    </div>
  );
};

export default RoleSelector;
