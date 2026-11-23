"use client";

import { useState } from "react";
import Image from "next/image";
import { Package } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { ProductImage } from "../types/products.types";

interface ProductGalleryProps {
  images?: ProductImage[];
  title: string;
}

export default function ProductGallery({ images = [], title }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);
  const current = images[selected];

  return (
    <div className="flex flex-col gap-3">
      <Card className="relative flex aspect-square w-full items-center justify-center overflow-hidden bg-muted/30">
        {current ? (
          <Image
            src={current.image}
            alt={current.image_alt || title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-6"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <Package className="h-16 w-16" />
            <p className="text-sm">تصویری برای این محصول موجود نیست</p>
          </div>
        )}
      </Card>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={image.id ?? index}
              type="button"
              aria-label={`تصویر ${index + 1}`}
              onClick={() => setSelected(index)}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-md border",
                index === selected && "border-primary ring-2 ring-primary/20",
              )}
            >
              <Image
                src={image.image}
                alt=""
                fill
                sizes="64px"
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
