// ui/SelectBox.tsx
import React from "react";

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  register?: any; // from react-hook-form
  name?: string; // react-hook-form field name
};

const SelectBox: React.FC<Props> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  error,
  register,
  name,
}) => {
  return (
    <div>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        {...(register && name ? register(name) : {})}
        className={`w-full border px-3 py-2 rounded ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default SelectBox;
