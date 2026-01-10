/**
 * ACCESS CARD - Card per mostrare lo stato di accesso
 * 
 * Visualizza se l'utente ha accesso a una specifica funzionalità.
 */

import React, { ReactNode } from 'react';
import { Lock, Unlock, ShieldCheck, ShieldX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface AccessCardProps {
  title: string;
  description: string;
  requiredRole?: 'admin' | 'user' | 'any';
  icon?: ReactNode;
  children?: ReactNode;
}

const AccessCard: React.FC<AccessCardProps> = ({
  title,
  description,
  requiredRole = 'any',
  icon,
  children,
}) => {
  const { isAuthenticated, isAdmin, isUser } = useAuth();

  // Determina se l'utente ha accesso
  const hasAccess = (() => {
    if (!isAuthenticated) return false;
    if (requiredRole === 'any') return true;
    if (requiredRole === 'admin') return isAdmin;
    if (requiredRole === 'user') return isUser || isAdmin; // Admin ha tutti i privilegi
    return false;
  })();

  const roleLabels = {
    admin: 'Solo Admin',
    user: 'Utenti Registrati',
    any: 'Tutti gli Utenti',
  };

  return (
    <div
      className={cn(
        'glass-card rounded-xl p-6 transition-all duration-300',
        hasAccess
          ? 'border-success/30 hover:border-success/50'
          : 'border-destructive/30 opacity-60'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div
              className={cn(
                'p-2 rounded-lg',
                hasAccess ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
              )}
            >
              {icon}
            </div>
          )}
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>

        {/* Status indicator */}
        <div
          className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium',
            hasAccess
              ? 'bg-success/20 text-success'
              : 'bg-destructive/20 text-destructive'
          )}
        >
          {hasAccess ? (
            <>
              <Unlock className="w-3 h-3" />
              Accesso
            </>
          ) : (
            <>
              <Lock className="w-3 h-3" />
              Bloccato
            </>
          )}
        </div>
      </div>

      {/* Role requirement */}
      <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
        {hasAccess ? (
          <ShieldCheck className="w-4 h-4 text-success" />
        ) : (
          <ShieldX className="w-4 h-4 text-destructive" />
        )}
        <span>Richiede: {roleLabels[requiredRole]}</span>
      </div>

      {/* Content or locked message */}
      {hasAccess ? (
        <div className="space-y-3">{children}</div>
      ) : (
        <div className="p-4 rounded-lg bg-muted/50 text-center">
          <Lock className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {!isAuthenticated
              ? 'Effettua il login per accedere'
              : `Richiede privilegi: ${roleLabels[requiredRole]}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default AccessCard;
