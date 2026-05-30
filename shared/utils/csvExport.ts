type CsvColumn<T> = { key: keyof T; header: string };

function escapeCsvCell(value: unknown): string {
  if (value == null) return "";
  const str = String(value);
  if (/[",\n\r]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

export function exportToCsv<T extends Record<string, unknown>>(
  data: T[],
  filename: string,
  columns?: CsvColumn<T>[],
): void {
  if (data.length === 0) return;

  const cols =
    columns ??
    (Object.keys(data[0]) as (keyof T)[]).map((key) => ({
      key,
      header: String(key),
    }));

  const headerRow = cols.map((c) => escapeCsvCell(c.header)).join(",");
  const bodyRows = data.map((row) =>
    cols.map((c) => escapeCsvCell(row[c.key])).join(","),
  );
  const csv = [headerRow, ...bodyRows].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
