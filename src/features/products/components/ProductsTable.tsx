"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, Loader2, Pencil, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useDeleteProduct } from "../hooks/useDeleteProduct";
import type { Product } from "../types/products.types";

interface ProductsTableProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
}

function getCategoryNames(product: Product): string {
  if (product.categories && product.categories.length > 0) {
    return product.categories.map((c) => c.name).join("، ");
  }
  if (product.category?.name) {
    return product.category.name;
  }
  return "-";
}

export default function ProductsTable({
  products,
  isLoading,
  onEdit,
}: ProductsTableProps) {
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const { deleteProduct, isDeleting } = useDeleteProduct();

  const handleDelete = async () => {
    if (!productToDelete) return;
    const success = await deleteProduct(productToDelete.id);
    if (success) {
      setProductToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        در حال دریافت محصولات...
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">شناسه</TableHead>
              <TableHead className="text-right">عنوان</TableHead>
              <TableHead className="text-right">دسته‌بندی</TableHead>
              <TableHead className="text-right">قیمت</TableHead>
              <TableHead className="text-right">موجودی</TableHead>
              <TableHead className="text-right">تاریخ ایجاد</TableHead>
              <TableHead className="text-center">عملیات</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  محصولی پیدا نشد.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>#{product.id}</TableCell>
                  <TableCell className="max-w-[220px] truncate font-medium">
                    {product.title}
                  </TableCell>
                  <TableCell className="max-w-[180px] truncate text-muted-foreground">
                    {getCategoryNames(product)}
                  </TableCell>
                  <TableCell className="tabular-nums font-medium">
                    {Number(product.price).toLocaleString("fa-IR")} تومان
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={product.stock > 0 ? "secondary" : "destructive"}
                    >
                      {product.stock > 0
                        ? `${product.stock.toLocaleString("fa-IR")} عدد`
                        : "ناموجود"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {product.created_at
                      ? new Date(product.created_at).toLocaleDateString("fa-IR")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        title="مشاهده در فروشگاه"
                      >
                        <Link href={`/products/${product.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(product)}
                        title="ویرایش"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setProductToDelete(product)}
                        title="حذف"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={!!productToDelete}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setProductToDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>حذف محصول</AlertDialogTitle>
            <AlertDialogDescription>
              آیا از حذف محصول «{productToDelete?.title}» اطمینان دارید؟ این
              عملیات قابل بازگشت نیست.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>انصراف</AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleting}
              onClick={(event) => {
                event.preventDefault();
                handleDelete();
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              حذف محصول
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
