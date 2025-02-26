import { getInputProps, type FieldMetadata } from "@conform-to/react";

import FormError from "@/app/_components/ui/form-error";
import Input from "@/app/_components/ui/input";
import Label from "@/app/_components/ui/label";
import { cn } from "@/lib/tailwind";

interface FormInputProps {
  label: string;
  type: Parameters<typeof getInputProps>[1]["type"];
  field: FieldMetadata;
  placeholder?: string;
  disabled?: boolean;
  showOptional?: boolean;
  className?: string;
}

const FormInput = ({
  label,
  placeholder,
  type,
  field,
  disabled,
  showOptional = false,
  className,
}: FormInputProps) => {
  return (
    <div className={cn("flex flex-col gap-y-1", className)}>
      <Label
        htmlFor={field.id}
        required={field.required}
        showOptional={showOptional}
      >
        {label}
      </Label>

      <div>
        <Input
          {...getInputProps(field, { type, ariaAttributes: true })}
          key={field.key}
          disabled={disabled}
          placeholder={placeholder}
        />

        <FormError id={field.errorId} errors={field.errors} />
      </div>
    </div>
  );
};

export default FormInput;
