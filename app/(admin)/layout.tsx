import { AdminSidebar } from "@/shared/components/layout/AdminSidebar";
import { AdminTopbar } from "@/shared/components/layout/AdminTopbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surf">
      <AdminSidebar />
      <div className="ml-60 min-h-screen flex flex-col transition-all duration-200">
        <AdminTopbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
