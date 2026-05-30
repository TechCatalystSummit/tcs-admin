export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "super_admin";
}

export interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
}
