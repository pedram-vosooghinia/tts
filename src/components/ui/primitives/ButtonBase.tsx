"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ButtonBase({ className, ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      className={cn("rounded-xl font-semibold  ", className)}
    />
  );
}
