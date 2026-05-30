import { PageHeader } from "@/shared/components/layout/PageHeader";
import { Card, CardContent } from "@/shared/components/ui/Card";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of platform activity and key metrics"
      />
      <Card>
        <CardContent className="py-12 text-center text-muted">
          Dashboard widgets coming in Sprint 2
        </CardContent>
      </Card>
    </>
  );
}
