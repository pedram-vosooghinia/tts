import {
  HomeCategoryCardSkeleton,
  ProductCardSkeleton,
} from "@/components/shared/CardSkeletons";
import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <Container className="flex flex-col gap-6 pb-28">
      <div className="flex flex-col gap-1">
        <div className="h-7 w-40 animate-pulse rounded-md bg-muted" />
        <div className="h-5 w-56 animate-pulse rounded-md bg-muted" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </Container>
  );
}

export function HomeCategoryLoading() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <HomeCategoryCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function HomeProductsLoading() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
