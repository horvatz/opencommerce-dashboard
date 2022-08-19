type Props = {
  text: string;
  variant?: 'primary' | 'success' | 'warning' | 'error';
};

const badgeColors = {
  primary: 'bg-cyan-100 text-cyan-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  error: 'bg-red-100 text-red-700',
};

/**
 * Badge for opencommerce, supported in three colors.
 */
const Badge = ({ text, variant = 'primary' }: Props): JSX.Element => {
  return (
    <strong
      className={`${badgeColors[variant]} px-3 py-1.5 rounded text-xs font-medium`}
    >
      {text}
    </strong>
  );
};

export default Badge;
