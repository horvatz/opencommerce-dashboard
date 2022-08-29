/**
 * Helper to format prices.
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

/**
 * Helper to format DateTime.
 * @param date date string to format
 */
export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('sl-SI', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  }).format(new Date(date));
};
