"use client";

import { Button } from "@/shared/components/ui/Button";
import { exportToCsv } from "@/shared/utils/csvExport";
import { Download } from "lucide-react";

interface ExportButtonProps<T extends object> {
  data: T[];
  filename: string;
  columns?: { key: keyof T; header: string }[];
  label?: string;
  disabled?: boolean;
}

export function ExportButton<T extends object>({
  data,
  filename,
  columns,
  label = "Export CSV",
  disabled,
}: ExportButtonProps<T>) {
  return (
    <Button
      variant="outline"
      size="sm"
      disabled={disabled ?? data.length === 0}
      onClick={() => exportToCsv(data, filename, columns)}
    >
      <Download className="h-3.5 w-3.5 mr-1.5" />
      {label}
    </Button>
  );
}
