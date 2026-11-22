import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function CartLoading() {
  return (
    <Container className="flex flex-col gap-6 pb-28">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-5 w-64" />
      </div>

      <div className="flex flex-col gap-3" aria-hidden="true">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-lg" />
        ))}
      </div>

      <Skeleton className="h-40 w-full rounded-lg" />
    </Container>
  );
}
