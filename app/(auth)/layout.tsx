import { AuthInitializer } from "@/features/auth/components/AuthInitializer";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthInitializer />
      {children}
    </>
  );
}
