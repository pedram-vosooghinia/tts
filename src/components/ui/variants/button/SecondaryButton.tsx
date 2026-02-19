"use client";
import { ButtonBase } from "@/components/ui/primitives/ButtonBase";
import { cn } from "@/lib/utils";
export function SecondaryButton({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof ButtonBase>) {
  return (
    <ButtonBase
      variant={variant ?? "default"}
      className={cn("", className)}
      {...props}
    />
  );
}
