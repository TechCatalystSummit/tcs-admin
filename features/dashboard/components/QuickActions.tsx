import Link from "next/link";
import { Card, CardContent } from "@/shared/components/ui/Card";
import { Users, Calendar, QrCode, ArrowLeftRight } from "lucide-react";

const actions = [
  { label: "Approve Members", href: "/members/approvals", icon: Users, color: "text-orange" },
  { label: "Create Event", href: "/events/new", icon: Calendar, color: "text-blue1" },
  { label: "Generate QR", href: "/qr-codes", icon: QrCode, color: "text-green" },
  { label: "Manage Intros", href: "/intros", icon: ArrowLeftRight, color: "text-purple" },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {actions.map(({ label, href, icon: Icon, color }) => (
        <Link key={href} href={href}>
          <Card className="hover:border-blue1/30 transition-colors cursor-pointer">
            <CardContent className="flex flex-col items-center gap-2 py-4">
              <Icon className={`h-5 w-5 ${color}`} />
              <span className="text-xs font-medium text-ink text-center">{label}</span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
