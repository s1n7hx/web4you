/**
 * Cal.com scheduling helper and configuration.
 * Allows visitors to book discovery calls with Studio Admin via Cal.com.
 */

const STORAGE_KEY = "web4u_calcom_link";

export function getStoredCalLink(): string {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored?.trim()) return stored.trim();
  }
  const envLink = (import.meta as unknown as { env?: { VITE_CAL_LINK?: string } }).env?.VITE_CAL_LINK;
  if (envLink?.trim()) return envLink.trim();
  return "";
}

export function setStoredCalLink(link: string): void {
  if (typeof window !== "undefined") {
    const clean = normalizeCalHandle(link);
    if (clean) {
      localStorage.setItem(STORAGE_KEY, clean);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}

export function normalizeCalHandle(rawInput: string): string {
  if (!rawInput) return "";
  let clean = rawInput.trim();
  // Strip protocol and cal.com domain variations
  clean = clean.replace(/^https?:\/\/(?:app\.)?cal\.com\//i, "");
  // Strip trailing slashes or query parameters
  clean = clean.split("?")[0].replace(/\/+$/, "").replace(/^\/+/, "");
  return clean;
}

export function getCalComUrl(
  handleOrUrl?: string,
  name?: string,
  email?: string,
  notes?: string
): string {
  const effectiveHandle = normalizeCalHandle(handleOrUrl?.trim() || getStoredCalLink());
  if (!effectiveHandle) return "";

  const base = `https://cal.com/${effectiveHandle}`;
  const url = new URL(base);

  if (name?.trim()) url.searchParams.set("name", name.trim());
  if (email?.trim()) url.searchParams.set("email", email.trim());
  if (notes?.trim()) url.searchParams.set("notes", notes.trim());
  url.searchParams.set("theme", "dark");

  return url.toString();
}

/**
 * Initializes the Cal.com embed loader asynchronously if needed.
 */
export function initCalComScript(): void {
  if (typeof window === "undefined") return;
  if ((window as unknown as { Cal?: unknown }).Cal) return;

  (function (C: Window & typeof globalThis & { Cal?: unknown }, A: string, L: string) {
    const p = function (a: unknown, ar: IArguments) {
      (a as { q: unknown[] }).q.push(ar);
    };
    const d = C.document;
    const existingCal = C.Cal as { loaded?: boolean; ns?: Record<string, unknown>; q?: unknown[] } | undefined;
    
    C.Cal = existingCal || function () {
      const cal = C.Cal as { loaded?: boolean; ns?: Record<string, unknown>; q?: unknown[] };
      const ar = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        const script = d.createElement("script");
        script.src = A;
        script.async = true;
        d.head.appendChild(script);
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api: { (...args: unknown[]): void; q?: unknown[] } = function () {
          p(api, arguments);
        };
        const namespace = ar[1] as string;
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns![namespace] = api;
          p(api, ar);
        } else {
          p(cal, ar);
        }
        return;
      }
      p(cal, ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");

  try {
    const w = window as unknown as { Cal: (cmd: string, opt?: Record<string, unknown>) => void };
    if (typeof w.Cal === "function") {
      w.Cal("init", { origin: "https://app.cal.com" });
    }
  } catch {
    // Ignore if offline
  }
}
