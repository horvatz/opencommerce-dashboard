import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';

const ProductCard = (): JSX.Element => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: '16px',
        height: '380px',
        boxShadow:
          'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
      }}
    >
      <CardMedia
        component="img"
        height="70%"
        image="https://minimal-assets-api.vercel.app/assets/images/products/product_1.jpg"
      />
      <CardContent
        sx={{
          height: '30%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography variant="subtitle2">Nike Air Force 1</Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle2"></Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            17,99 $
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
