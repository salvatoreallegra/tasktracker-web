import api, { setAccessToken } from "./api";

export type LoginRequest = { userName: string; password: string };
export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  expiresInSeconds: number;
};
export type RefreshRequest = { refreshToken: string };

// NEW: Register request (add email if your API needs it)
export type RegisterRequest = {
  userName: string;
  password: string /*, email?: string */;
};

let refreshTokenMem: string | null = null;

// NEW: Register hits your API, no tokens expected back (we'll login after).
export async function register(req: RegisterRequest) {
  await api.post("/auth/register", req); // adjust path if your API differs
}

export async function login(req: LoginRequest) {
  const { data } = await api.post<AuthResponse>("/auth/login", req);
  setAccessToken(data.accessToken);
  refreshTokenMem = data.refreshToken;
  return data;
}

export async function logout() {
  if (refreshTokenMem) {
    await api.post("/auth/logout", { refreshToken: refreshTokenMem });
  }
  setAccessToken(null);
  refreshTokenMem = null;
}

export function isLoggedIn() {
  return !!refreshTokenMem;
}

export async function refresh() {
  if (!refreshTokenMem) return;
  const { data } = await api.post<AuthResponse>("/auth/refresh", {
    refreshToken: refreshTokenMem,
  } as RefreshRequest);
  setAccessToken(data.accessToken);
  refreshTokenMem = data.refreshToken;
}
