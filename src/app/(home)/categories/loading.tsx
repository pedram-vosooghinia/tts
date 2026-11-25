import { CategoryCardSkeleton } from "@/components/shared/CardSkeletons";

export default function CategoriesLoading() {
  return (
    <div className="flex flex-col mt-16 gap-6 pb-28">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-foreground">دسته‌بندی‌ها</h1>
        <p className="text-sm text-muted-foreground">
          مشاهده دسته‌بندی‌های محصولات
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <CategoryCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
