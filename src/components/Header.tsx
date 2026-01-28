/**
 * HEADER - Intestazione dell'applicazione
 * 
 * Questo componente mostra come l'interfaccia cambia in base al ruolo.
 * I link di navigazione vengono mostrati/nascosti in base ai permessi.
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import RoleBadge from './RoleBadge';
import { Shield, Home, Users, Settings, BookOpen, LogOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();

  /**
   * NAVIGAZIONE BASATA SUI RUOLI
   * 
   * Ogni link ha una proprietà `requiredRole` che determina chi può vederlo.
   * Questo è un pattern comune per costruire menu dinamici.
   * 
   * ⚠️ RICORDA: Nascondere i link non protegge le rotte!
   * Le rotte devono essere protette anche lato server.
   */
  const navLinks = [
    { to: '/', label: 'Home', icon: Home, requiredRole: null },
    { to: '/dashboard', label: 'Dashboard', icon: BookOpen, requiredRole: 'any' as const },
    { to: '/admin', label: 'Admin Panel', icon: Settings, requiredRole: 'admin' as const },
    { to: '/users', label: 'Gestione Utenti', icon: Users, requiredRole: 'admin' as const },
  ];

  // Filtra i link in base al ruolo dell'utente
  const visibleLinks = navLinks.filter((link) => {
    if (link.requiredRole === null) return true;
    if (!isAuthenticated) return false;
    if (link.requiredRole === 'any') return true;
    if (link.requiredRole === 'admin') return isAdmin;
    return user?.role === link.requiredRole;
  });

  return (
    <header className="glass-card border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <span className="font-bold text-lg hidden sm:block">
              Access Control Center
            </span>
          </Link>

          {/* Navigazione */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {visibleLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                    'hover:scale-105 active:scale-95',
                    isActive
                      ? 'bg-primary/20 text-primary shadow-md shadow-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  )}
                >
                  <Icon className={cn("w-4 h-4 transition-transform duration-300", isActive && "animate-float")} />
                  <span className="hidden md:block">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="flex items-center gap-3">
            {isAuthenticated && user && (
              <>
                <RoleBadge role={user.role} size="sm" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:block ml-2">Esci</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
