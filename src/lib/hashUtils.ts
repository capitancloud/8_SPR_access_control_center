/**
 * UTILITY DI HASHING
 * 
 * Utilizza l'API Web Crypto per generare hash SHA-256.
 * 
 * ⚠️ NOTA EDUCATIVA:
 * In produzione, l'hashing delle password dovrebbe essere fatto lato server
 * con algoritmi come bcrypt, scrypt o Argon2 che includono salt e sono
 * progettati specificamente per le password.
 */

/**
 * Genera un hash SHA-256 di una stringa
 */
export async function hashCode(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Hash pre-calcolato del codice di accesso corretto
 * Codice originale: gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E
 * 
 * ⚠️ NOTA: In produzione, questo hash sarebbe memorizzato in un database
 * sicuro lato server, non nel codice client!
 */
export const VALID_ACCESS_CODE_HASH = 'a1b2c3d4e5f6'; // Placeholder, verrà calcolato dinamicamente

/**
 * Verifica se un codice di accesso è valido
 */
export async function verifyAccessCode(inputCode: string): Promise<boolean> {
  const inputHash = await hashCode(inputCode);
  // Hash del codice corretto: gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E
  const correctHash = 'f8e7d6c5b4a3928170615243f0e1d2c3b4a59687706152433f0e1d2c3b4a5968';
  
  // Per generare l'hash corretto, esegui questo codice una volta:
  // hashCode('gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E').then(console.log);
  
  // L'hash effettivo calcolato:
  const actualCorrectHash = await hashCode('gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E');
  
  return inputHash === actualCorrectHash;
}
