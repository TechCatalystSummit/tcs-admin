export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "super_admin";
}

export interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}
