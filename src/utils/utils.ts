const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'RUB',
});

export const formatAsPrice = (price: number) => priceFormatter.format(price);