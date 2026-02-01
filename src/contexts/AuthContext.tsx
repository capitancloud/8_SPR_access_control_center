/**
 * AUTH CONTEXT - Contesto di Autenticazione con Codice di Accesso
 * 
 * ⚠️ IMPORTANTE: Questo è un contesto EDUCATIVO per dimostrare i concetti.
 * In produzione, l'autenticazione DEVE essere gestita lato server!
 * 
 * PERCHÉ I CONTROLLI VANNO FATTI LATO SERVER?
 * 
 * 1. Il codice frontend è PUBBLICO - Chiunque può vedere il JavaScript nel browser
 * 2. Il localStorage/sessionStorage sono MODIFICABILI - Un utente malintenzionato
 *    può semplicemente aprire la console e modificare i valori
 * 3. Le richieste HTTP sono INTERCETTABILI - I controlli client-side possono essere bypassati
 * 
 * IN PRODUZIONE dovresti:
 * - Usare JWT tokens firmati dal server
 * - Validare OGNI richiesta sul server prima di restituire dati sensibili
 * - Usare un servizio come Supabase, Firebase Auth, o Auth0
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { verifyAccessCode } from '@/lib/hashUtils';

// Definizione dei tipi di ruolo disponibili
export type UserRole = 'admin' | 'user' | null;

// Struttura dell'utente (simulata)
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Tipo per il contesto di autenticazione
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isCodeVerified: boolean;
  isAdmin: boolean;
  isUser: boolean;
  isLoading: boolean;
  error: string | null;
  loginWithCode: (code: string) => Promise<boolean>;
  login: (role: UserRole) => void;
  logout: () => void;
  logoutCompletely: () => void;
  switchRole: (role: UserRole) => void;
}

// Creazione del contesto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Utenti simulati per la demo
const MOCK_USERS: Record<string, User> = {
  admin: {
    id: 'admin-001',
    name: 'Mario Rossi',
    email: 'admin@example.com',
    role: 'admin',
  },
  user: {
    id: 'user-001',
    name: 'Giulia Bianchi',
    email: 'user@example.com',
    role: 'user',
  },
};

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider - Fornisce il contesto di autenticazione a tutta l'app
 * 
 * NOTA EDUCATIVA:
 * Questo provider simula l'autenticazione per scopi didattici.
 * In un'app reale, lo stato dell'utente verrebbe:
 * 1. Recuperato da un token JWT sicuro
 * 2. Validato ad ogni richiesta dal server
 * 3. Gestito tramite un sistema di sessioni sicuro
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * LOGIN CON CODICE DI ACCESSO
   * 
   * Verifica il codice inserito confrontando l'hash SHA-256.
   * 
   * ⚠️ ATTENZIONE: In produzione, questa verifica dovrebbe:
   * 1. Avvenire sul server
   * 2. Usare algoritmi più robusti (bcrypt, Argon2)
   * 3. Includere rate limiting e protezione brute force
   */
  const loginWithCode = useCallback(async (code: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simula un ritardo di rete
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const isValid = await verifyAccessCode(code);
      
      if (isValid) {
        setIsCodeVerified(true);
        console.log('🔐 [SIMULAZIONE] Codice di accesso verificato tramite hash');
        console.log('⚠️ In produzione, questa verifica avverrebbe sul server!');
        return true;
      } else {
        setError('Codice di accesso non valido');
        console.log('❌ [SIMULAZIONE] Codice errato');
        return false;
      }
    } catch (err) {
      setError('Errore durante la verifica del codice');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * LOGIN SIMULATO (selezione ruolo)
   * 
   * ⚠️ ATTENZIONE: In produzione, il login dovrebbe:
   * 1. Inviare le credenziali al server in modo sicuro (HTTPS)
   * 2. Il server verifica le credenziali nel database
   * 3. Il server genera un token JWT firmato
   * 4. Il client salva il token (HttpOnly cookie preferito)
   * 5. Ogni richiesta successiva include il token per la validazione
   */
  const login = useCallback((role: UserRole) => {
    if (role && MOCK_USERS[role]) {
      setUser(MOCK_USERS[role]);
      console.log(`🔐 [SIMULAZIONE] Login effettuato come ${role}`);
      console.log('⚠️ In produzione, questo verrebbe verificato dal server!');
    }
  }, []);

  /**
   * LOGOUT (solo dal ruolo, mantiene accesso all'app)
   * In produzione: invalidare il token sul server
   */
  const logout = useCallback(() => {
    setUser(null);
    console.log('🔓 [SIMULAZIONE] Logout dal ruolo effettuato');
  }, []);

  /**
   * LOGOUT COMPLETO (torna alla schermata di accesso)
   */
  const logoutCompletely = useCallback(() => {
    setUser(null);
    setIsCodeVerified(false);
    setError(null);
    console.log('🔓 [SIMULAZIONE] Logout completo - Ritorno alla schermata di accesso');
  }, []);

  /**
   * SWITCH ROLE - Solo per demo
   * In produzione: MAI permettere il cambio ruolo lato client!
   */
  const switchRole = useCallback((role: UserRole) => {
    if (role && MOCK_USERS[role]) {
      setUser(MOCK_USERS[role]);
      console.log(`🔄 [DEMO] Ruolo cambiato a ${role}`);
      console.log('⚠️ Questo è solo per demo! Mai fare questo in produzione!');
    }
  }, []);

  // Valori derivati per comodità
  const isAuthenticated = user !== null;
  const isAdmin = user?.role === 'admin';
  const isUser = user?.role === 'user';

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isCodeVerified,
    isAdmin,
    isUser,
    isLoading,
    error,
    loginWithCode,
    login,
    logout,
    logoutCompletely,
    switchRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook personalizzato per usare il contesto di autenticazione
 * 
 * BEST PRACTICE: Creare un hook dedicato invece di usare useContext direttamente
 * Questo permette di:
 * 1. Aggiungere validazione (il context deve esistere)
 * 2. Migliorare l'esperienza sviluppatore con messaggi di errore chiari
 * 3. Facilitare i test
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth deve essere usato dentro un AuthProvider');
  }
  
  return context;
};
