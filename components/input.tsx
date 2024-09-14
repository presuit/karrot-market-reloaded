import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  errors?: string[];
}

export default function Input({ name, errors = [], ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        className="h-10 w-full rounded-md border-0 bg-transparent outline-none ring-2 ring-neutral-200 transition placeholder:text-neutral-400 focus:ring-4 focus:ring-orange-500"
        name={name}
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className="font-medium text-red-500">
          {error}
        </span>
      ))}
    </div>
  );
}
