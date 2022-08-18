import { ButtonHTMLAttributes } from 'react';
import { FiLoader } from 'react-icons/fi';

export enum ButtonColor {
  PRIMARY = 'primary',
  SUCCCESS = 'success',
  ALERT = 'alert',
}

const buttonBackgrounds = {
  primary: 'bg-blue-600',
  success: 'bg-green-600',
  alert: 'bg-red-500',
};

const buttonTextColor = {
  primary: 'text-blue-600',
  success: 'text-green-600',
  alert: 'text-red-500',
};
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
  if (variant === 'outlined') {
    return (
      <button
        className={`inline-flex items-center justify-center px-5 py-3 text-sm font-medium ${buttonTextColor[color]} transition border border-current rounded hover:scale-103 hover:shadow-xl active:${buttonTextColor[color]} focus:outline-none focus:ring`}
        {...rest}
      >
        {loading && <FiLoader className="h-5 w-5 mr-3 animate-spin" />}
        {text}
      </button>
    );
  }

  return (
    <button
      className={`inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white transition ${buttonBackgrounds[color]} rounded hover:scale-103 hover:shadow-xl active:${buttonBackgrounds[color]} focus:outline-none focus:ring`}
      {...rest}
    >
      {loading && <FiLoader className="h-5 w-5 mr-3 animate-spin" />}
      <span className="text-sm font-medium">{text}</span>
    </button>
  );
};

export default Button;
