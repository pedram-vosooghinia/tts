import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="w-full  fcc max-w-[18.75rem] p-4 rounded-2xl bg-mainblack">
      <Skeleton className="h-[10rem] w-4/5 rounded-xl items-start" />
      <div className="w-full">
        <Skeleton className="h-12 w-3/4 mt-4 items-start " />
        <Skeleton className="h-4 w-1/4 mt-4 items-start " />
      </div>
      <div className="w-full fbc mt-8">
        <Skeleton className="h-10 w-1/5 mt-2" />
        <Skeleton className="h-10 w-1/5 mt-2" />
      </div>
      <Skeleton className="h-10 w-full mt-2 mb-1" />
    </div>
  );
}
