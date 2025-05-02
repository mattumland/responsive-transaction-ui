export const formatAmount = (amount_in_cents: number): string => {
  return (amount_in_cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}