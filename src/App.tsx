/**
 * APP COMPONENT - Root dell'applicazione
 * 
 * Questo file configura:
 * - Il provider di autenticazione (AuthProvider)
 * - Il routing con rotte protette
 * - I componenti globali (Toaster, Header)
 * - La schermata di login con codice di accesso
 * 
 * NOTA EDUCATIVA:
 * Le rotte sono protette con il componente ProtectedRoute.
 * Questo è un pattern comune in React per gestire l'autorizzazione.
 * Tuttavia, ricorda che questa protezione è solo lato client!
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context per l'autenticazione
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Componenti
import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pagine
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import UsersManagement from "./pages/UsersManagement";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * AppContent - Contenuto dell'app che richiede l'AuthContext
 * 
 * Mostra la pagina di login se il codice non è stato verificato,
 * altrimenti mostra l'app normale.
 */
const AppContent = () => {
  const { isCodeVerified } = useAuth();

  // Se il codice non è stato verificato, mostra la pagina di login
  if (!isCodeVerified) {
    return <LoginPage />;
  }

  return (
    <>
      {/* Header sempre visibile dopo il login */}
      <Header />
      
      <Routes>
        {/* 
          ROTTA PUBBLICA (dopo aver inserito il codice)
          Accessibile a tutti, anche utenti non autenticati.
        */}
        <Route path="/" element={<Index />} />
        
        {/* 
          ROTTA PROTETTA - Richiede autenticazione
          Qualsiasi utente autenticato (admin o user) può accedere.
          
          Il componente ProtectedRoute verifica:
          1. L'utente è autenticato?
          2. Se no → reindirizza alla home
          3. Se sì → mostra la pagina
          
          ⚠️ RICORDA: Questa protezione è solo lato client!
        */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        {/* 
          ROTTA ADMIN-ONLY
          Solo gli utenti con ruolo "admin" possono accedere.
          
          adminOnly={true} aggiunge un controllo extra:
          - L'utente deve essere autenticato
          - E deve avere il ruolo "admin"
          
          ⚠️ Un attaccante potrebbe bypassare questo controllo
          modificando il localStorage o il codice JavaScript.
          Per questo le API devono sempre verificare i permessi!
        */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        
        {/* 
          ALTRA ROTTA ADMIN-ONLY
          La gestione utenti è riservata agli amministratori.
        */}
        <Route
          path="/users"
          element={
            <ProtectedRoute adminOnly>
              <UsersManagement />
            </ProtectedRoute>
          }
        />
        
        
        {/* Catch-all per 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* 
        AuthProvider wrappa tutta l'app per fornire il contesto di autenticazione.
        In produzione, qui si collegherebbe a un servizio come Supabase Auth.
      */}
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
