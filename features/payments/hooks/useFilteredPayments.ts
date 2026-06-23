"use client";

import { useMemo } from "react";
import { usePaymentsList } from "../api/queries";
import { usePaymentsStore } from "../store/usePaymentsStore";

export function useFilteredPayments() {
  const { data, isLoading, isError, error, refetch } = usePaymentsList();
  const filterPayments = usePaymentsStore((s) => s.filterPayments);
  const filters = usePaymentsStore((s) => s.filters);

  const payments = useMemo(
    () => filterPayments(data?.payments ?? []),
    [data?.payments, filterPayments, filters],
  );

  return { payments, isLoading, isError, error, refetch, meta: data?.meta };
}
