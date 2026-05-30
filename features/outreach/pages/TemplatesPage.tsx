"use client";

import { PageHeader } from "@/shared/components/layout/PageHeader";
import { TemplateCard } from "../components/TemplateCard";
import { TemplateEditor } from "../components/TemplateEditor";
import { useOutreachStore } from "../store/useOutreachStore";

export default function TemplatesPage() {
  const templates = useOutreachStore((s) => s.templates);

  return (
    <>
      <PageHeader
        title="Email Templates"
        subtitle="Template library with dynamic variables"
      />
      <div className="grid gap-4 md:grid-cols-2">
        {templates.map((tpl) => (
          <TemplateCard key={tpl.id} template={tpl} />
        ))}
      </div>
      <TemplateEditor />
    </>
  );
}
