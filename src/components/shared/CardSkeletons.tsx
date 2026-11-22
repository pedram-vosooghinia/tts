import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * These skeletons reuse the exact structure and spacing of the real cards.
 * Keep the heights in sync with the cards in:
 * - src/app/page.tsx (home categories + products)
 * - src/app/categories/page.tsx (categories)
 * - src/app/categories/[id]/page.tsx (category products)
 * so swapping a skeleton for real data does not shift the layout.
 */

type SkeletonProps = { className?: string };

export function HomeCategoryCardSkeleton({ className }: SkeletonProps) {
  return (
    <Card className={cn("w-36 shrink-0", className)} aria-hidden="true">
      <CardHeader className="p-4">
        <Skeleton className="h-5 w-3/4" />
        <div className="flex h-8 flex-col">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardHeader>
    </Card>
  );
}

export function CategoryCardSkeleton({ className }: SkeletonProps) {
  return (
    <Card className={cn("h-full", className)} aria-hidden="true">
      <CardHeader className="p-4">
        <Skeleton className="h-6 w-2/3" />
        <div className="flex h-8 flex-col">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardHeader>
    </Card>
  );
}

export function ProductCardSkeleton({ className }: SkeletonProps) {
  return (
    <Card className={cn("h-full", className)} aria-hidden="true">
      <CardHeader className="p-4">
        <div className="flex h-6 items-start justify-between gap-3">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-16 shrink-0 rounded-md" />
        </div>

        <div className="mt-1 flex h-10 flex-col">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
        </div>

        <div className="mt-3 flex h-4 items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardHeader>
    </Card>
  );
}

export function CategoryProductCardSkeleton({ className }: SkeletonProps) {
  return (
    <Card className={cn("h-full", className)} aria-hidden="true">
      <CardHeader className="p-4">
        <Skeleton className="h-6 w-1/2" />
        <div className="flex h-8 flex-col">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="mt-2 flex h-5 items-center justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-20" />
        </div>
      </CardHeader>
    </Card>
  );
}
