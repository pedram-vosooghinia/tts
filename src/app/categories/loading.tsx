import { Container } from "@/components/ui/container";

export default function CategoriesLoading() {
  return (
    <Container className="flex flex-col gap-6 pb-28">
      <div className="flex flex-col gap-1">
        <div className="h-7 w-32 animate-pulse rounded-md bg-card" />
        <div className="h-5 w-48 animate-pulse rounded-md bg-card" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl bg-card" />
        ))}
      </div>
    </Container>
  );
}
