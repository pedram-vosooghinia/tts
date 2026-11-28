"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useCreateProduct } from "../hooks/useCreateProduct";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import type { CreateProductDto, Product } from "../types/products.types";
import ProductForm from "./ProductForm";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
}

export default function ProductDialog({
  open,
  onOpenChange,
  product,
}: ProductDialogProps) {
  const { createProduct, isCreating } = useCreateProduct();
  const { updateProduct, isUpdating } = useUpdateProduct(product?.id ?? 0);

  const isEditing = !!product;
  const isSubmitting = isCreating || isUpdating;

  const handleSubmit = async (data: CreateProductDto) => {
    const success = product
      ? await updateProduct(data)
      : await createProduct(data);

    if (success) {
      onOpenChange(false);
    }

    return success;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "ویرایش محصول" : "ایجاد محصول جدید"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "اطلاعات محصول را ویرایش کنید."
              : "مشخصات محصول جدید را وارد کنید."}
          </DialogDescription>
        </DialogHeader>

        <ProductForm
          product={product}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
