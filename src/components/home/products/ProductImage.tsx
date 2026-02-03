"use client";

import Image from "next/image";
import { useState } from "react";
import placeholder from "@/public/placeholder.jpg";
import { CiImageOff } from "react-icons/ci";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductImageProps {
  src: string;
  alt: string;
}

export default function ProductImage({ src, alt }: ProductImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-[200px] h-[160px] mx-auto flex items-center justify-center bg-gray-100 rounded">
      {/* Skeleton */}
      {loading && !error && <Skeleton className="absolute inset-0" />}

      {/* Error icon */}
      {error ? (
        <CiImageOff size={52} className="text-gray-400" />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="200px"
          className={`object-contain transition-opacity duration-300 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          placeholder="blur"
          blurDataURL={placeholder.blurDataURL}
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
        />
      )}
    </div>
  );
}
