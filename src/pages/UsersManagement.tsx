/**
 * USERS MANAGEMENT - Gestione Utenti (Solo Admin)
 * 
 * Questa pagina mostra una lista di utenti simulati e le azioni
 * che un admin potrebbe eseguire.
 * 
 * OGNI operazione qui (modifica ruolo, ban utente, ecc.) dovrebbe
 * essere verificata sul server prima dell'esecuzione.
 */

import React, { useState } from 'react';
import EducationalNote from '@/components/EducationalNote';
import {
  Users,
  Search,
  MoreVertical,
  Shield,
  Ban,
  Trash2,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

// Dati simulati degli utenti
const MOCK_USERS = [
  {
    id: '1',
    name: 'Mario Rossi',
    email: 'mario@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Giulia Bianchi',
    email: 'giulia@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    name: 'Luca Verdi',
    email: 'luca@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-03-10',
  },
  {
    id: '4',
    name: 'Anna Neri',
    email: 'anna@example.com',
    role: 'user',
    status: 'banned',
    createdAt: '2024-01-05',
  },
  {
    id: '5',
    name: 'Paolo Gialli',
    email: 'paolo@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-04-01',
  },
];

const UsersManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users] = useState(MOCK_USERS);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /**
   * SIMULAZIONE AZIONE ADMIN
   * 
   * In produzione, queste funzioni farebbero chiamate API.
   * Il server DEVE verificare che l'utente sia admin PRIMA
   * di eseguire qualsiasi modifica.
   */
  const handleUserAction = (action: string, userName: string) => {
    console.log(`🔧 [ADMIN] ${action} per utente: ${userName}`);
    console.log('⚠️ In produzione: il server verificherebbe i permessi!');
    
    toast.info(`Azione "${action}" simulata`, {
      description: `Per l'utente: ${userName}`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-xl gradient-admin">
            <Users className="w-8 h-8 text-admin-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Gestione Utenti</h1>
            <p className="text-muted-foreground">
              Amministra gli account della piattaforma
            </p>
          </div>
        </div>

        <EducationalNote type="learn" title="Come Funziona in Produzione">
          <p>
            Quando clicchi su un'azione (es. "Ban Utente"), in un'app reale:
          </p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Il client invia una richiesta API con il token JWT</li>
            <li>Il server verifica che il token sia valido</li>
            <li>Il server verifica che l'utente sia un admin</li>
            <li>Solo allora esegue l'operazione sul database</li>
          </ol>
        </EducationalNote>
      </div>

      {/* Search Bar */}
      <div className="glass-card rounded-xl p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Cerca utenti per nome o email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary/50 border-border"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">
                  Utente
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground">
                  Ruolo
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground">
                  Stato
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground">
                  Registrato
                </th>
                <th className="text-right p-4 font-medium text-muted-foreground">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                >
                  {/* User Info */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-medium">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="p-4">
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin'
                          ? 'bg-admin/20 text-admin'
                          : 'bg-user/20 text-user'
                      }`}
                    >
                      <Shield className="w-3 h-3" />
                      {user.role === 'admin' ? 'Admin' : 'User'}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <div
                      className={`inline-flex items-center gap-1 text-sm ${
                        user.status === 'active'
                          ? 'text-success'
                          : 'text-destructive'
                      }`}
                    >
                      {user.status === 'active' ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Attivo
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" />
                          Bannato
                        </>
                      )}
                    </div>
                  </td>

                  {/* Created At */}
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {user.createdAt}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            handleUserAction('Visualizza Dettagli', user.name)
                          }
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Dettagli
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleUserAction('Modifica Ruolo', user.name)
                          }
                        >
                          <Users className="w-4 h-4 mr-2" />
                          Modifica Ruolo
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            handleUserAction(
                              user.status === 'active' ? 'Ban' : 'Unban',
                              user.name
                            )
                          }
                          className="text-warning"
                        >
                          <Ban className="w-4 h-4 mr-2" />
                          {user.status === 'active' ? 'Ban Utente' : 'Rimuovi Ban'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleUserAction('Elimina Account', user.name)
                          }
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Elimina
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            Nessun utente trovato per "{searchQuery}"
          </div>
        )}
      </div>

      {/* Educational Footer */}
      <div className="mt-8 glass-card rounded-xl p-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Perché la Verifica Server è Essenziale
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
            <p className="font-medium text-destructive mb-2">❌ Senza Verifica Server</p>
            <p className="text-muted-foreground">
              Un utente malintenzionato potrebbe modificare il JavaScript o 
              fare richieste HTTP direttamente, bypassando l'interfaccia 
              e ottenendo accesso non autorizzato.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-success/10 border border-success/30">
            <p className="font-medium text-success mb-2">✓ Con Verifica Server</p>
            <p className="text-muted-foreground">
              Ogni richiesta viene validata. Anche se il client è compromesso,
              il server rifiuta le operazioni non autorizzate, proteggendo
              i dati e le funzionalità sensibili.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
