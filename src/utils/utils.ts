export const formatAsPrice = (price: number, currency: string) => {
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  });
  return priceFormatter.format(price);
};
