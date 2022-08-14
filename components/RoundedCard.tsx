import { Card, styled } from '@mui/material';

/**
 * Rounded card for Opencommerce.
 */
const RoundedCard = styled(Card)(() => ({
  borderRadius: '16px',
  padding: '32px',
  boxShadow:
    'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
}));

export default RoundedCard;
