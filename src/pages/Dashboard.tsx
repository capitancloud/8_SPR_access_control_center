/**
 * DASHBOARD PAGE - Pagina protetta per utenti autenticati
 * 
 * Questa pagina è accessibile sia da admin che da user.
 * Mostra come l'interfaccia cambia in base al ruolo.
 * 
 * NOTA IMPORTANTE:
 * Questa rotta è protetta da ProtectedRoute che verifica l'autenticazione.
 * Tuttavia, ricorda che questa protezione è solo lato client!
 * 
 * Se questa pagina facesse chiamate API per recuperare dati,
 * ogni API dovrebbe verificare l'autorizzazione indipendentemente.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import RoleBadge from '@/components/RoleBadge';
import AccessCard from '@/components/AccessCard';
import EducationalNote from '@/components/EducationalNote';
import {
  LayoutDashboard,
  User,
  Settings,
  FileText,
  Bell,
  BarChart3,
  Users,
  Database,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard: React.FC = () => {
  const { user, isAdmin } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-xl bg-primary/20">
            <LayoutDashboard className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Benvenuto, {user?.name}!
            </p>
          </div>
          <RoleBadge role={user?.role ?? null} size="lg" />
        </div>

        {/* Info banner basato sul ruolo */}
        {isAdmin ? (
          <EducationalNote type="success" title="Accesso Completo">
            <p>
              Come <strong>Amministratore</strong>, hai accesso a tutte le funzionalità.
              Puoi vedere le sezioni riservate agli admin.
            </p>
          </EducationalNote>
        ) : (
          <EducationalNote type="info" title="Accesso Limitato">
            <p>
              Come <strong>Utente</strong>, hai accesso alle funzionalità base.
              Alcune sezioni sono riservate agli amministratori.
            </p>
          </EducationalNote>
        )}
      </div>

      {/* Access Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Card accessibile a tutti gli utenti autenticati */}
        <AccessCard
          title="Profilo Personale"
          description="Visualizza e modifica i tuoi dati"
          requiredRole="any"
          icon={<User className="w-5 h-5" />}
        >
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Nome:</span>
              <span>{user?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Email:</span>
              <span>{user?.email}</span>
            </div>
          </div>
        </AccessCard>

        {/* Card accessibile a tutti gli utenti autenticati */}
        <AccessCard
          title="I Miei Documenti"
          description="Gestisci i tuoi file personali"
          requiredRole="any"
          icon={<FileText className="w-5 h-5" />}
        >
          <p className="text-sm text-muted-foreground">
            3 documenti disponibili
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Visualizza
          </Button>
        </AccessCard>

        {/* Card accessibile a tutti gli utenti autenticati */}
        <AccessCard
          title="Notifiche"
          description="Le tue notifiche recenti"
          requiredRole="any"
          icon={<Bell className="w-5 h-5" />}
        >
          <p className="text-sm text-muted-foreground">
            2 notifiche non lette
          </p>
        </AccessCard>

        {/* Card SOLO per admin */}
        <AccessCard
          title="Statistiche Sistema"
          description="Metriche e analytics globali"
          requiredRole="admin"
          icon={<BarChart3 className="w-5 h-5" />}
        >
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Utenti totali:</span>
              <span className="text-success">1,234</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Attivi oggi:</span>
              <span className="text-primary">156</span>
            </div>
          </div>
        </AccessCard>

        {/* Card SOLO per admin */}
        <AccessCard
          title="Gestione Utenti"
          description="Amministra gli account utente"
          requiredRole="admin"
          icon={<Users className="w-5 h-5" />}
        >
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link to="/users">
              Apri Gestione
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </AccessCard>

        {/* Card SOLO per admin */}
        <AccessCard
          title="Configurazione DB"
          description="Impostazioni database"
          requiredRole="admin"
          icon={<Database className="w-5 h-5" />}
        >
          <p className="text-sm text-muted-foreground">
            PostgreSQL v15.2 - Connesso
          </p>
        </AccessCard>
      </div>

      {/* Educational Section */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold">Cosa sta succedendo?</h2>
        </div>

        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            Questa pagina dimostra come l'<strong>interfaccia utente</strong> cambia 
            in base al ruolo. Le card con il lucchetto rosso sono visibili ma bloccate
            per il tuo ruolo attuale.
          </p>

          <EducationalNote type="warning" title="Ricorda!">
            <p>
              Nascondere elementi UI non è sicurezza vera! Se queste card facessero 
              chiamate API, il server dovrebbe comunque verificare i permessi.
            </p>
            <p className="mt-2">
              Un utente malintenzionato potrebbe semplicemente chiamare l'API direttamente,
              bypassando completamente l'interfaccia.
            </p>
          </EducationalNote>

          <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs">
            <p className="text-muted-foreground mb-2">// Esempio di chiamata API sicura:</p>
            <pre className="text-foreground">
{`// 1. Il client invia la richiesta con il token
fetch('/api/admin/users', {
  headers: { 'Authorization': 'Bearer ' + token }
});

// 2. Il SERVER verifica il token e i permessi
// PRIMA di restituire i dati
if (!user.isAdmin) {
  return { error: 'Unauthorized', status: 403 };
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
