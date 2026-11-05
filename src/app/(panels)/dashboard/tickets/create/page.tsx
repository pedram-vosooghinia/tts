import BreadcrumbMain from "@/components/shared/BreadcrumbMain";
import PageHeader from "@/components/shared/PageHeader";
import CreateTicketForm from "@/features/tickets/components/CreateTicketForm";

export default function CreateTicketPage() {
  return (
    <>
      <BreadcrumbMain
        items={[
          { label: "داشبرد", href: "/dashboard" },
          { label: "تیکت ها", href: "#" },
        ]}
      />
      <PageHeader
        title="ایجاد تیکت جدید"
        description="درخواست خود را برای تیم پشتیبانی ثبت کنید."
      />

      <div className="rounded-lg border p-6">
        <CreateTicketForm />
      </div>
    </>
  );
}
