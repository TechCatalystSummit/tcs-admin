"use client";

import { Button } from "@/shared/components/ui/Button";
import { Card, CardContent } from "@/shared/components/ui/Card";
import { formatDate } from "@/shared/utils/formatters";
import { Pencil, Copy, Trash2 } from "lucide-react";
import { useOutreachStore } from "../store/useOutreachStore";
import type { Template } from "../types";
import { TEMPLATE_TYPE_LABELS } from "../types";

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const openTemplateEditor = useOutreachStore((s) => s.openTemplateEditor);
  const duplicateTemplate = useOutreachStore((s) => s.duplicateTemplate);
  const deleteTemplate = useOutreachStore((s) => s.deleteTemplate);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-ink">{template.name}</h3>
            <p className="text-xs text-muted mt-0.5">{TEMPLATE_TYPE_LABELS[template.type]}</p>
            {template.lastUsed && (
              <p className="text-[10px] text-hint mt-1">Last used {formatDate(template.lastUsed)}</p>
            )}
            <p className="text-sm text-ink2 mt-2 line-clamp-2">{template.body.slice(0, 120)}...</p>
          </div>
          <div className="flex gap-1 shrink-0">
            <Button variant="ghost" size="sm" onClick={() => openTemplateEditor(template.id)}>
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => duplicateTemplate(template.id)}>
              <Copy className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => deleteTemplate(template.id)}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
