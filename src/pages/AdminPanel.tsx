/**
 * ADMIN PANEL - Pannello di Amministrazione
 * 
 * Questa pagina è accessibile SOLO agli amministratori.
 * È protetta da ProtectedRoute con adminOnly={true}.
 * 
 * ⚠️ ATTENZIONE - CONCETTO CHIAVE:
 * 
 * Anche se questa pagina è "protetta" lato client, qualsiasi
 * operazione sensibile (come modificare utenti, cambiare impostazioni)
 * DEVE essere verificata sul server.
 * 
 * Perché?
 * 1. Il JavaScript del client può essere modificato
 * 2. Le richieste HTTP possono essere fatte direttamente
 * 3. Il localStorage/state può essere manipolato
 * 
 * La protezione lato client serve solo per migliorare la UX,
 * non per la sicurezza reale.
 */

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import EducationalNote from '@/components/EducationalNote';
import {
  Settings,
  Shield,
  AlertTriangle,
  Database,
  Users,
  Activity,
  Trash2,
  RefreshCw,
  Server,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  
  // Stati locali per le impostazioni demo
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [debugMode, setDebugMode] = useState(false);

  /**
   * SIMULAZIONE DI OPERAZIONE ADMIN
   * 
   * In produzione, questa funzione farebbe una chiamata API.
   * Il server verificherebbe il ruolo dell'utente PRIMA di
   * eseguire qualsiasi operazione.
   */
  const handleDangerousAction = (action: string) => {
    console.log('🔴 [ADMIN ACTION]', action);
    console.log('⚠️ In produzione, il server verificherebbe i permessi!');
    
    toast.info(`Azione "${action}" simulata`, {
      description: 'In produzione, il server verificherebbe il ruolo prima di eseguire.',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-xl gradient-admin">
            <Settings className="w-8 h-8 text-admin-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Pannello Admin</h1>
            <p className="text-muted-foreground">
              Gestione avanzata del sistema
            </p>
          </div>
        </div>

        <EducationalNote type="warning" title="Pagina Protetta - Solo Admin">
          <p>
            Questa pagina è accessibile solo perché il tuo ruolo è <strong>admin</strong>.
            Se fossi un utente normale, vedresti un messaggio di accesso negato.
          </p>
          <p className="mt-2">
            Ma ricorda: questa protezione è solo lato client! Le operazioni
            critiche richiedono verifica lato server.
          </p>
        </EducationalNote>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* System Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Stato Sistema
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-success/10 border border-success/30">
                <div className="text-2xl font-bold text-success">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                <div className="text-2xl font-bold text-primary">1,234</div>
                <div className="text-sm text-muted-foreground">Utenti Attivi</div>
              </div>
              <div className="p-4 rounded-lg bg-warning/10 border border-warning/30">
                <div className="text-2xl font-bold text-warning">23</div>
                <div className="text-sm text-muted-foreground">Richieste/sec</div>
              </div>
            </div>
          </div>

          {/* System Controls */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Server className="w-5 h-5 text-primary" />
              Controlli Sistema
            </h2>
            
            <div className="space-y-4">
              {/* Maintenance Mode Toggle */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                <div>
                  <div className="font-medium">Modalità Manutenzione</div>
                  <div className="text-sm text-muted-foreground">
                    Disabilita l'accesso per gli utenti normali
                  </div>
                </div>
                <Switch
                  checked={maintenanceMode}
                  onCheckedChange={(checked) => {
                    setMaintenanceMode(checked);
                    handleDangerousAction(
                      checked ? 'Attiva manutenzione' : 'Disattiva manutenzione'
                    );
                  }}
                />
              </div>

              {/* Debug Mode Toggle */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                <div>
                  <div className="font-medium">Modalità Debug</div>
                  <div className="text-sm text-muted-foreground">
                    Abilita logging dettagliato
                  </div>
                </div>
                <Switch
                  checked={debugMode}
                  onCheckedChange={(checked) => {
                    setDebugMode(checked);
                    handleDangerousAction(
                      checked ? 'Attiva debug' : 'Disattiva debug'
                    );
                  }}
                />
              </div>
            </div>
          </div>

          {/* Dangerous Operations */}
          <div className="glass-card rounded-xl p-6 border-destructive/30">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Operazioni Pericolose
            </h2>
            
            <EducationalNote type="warning" title="Controlli Server-Side" className="mb-4">
              <p>
                Queste operazioni sarebbero SEMPRE verificate sul server.
                Anche se un utente malintenzionato bypassasse questa UI,
                il server rifiuterebbe la richiesta se non fosse admin.
              </p>
            </EducationalNote>

            <div className="grid sm:grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="border-warning/50 text-warning hover:bg-warning/10"
                onClick={() => handleDangerousAction('Clear Cache')}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Svuota Cache
              </Button>
              
              <Button
                variant="outline"
                className="border-destructive/50 text-destructive hover:bg-destructive/10"
                onClick={() => handleDangerousAction('Reset Database')}
              >
                <Database className="w-4 h-4 mr-2" />
                Reset Test DB
              </Button>
              
              <Button
                variant="outline"
                className="border-destructive/50 text-destructive hover:bg-destructive/10"
                onClick={() => handleDangerousAction('Delete Inactive Users')}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Elimina Inattivi
              </Button>
              
              <Button
                variant="outline"
                className="border-destructive/50 text-destructive hover:bg-destructive/10"
                onClick={() => handleDangerousAction('Force Logout All')}
              >
                <Users className="w-4 h-4 mr-2" />
                Logout Globale
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Admin Info */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg gradient-admin">
                <Shield className="w-5 h-5 text-admin-foreground" />
              </div>
              <div>
                <div className="font-medium">{user?.name}</div>
                <div className="text-sm text-admin">Amministratore</div>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID:</span>
                <span className="font-mono">{user?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span>{user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ruolo:</span>
                <span className="text-admin font-medium">{user?.role}</span>
              </div>
            </div>
          </div>

          {/* Code Example */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="font-semibold mb-3">Verifica Server-Side</h3>
            <div className="p-3 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
              <pre className="text-muted-foreground">
{`// Edge Function / API Route
async function handleAdminAction(req) {
  // 1. Verifica il token JWT
  const token = req.headers.authorization;
  const user = await verifyJWT(token);
  
  // 2. Controlla il ruolo
  if (user.role !== 'admin') {
    return { 
      error: 'Forbidden',
      status: 403 
    };
  }
  
  // 3. Esegui l'azione
  return executeAction();
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
