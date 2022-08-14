import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: 'contained' | 'outlined';
  background?: string;
  textColor?: string;
  color?: string;
}

const Button = ({
  text,
  variant = 'contained',
  background = 'bg-indigo-600',
  textColor = 'text-indigo-600',
  ...rest
}: ButtonProps): JSX.Element => {
  if (variant === 'outlined') {
    <button
      className={`inline-block px-8 py-3 text-sm font-medium ${textColor} transition border border-current rounded hover:scale-103 hover:shadow-xl active:${textColor} focus:outline-none focus:ring`}
      {...rest}
    >
      {text}
    </button>;
  }

  return (
    <button
      className={`inline-block px-8 py-3 text-sm font-medium text-white transition ${background} rounded hover:scale-103 hover:shadow-xl active:${background} focus:outline-none focus:ring`}
      {...rest}
    >
      {text}
    </button>
  );
};

export default Button;
