/**
 * ROLE BADGE - Badge visivo per mostrare il ruolo dell'utente
 * 
 * Questo componente mostra chiaramente quale ruolo ha l'utente attuale.
 * È un esempio di come l'UI cambia in base al ruolo.
 */

import React from 'react';
import { Shield, User, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserRole } from '@/contexts/AuthContext';

interface RoleBadgeProps {
  role: UserRole;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const RoleBadge: React.FC<RoleBadgeProps> = ({ 
  role, 
  size = 'md',
  showLabel = true 
}) => {
  // Configurazione visiva per ogni ruolo
  const roleConfig = {
    admin: {
      label: 'Amministratore',
      icon: ShieldAlert,
      className: 'bg-admin/20 text-admin border-admin/50 glow-admin',
      iconClassName: 'text-admin',
    },
    user: {
      label: 'Utente',
      icon: User,
      className: 'bg-user/20 text-user border-user/50 glow-user',
      iconClassName: 'text-user',
    },
    null: {
      label: 'Ospite',
      icon: Shield,
      className: 'bg-muted text-muted-foreground border-border',
      iconClassName: 'text-muted-foreground',
    },
  };

  const config = roleConfig[role ?? 'null'];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-1 gap-1',
    md: 'text-sm px-3 py-1.5 gap-2',
    lg: 'text-base px-4 py-2 gap-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border font-medium transition-all',
        sizeClasses[size],
        config.className
      )}
    >
      <Icon className={cn(iconSizes[size], config.iconClassName)} />
      {showLabel && <span>{config.label}</span>}
    </div>
  );
};

export default RoleBadge;
