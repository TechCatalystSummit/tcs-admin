"use client";

import { Button } from "@/shared/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/Dialog";
import { Input } from "@/shared/components/ui/Input";
import { Textarea } from "@/shared/components/ui/Textarea";
import { formatCurrency } from "@/shared/utils/formatters";
import { useState } from "react";
import { usePaymentsStore } from "../store/usePaymentsStore";
import type { Payment } from "../types";

export function RefundModal({ payments }: { payments: Payment[] }) {
  const open = usePaymentsStore((s) => s.refundOpen);
  const refundPaymentId = usePaymentsStore((s) => s.refundPaymentId);
  const closeRefund = usePaymentsStore((s) => s.closeRefund);
  const processRefund = usePaymentsStore((s) => s.processRefund);

  const payment = payments.find((p) => p.id === refundPaymentId);
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const handleOpenChange = (v: boolean) => {
    if (!v) {
      closeRefund();
      setAmount("");
      setReason("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payment || !reason.trim()) return;
    processRefund({
      paymentId: payment.id,
      amount: Number(amount) || payment.amount,
      reason: reason.trim(),
    });
    setAmount("");
    setReason("");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        {payment && (
          <>
            <DialogHeader>
              <DialogTitle>Initiate refund</DialogTitle>
              <DialogDescription>
                Refund for {payment.memberName} — {formatCurrency(payment.amount)}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Refund amount"
                type="number"
                placeholder={String(payment.amount)}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Textarea
                label="Reason"
                placeholder="Duplicate charge, cancellation, etc."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                required
              />
              <p className="text-xs text-muted">
                Refund processing via Stripe is not yet wired in the admin UI.
              </p>
              <div className="flex gap-2 pt-2">
                <Button type="submit" variant="danger" size="sm" disabled>
                  Refunds not available via API
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={closeRefund}>
                  Cancel
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
