"use client";

import { ExportButton } from "@/shared/components/data-display/ExportButton";
import { QueryBoundary } from "@/shared/components/data-display/QueryBoundary";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { useEffect } from "react";
import { GenerateQRModal } from "../components/GenerateQRModal";
import { OpenGenerateButton } from "../components/OpenGenerateButton";
import { QRAnalyticsChart } from "../components/QRAnalyticsChart";
import { QRCodeDisplayPanel } from "../components/QRCodeDisplayPanel";
import { QRCodesTable } from "../components/QRCodesTable";
import { ScanLogPanel } from "../components/ScanLogPanel";
import { useQRCodesList } from "../api/queries";
import { useQRStore } from "../store/useQRStore";
import { QR_TYPE_LABELS } from "../types";

const exportColumns = [
  { key: "shortCode" as const, header: "Short Code" },
  { key: "type" as const, header: "Type" },
  { key: "source" as const, header: "Source" },
  { key: "campaign" as const, header: "Campaign" },
  { key: "scans" as const, header: "Scans" },
  { key: "conversions" as const, header: "Conversions" },
  { key: "createdAt" as const, header: "Created" },
];

export default function QRCodesPage() {
  const { data, isPending, isFetching, isError, error, refetch } = useQRCodesList();
  const codes = data?.codes ?? [];
  const selectedCodeId = useQRStore((s) => s.selectedCodeId);
  const selectCode = useQRStore((s) => s.selectCode);
  const openGenerate = useQRStore((s) => s.openGenerate);

  const isLoadingList = isPending || (isFetching && codes.length === 0);

  useEffect(() => {
    if (codes.length > 0 && !selectedCodeId) {
      selectCode(codes[0].id);
    }
  }, [codes, selectedCodeId, selectCode]);
  const exportData = codes.map((c) => ({
    shortCode: c.shortCode,
    type: QR_TYPE_LABELS[c.type],
    source: c.source,
    campaign: c.campaign,
    scans: c.scans,
    conversions: c.conversions,
    createdAt: c.createdAt,
  }));

  return (
    <>
      <PageHeader
        title="QR Codes"
        subtitle="Generate and track QR codes across events and campaigns"
        action={
          <div className="flex items-center gap-2">
            <ExportButton data={exportData} filename="tcs-qr-codes" columns={exportColumns} />
            <OpenGenerateButton />
          </div>
        }
      />

      <QueryBoundary
        isLoading={isLoadingList}
        isError={isError}
        error={error}
        onRetry={() => void refetch()}
        isEmpty={!isLoadingList && !isError && codes.length === 0}
        emptyTitle="No QR codes yet"
        emptyDescription="Generate a QR code to start tracking scans."
        emptyActionLabel="Generate QR"
        onEmptyAction={openGenerate}
      >
        <>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <div className="xl:col-span-2">
              <QRAnalyticsChart />
            </div>
            <QRCodeDisplayPanel codes={codes} />
          </div>

          <SectionLabel className="mb-3">All QR codes</SectionLabel>
          <QRCodesTable codes={codes} />

          <div className="mt-10">
            <ScanLogPanel />
          </div>
        </>
      </QueryBoundary>

      <GenerateQRModal />
    </>
  );
}
