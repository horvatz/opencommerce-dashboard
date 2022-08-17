/**
 * Helper to format prices (use with .format()).
 *
 * @param price price to format, in decimals
 * @param currency currency to format the price in (defaults to EUR)
 */
export const formatPrice = (price: number, currency = 'EUR') => {
  return new Intl.NumberFormat('sl-SI', {
    style: 'currency',
    currency: currency,
  }).format(price);
};
