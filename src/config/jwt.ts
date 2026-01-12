// src/auth/jwt.ts
export function parseJwt<T = any>(token: string | null): T | null {
    if (!token) return null;
    const parts = token.split(".");

    if (parts.length !== 3) return null;
    try {
        const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
        const padded = base64 + "===".slice((base64.length + 3) % 4);
        const json = atob(padded);

        return JSON.parse(json) as T;
    } catch {
        return null;
    }
}

export function isExpired(token: string | null): boolean {
    const p = parseJwt<{ exp?: number }>(token);

    if (!p?.exp) return false;

    return Math.floor(Date.now() / 1000) >= p.exp;
}

export function getRoles(token: string | null): string[] {
    const p = parseJwt<{ role?: string | string[]; roles?: string[] }>(token);
    const raw = p?.roles ?? p?.role ?? [];
    const list = Array.isArray(raw) ? raw : raw ? [raw] : [];

    return list.map((r) => String(r).toUpperCase());
}
