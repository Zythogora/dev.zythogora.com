import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/tailwind";

import type { ComponentProps } from "react";

interface LabelProps extends ComponentProps<typeof LabelPrimitive.Root> {
  required?: boolean;
  showOptional?: boolean;
}

const Label = ({
  className,
  required = false,
  showOptional = false,
  children,
  ...restProps
}: LabelProps) => {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "font-title gap-x-title-space relative flex items-baseline pl-3 text-base select-none",
        "md:text-lg",
        "group-has-disabled/form-input:text-foreground-muted group-has-disabled/form-input:pointer-events-none group-has-disabled/form-input:cursor-not-allowed",
        className,
      )}
      {...restProps}
    >
      {required ? (
        <span className="text-destructive absolute left-0">*</span>
      ) : null}

      <span className="font-medium">{children}</span>

      {!required && showOptional ? (
        <span className="text-foreground-muted text-xs">(optional)</span>
      ) : null}
    </LabelPrimitive.Root>
  );
};

export default Label;
