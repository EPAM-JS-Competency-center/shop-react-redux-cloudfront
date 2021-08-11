const priceFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
});

export const formatAsPrice = (price: number) => priceFormatter.format(price);
