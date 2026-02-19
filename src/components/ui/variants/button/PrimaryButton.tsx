"use client";

import { ButtonBase } from "@/components/ui/primitives/ButtonBase";
import { cn } from "@/lib/utils";

export function PrimaryButton({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof ButtonBase>) {
  return (
    <ButtonBase
      variant={variant ?? "default"}
      className={cn("bg", className)}
      {...props}
    />
  );
}


