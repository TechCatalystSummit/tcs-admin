"use client";

import { PageHeader } from "@/shared/components/layout/PageHeader";
import { CreateIntroModal } from "../components/CreateIntroModal";
import { IntroDetailModal } from "../components/IntroDetailModal";
import { IntroFilters } from "../components/IntroFilters";
import { IntrosTable } from "../components/IntrosTable";
import { useIntrosStore } from "../store/useIntrosStore";

export default function IntrosPage() {
  const openCreateModal = useIntrosStore((s) => s.openCreateModal);

  return (
    <>
      <PageHeader
        title="Intros"
        subtitle="Curated introduction workflow"
        actionLabel="Create Intro"
        onAction={openCreateModal}
      />
      <IntroFilters />
      <IntrosTable />
      <IntroDetailModal />
      <CreateIntroModal />
    </>
  );
}
