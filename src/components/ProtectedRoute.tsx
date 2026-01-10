/**
 * PROTECTED ROUTE - Componente per Proteggere le Rotte
 * 
 * Questo componente dimostra come proteggere le rotte in React.
 * 
 * ⚠️ IMPORTANTE: LA PROTEZIONE LATO CLIENT NON È SICURA!
 * 
 * Questo componente serve SOLO per:
 * 1. Migliorare la UX nascondendo contenuti non accessibili
 * 2. Evitare che l'utente veda errori quando accede a pagine non autorizzate
 * 3. Guidare l'utente verso il login
 * 
 * La VERA protezione avviene sempre sul SERVER:
 * - Le API devono verificare l'autorizzazione prima di restituire dati
 * - I dati sensibili non devono MAI essere inviati al client non autorizzato
 * - Il server deve validare il token/sessione ad ogni richiesta
 */

import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Shield, Lock } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  /** 
   * Il ruolo richiesto per accedere alla rotta.
   * Se non specificato, basta essere autenticati.
   */
  requiredRole?: UserRole;
  /** 
   * Se true, solo gli admin possono accedere.
   * Shortcut per requiredRole="admin"
   */
  adminOnly?: boolean;
}

/**
 * ProtectedRoute
 * 
 * COME FUNZIONA:
 * 1. Controlla se l'utente è autenticato
 * 2. Se richiesto, verifica il ruolo dell'utente
 * 3. Se non autorizzato, mostra un messaggio o reindirizza
 * 
 * LIMITAZIONI (IMPORTANTE!):
 * - Questa protezione è SOLO lato client
 * - Un utente malintenzionato può:
 *   a) Modificare il localStorage/state
 *   b) Modificare il codice JavaScript
 *   c) Fare richieste HTTP direttamente alle API
 * 
 * SOLUZIONE:
 * Le API devono SEMPRE verificare l'autorizzazione indipendentemente
 * da cosa fa il frontend. Il frontend è solo per UX.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  adminOnly = false,
}) => {
  const { isAuthenticated, isAdmin, user } = useAuth();
  const location = useLocation();

  // Log educativo per mostrare cosa succede
  console.log('🛡️ [ProtectedRoute] Controllo accesso:', {
    path: location.pathname,
    isAuthenticated,
    userRole: user?.role,
    requiredRole: adminOnly ? 'admin' : requiredRole,
    // Questo commento mostra cosa il server dovrebbe fare:
    serverShouldVerify: '⚠️ Il server DEVE verificare questi stessi controlli!',
  });

  /**
   * STEP 1: Verifica autenticazione
   * 
   * Se l'utente non è autenticato, lo reindirizziamo alla home.
   * In produzione, potresti reindirizzare a /login
   */
  if (!isAuthenticated) {
    console.log('❌ [ProtectedRoute] Utente non autenticato - reindirizzo');
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  /**
   * STEP 2: Verifica ruolo admin (se richiesto)
   * 
   * ⚠️ NOTA: Questo controllo è facilmente bypassabile!
   * Il frontend può essere modificato, quindi il server DEVE
   * verificare i permessi per ogni operazione sensibile.
   */
  if (adminOnly && !isAdmin) {
    console.log('❌ [ProtectedRoute] Richiesto ruolo admin - accesso negato');
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-card rounded-lg p-8 max-w-md text-center animate-slide-in">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/20 flex items-center justify-center">
            <Lock className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Accesso Negato</h2>
          <p className="text-muted-foreground mb-4">
            Questa sezione richiede privilegi di <strong>Amministratore</strong>.
          </p>
          <div className="p-4 rounded-lg bg-warning/10 border border-warning/30 text-left text-sm">
            <p className="text-warning font-medium mb-2">💡 Nota Educativa:</p>
            <p className="text-muted-foreground">
              Questo blocco è lato client. Un attaccante potrebbe bypassarlo!
              Per questo il <strong>server</strong> deve sempre verificare i permessi
              prima di eseguire operazioni sensibili.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /**
   * STEP 3: Verifica ruolo specifico (se richiesto)
   */
  if (requiredRole && user?.role !== requiredRole) {
    console.log(`❌ [ProtectedRoute] Richiesto ruolo ${requiredRole} - accesso negato`);
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-card rounded-lg p-8 max-w-md text-center animate-slide-in">
          <Shield className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Ruolo Non Autorizzato</h2>
          <p className="text-muted-foreground">
            Questa sezione richiede il ruolo: <strong>{requiredRole}</strong>
          </p>
        </div>
      </div>
    );
  }

  // ✅ Tutti i controlli passati - renderizza il contenuto
  console.log('✅ [ProtectedRoute] Accesso autorizzato');
  return <>{children}</>;
};

export default ProtectedRoute;
