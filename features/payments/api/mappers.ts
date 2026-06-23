import type { Payment, PaymentStatus } from "../types";
import type { TierId } from "@/core/constants/tiers";

export interface ApiPayment {
  id: string;
  userId: string;
  amountCents: number;
  currency?: string;
  status: string;
  description?: string | null;
  stripePaymentId?: string | null;
  stripeInvoiceId?: string | null;
  tierId?: string | null;
  createdAt: string;
}

export function mapApiPayment(p: ApiPayment): Payment {
  const statusMap: Record<string, PaymentStatus> = {
    paid: "paid",
    failed: "failed",
    refunded: "refunded",
    pending: "pending",
  };

  return {
    id: p.id,
    memberId: p.userId,
    memberName: p.description?.split(" ")[0] ?? "Member",
    memberEmail: "",
    amount: (p.amountCents ?? 0) / 100,
    tier: "builder" as TierId,
    status: statusMap[p.status] ?? "pending",
    method: "card",
    paidAt: p.createdAt,
    invoiceId: p.stripeInvoiceId ?? undefined,
  };
}
