import { PageHeader } from "@/shared/components/layout/PageHeader";
import { DashboardBody } from "../components/DashboardBody";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of platform activity and key metrics"
      />
      <DashboardBody />
    </>
  );
}
