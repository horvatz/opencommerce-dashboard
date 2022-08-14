import { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  error?: boolean;
  errorMessage?: string;
}

/**
 * TextField component for opencommerce.
 *
 * @returns {JSX.Element}
 */
const TextField: FC<InputProps> = ({
  name,
  label,
  type = 'text',
  error = false,
  errorMessage,
  ...rest
}): JSX.Element => {
  return (
    <div>
      <label
        className={`relative block p-3 border-2 ${
          error ? 'border-red-400' : 'border-gray-200'
        } rounded-lg`}
        htmlFor={name}
      >
        <input
          className="w-full px-0 pt-3.5 pb-0 text-sm placeholder-transparent border-none focus:ring-0 peer"
          id={name}
          type={type}
          {...rest}
        />
        <span className="absolute text-xs font-medium text-gray-500 transition-all left-3 peer-focus:text-xs peer-focus:top-3 peer-focus:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm">
          {label}
        </span>
      </label>
      <span className="text-xs font-medium text-red-400">{errorMessage}</span>
    </div>
  );
};

export default TextField;
