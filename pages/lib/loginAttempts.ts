// Este objeto almacena los intentos fallidos y el estado de bloqueo de las IPs
interface AttemptData {
    attempts: number;
    blockedUntil: number | null;
  }
  
  const loginAttempts: Record<string, AttemptData> = {}; // Objeto para almacenar intentos
  
  const MAX_ATTEMPTS = 5; // Máximo número de intentos fallidos
  const BLOCK_TIME = 10 * 60 * 1000; // Tiempo de bloqueo en milisegundos (10 minutos)
  
  export const isBlocked = (ip: string): boolean => {
    const data = loginAttempts[ip];
    if (data && data.blockedUntil && data.blockedUntil > Date.now()) {
      return true; // La IP está bloqueada
    }
    return false;
  };
  
  export const recordFailedAttempt = (ip: string) => {
    if (!loginAttempts[ip]) {
      loginAttempts[ip] = { attempts: 0, blockedUntil: null };
    }
    loginAttempts[ip].attempts += 1;
  
    if (loginAttempts[ip].attempts >= MAX_ATTEMPTS) {
      // Bloquear la IP si se exceden los intentos fallidos
      loginAttempts[ip].blockedUntil = Date.now() + BLOCK_TIME;
    }
  };
  
  export const resetAttempts = (ip: string) => {
    delete loginAttempts[ip]; // Resetear los intentos después de un login exitoso
  };
  