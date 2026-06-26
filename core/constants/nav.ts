import {
  ArrowLeftRight,
  BarChart3,
  Bell,
  Building2,
  Calendar,
  CreditCard,
  LayoutDashboard,
  QrCode,
  Send,
  Users,
  UtensilsCrossed,
  Video,
  type LucideIcon,
} from "lucide-react";

export interface NavChild {
  label: string;
  href: string;
  badge?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string | null;
  children?: NavChild[];
}

export const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    label: "Members",
    href: "/members",
    icon: Users,
    badge: null,
    children: [
      { label: "All Members", href: "/members" },
      { label: "Approvals", href: "/members/approvals", badge: "47" },
    ],
  },
  {
    label: "Events",
    href: "/events",
    icon: Calendar,
    badge: null,
  },
  {
    label: "Videos",
    href: "/videos",
    icon: Video,
    badge: null,
  },
  {
    label: "Intros",
    href: "/intros",
    icon: ArrowLeftRight,
    badge: null,
  },
  {
    label: "Dinners",
    href: "/dinners",
    icon: UtensilsCrossed,
    badge: null,
  },
  {
    label: "Sponsors",
    href: "/sponsors",
    icon: Building2,
    badge: null,
  },
  {
    label: "QR Codes",
    href: "/qr-codes",
    icon: QrCode,
    badge: null,
  },
  {
    label: "Payments",
    href: "/payments",
    icon: CreditCard,
    badge: null,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: Bell,
    badge: null,
  },
  {
    label: "Outreach",
    href: "/outreach",
    icon: Send,
    badge: null,
    children: [
      { label: "Command Center", href: "/outreach" },
      { label: "Leads / CRM", href: "/outreach/leads" },
      { label: "Sequences", href: "/outreach/sequences" },
      { label: "Templates", href: "/outreach/templates" },
      { label: "Deck Library", href: "/outreach/decks" },
    ],
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    badge: null,
  },
];
