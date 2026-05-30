"use client";

import { Button } from "@/shared/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/Dialog";
import { Input } from "@/shared/components/ui/Input";
import { Textarea } from "@/shared/components/ui/Textarea";
import { Badge } from "@/shared/components/ui/Badge";
import { useState } from "react";
import { useOutreachStore } from "../store/useOutreachStore";
import { TEMPLATE_VARIABLES, type Template } from "../types";

function TemplateEditorForm({
  template,
  onSave,
  onCancel,
}: {
  template: Template;
  onSave: (data: { name: string; subject: string; body: string }) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(template.name);
  const [subject, setSubject] = useState(template.subject);
  const [body, setBody] = useState(template.body);

  const insertVariable = (variable: string) => {
    setBody((prev) => `${prev}${variable}`);
  };

  return (
    <div className="space-y-4">
      <Input label="Template Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input label="Subject Line" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <div>
        <p className="text-xs font-medium text-ink2 mb-2">Variables</p>
        <div className="flex flex-wrap gap-1.5">
          {TEMPLATE_VARIABLES.map((v) => (
            <button key={v} type="button" onClick={() => insertVariable(v)}>
              <Badge variant="gradient" className="cursor-pointer hover:opacity-80">{v}</Badge>
            </button>
          ))}
        </div>
      </div>
      <Textarea label="Body" value={body} onChange={(e) => setBody(e.target.value)} rows={8} />
      <div className="rounded-xl bg-surf p-4">
        <p className="text-xs font-medium text-hint uppercase mb-2">Preview</p>
        <p className="text-sm font-medium text-ink">{subject}</p>
        <p className="text-sm text-ink2 mt-2 whitespace-pre-wrap">{body}</p>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSave({ name, subject, body })}>Save Template</Button>
      </div>
    </div>
  );
}

export function TemplateEditor() {
  const templateEditorOpen = useOutreachStore((s) => s.templateEditorOpen);
  const closeTemplateEditor = useOutreachStore((s) => s.closeTemplateEditor);
  const getActiveTemplate = useOutreachStore((s) => s.getActiveTemplate);
  const updateTemplate = useOutreachStore((s) => s.updateTemplate);
  const template = getActiveTemplate();

  return (
    <Dialog open={templateEditorOpen} onOpenChange={(open) => !open && closeTemplateEditor()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Template</DialogTitle>
        </DialogHeader>
        {template && (
          <TemplateEditorForm
            key={template.id}
            template={template}
            onSave={(data) => {
              updateTemplate(template.id, data);
              closeTemplateEditor();
            }}
            onCancel={closeTemplateEditor}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
