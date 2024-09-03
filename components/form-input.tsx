import { InputHTMLAttributes } from "react";

interface FormInputProps {
  type: InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder: string;
  required: boolean;
  errors: string[];
}

export default function FormInput({
  type,
  placeholder,
  required,
  errors,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        className="h-10 w-full rounded-md border-0 bg-transparent outline-none ring-2 ring-neutral-200 transition placeholder:text-neutral-400 focus:ring-4 focus:ring-orange-500"
        type={type}
        placeholder={placeholder}
        required={required}
      />
      {errors.map((error, index) => (
        <span key={index} className="font-medium text-red-500">
          {error}
        </span>
      ))}
    </div>
  );
}
