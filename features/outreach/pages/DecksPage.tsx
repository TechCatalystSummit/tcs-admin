"use client";

import { PageHeader } from "@/shared/components/layout/PageHeader";
import { DeckCard } from "../components/DeckCard";
import { UploadDeckModal } from "../components/UploadDeckModal";
import { useOutreachStore } from "../store/useOutreachStore";

export default function DecksPage() {
  const decks = useOutreachStore((s) => s.decks);
  const openUploadDeckModal = useOutreachStore((s) => s.openUploadDeckModal);

  return (
    <>
      <PageHeader
        title="Deck Library"
        subtitle="Sponsor, vendor, investor, and partner pitch decks"
        actionLabel="Upload Deck"
        onAction={openUploadDeckModal}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {decks.map((deck) => (
          <DeckCard key={deck.id} deck={deck} />
        ))}
      </div>
      <UploadDeckModal />
    </>
  );
}
