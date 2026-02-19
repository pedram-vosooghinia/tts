import { Skeleton } from "@/components/ui/skeleton";

export function ProductSliderSkeleton() {
  return (
    <div className="flex justify-between items-center w-full gap-x-4">
      <div className="w-full  fcc max-w-[18.75rem] p-4 rounded-2xl bg-mainblack">
        <Skeleton className="h-[10rem] w-4/5 rounded-xl items-start" />
        <div className="w-full">
          <Skeleton className="h-12 w-3/4 mt-4 items-start " />
          <Skeleton className="h-4 w-1/4 mt-4 items-start " />
        </div>
      </div>
      <div className=" w-full  fcc sm:max-w-[13.0rem] max-w-[7.73rem] p-4 rounded-2xl bg-mainblack">
        <Skeleton className="h-[10rem] w-4/5 rounded-xl items-start" />
        <div className="w-full">
          <Skeleton className="h-12 w-3/4 mt-4 items-start " />
          <Skeleton className="h-4 w-1/4 mt-4 items-start " />
        </div>
      </div>
    </div>
  );
}
