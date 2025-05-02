export const formatAmount = (amount_in_cents: number): string => {
  return (amount_in_cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export const formatDate = (date: string): string => {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString('ed-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
