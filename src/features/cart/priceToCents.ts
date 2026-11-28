export function priceToCents(price: string | null): number | null {
  if (price === null || !/^\d+(\.\d{1,2})?$/.test(price)) return null;
  const [whole, fraction = ''] = price.split('.');
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
  return Number.isSafeInteger(cents) && cents <= Math.floor(Number.MAX_SAFE_INTEGER / (100 * 999)) ? cents : null;
}

