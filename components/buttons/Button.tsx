import { ButtonHTMLAttributes } from 'react';
import { FiLoader } from 'react-icons/fi';

export enum ButtonColor {
  PRIMARY = 'primary',
  SUCCCESS = 'success',
}
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loading?: boolean;
  variant?: 'contained' | 'outlined';
  color?: ButtonColor;
}

const Button = ({
  text,
  variant = 'contained',
  loading = false,
  color = ButtonColor.PRIMARY,
  ...rest
}: ButtonProps): JSX.Element => {
  // Colors for button based on props
  const background =
    color === ButtonColor.PRIMARY ? 'bg-blue-600' : 'bg-green-600';
  const textColorOutlined =
    color === ButtonColor.PRIMARY ? 'text-blue-600' : 'text-green-600';

  if (variant === 'outlined') {
    return (
      <button
        className={`inline-flex items-center justify-center px-8 py-5 text-sm font-medium ${textColorOutlined} transition border border-current rounded hover:scale-103 hover:shadow-xl active:${textColorOutlined} focus:outline-none focus:ring`}
        {...rest}
      >
        {loading && <FiLoader className="h-5 w-5 mr-3 animate-spin" />}
        {text}
      </button>
    );
  }

  return (
    <button
      className={`inline-flex items-center justify-center px-8 py-5 text-sm font-medium text-white transition ${background} rounded hover:scale-103 hover:shadow-xl active:${background} focus:outline-none focus:ring`}
      {...rest}
    >
      {loading && <FiLoader className="h-5 w-5 mr-3 animate-spin" />}
      <span className="text-sm font-medium">{text}</span>
    </button>
  );
};

export default Button;
