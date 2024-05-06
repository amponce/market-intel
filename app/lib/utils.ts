export function absoluteUrl(path: string) {
  return `${
    process.env?.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  }${path}`;
}

export function formatCurrency(amount: number): string {
  // Round to the nearest dollar
  const roundedAmount = Math.round(amount);

  // Format as currency without the '.00'
  return `$${roundedAmount}`;
}
