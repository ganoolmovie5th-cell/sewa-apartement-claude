// ─────────────────────────────────────────────────────────
// Kredensial akun — simpan di sini sampai ada backend/DB
// ─────────────────────────────────────────────────────────

export interface Account {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "admin" | "owner";
  avatar: string;
  phone?: string;
}

export const ACCOUNTS: Account[] = [
  // ── ADMIN ──
  {
    id: "admin-001",
    email: "admin@sewaapartement.id",
    password: "Admin@2024!",
    name: "Super Admin",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80",
  },
  // ── OWNER DEMO ──
  {
    id: "owner-001",
    email: "owner@sewaapartement.id",
    password: "Owner@2024!",
    name: "Budi Santoso",
    role: "owner",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    phone: "6281234501001",
  },
];

export function findAccount(email: string, password: string): Account | null {
  return (
    ACCOUNTS.find(
      (a) =>
        a.email.toLowerCase() === email.toLowerCase() &&
        a.password === password
    ) ?? null
  );
}

export const SESSION_KEY = "sewa-session";

export function saveSession(account: Account) {
  if (typeof window === "undefined") return;
  const session = {
    id: account.id,
    email: account.email,
    name: account.name,
    role: account.role,
    avatar: account.avatar,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}
