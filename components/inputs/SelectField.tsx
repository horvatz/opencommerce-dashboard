import { InputHTMLAttributes } from 'react';

export type SelectItem = {
  value: string;
  label: string;
};

interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: SelectItem[];
  error?: boolean;
  errorMessage?: string;
}

/**
 * SelectField component for opencommerce.
 *
 * @returns {JSX.Element}
 */
const SelectField = ({
  name,
  label,
  options,
  error = false,
  errorMessage,
  ...rest
}: InputProps): JSX.Element => {
  return (
    <div>
      <label
        className={`relative block p-3 border-2 ${
          error ? 'border-red-400' : 'border-gray-200'
        } rounded-lg`}
        htmlFor={name}
      >
        <select
          id={name}
          className="w-full px-0 pt-3.5 pb-0 text-sm placeholder-transparent border-none focus:ring-0 peer"
          {...rest}
        >
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="absolute text-xs font-medium text-gray-500 transition-all left-3 peer-focus:text-xs peer-focus:top-3 peer-focus:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm">
          {label}
        </span>
      </label>
      <span className="text-xs font-medium text-red-400">{errorMessage}</span>
    </div>
  );
};

export default SelectField;
