// ponytail: stub — real auth pending. All functions are no-ops / return null.
// getSession/clearSession/findAccount/saveSession existed in deleted auth.ts (plaintext passwords).
// Replace this stub with real auth (JWT, Supabase, etc.) before enabling auth pages.

export const ACCOUNTS: never[] = [];

export function getSession(): null { return null; }
export function clearSession(): void {}
export function findAccount(_email: string, _password: string): null { return null; }
export function saveSession(_account: unknown): void {}
