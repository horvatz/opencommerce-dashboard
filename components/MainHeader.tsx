import { Stack, Typography } from '@mui/material';
import ColorButton from './buttons/ColorButton';

type Props = {
  title: string;
  subtitle?: string;
  actionTitle?: string;
  onAction?: () => void;
};

const MainHeader = ({
  title,
  subtitle,
  actionTitle,
  onAction = () => {},
}: Props): JSX.Element => {
  return (
    <Stack
      marginBottom={5}
      justifyContent="space-between"
      alignItems="center"
      direction="row"
    >
      <Typography variant="h5" fontWeight="medium">
        {title}
      </Typography>
      <Typography variant="body1">{subtitle}</Typography>
      {actionTitle && (
        <ColorButton variant="contained" onClick={onAction}>
          {actionTitle}
        </ColorButton>
      )}
    </Stack>
  );
};

export default MainHeader;
