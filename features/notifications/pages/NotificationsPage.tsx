import { PageHeader } from "@/shared/components/layout/PageHeader";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { NotificationLog } from "../components/NotificationLog";
import { SendNotificationForm } from "../components/SendNotificationForm";

export default function NotificationsPage() {
  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle="Send and manage platform notifications"
      />
      <div className="space-y-8">
        <SendNotificationForm />
        <section className="space-y-4">
          <SectionLabel>Notification History</SectionLabel>
          <NotificationLog />
        </section>
      </div>
    </>
  );
}
