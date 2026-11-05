import CreateTicketForm from "@/features/tickets/components/CreateTicketForm";

export default function CreateTicketPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">ایجاد تیکت جدید</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          درخواست خود را برای تیم پشتیبانی ثبت کنید.
        </p>
      </div>

      <div className="rounded-lg border p-6">
        <CreateTicketForm />
      </div>
    </div>
  );
}