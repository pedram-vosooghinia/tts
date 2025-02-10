export const priceToHash = (price: number, percent: number): string => {
  if (isNaN(price) || isNaN(percent) || price <= 0 || percent < 0) return "";
  return `PRD-${price.toString(16).toUpperCase()}_${percent.toString(16).toUpperCase()}`;
};

export const hashToPrice = (hash: string): { price: number; percent: number } | null => {
  if (!hash.startsWith("PRD-")) return null;
  const parts = hash.replace("PRD-", "").split("_");
  if (parts.length !== 2) return null;
  
  const price = parseInt(parts[0], 16);
  const percent = parseInt(parts[1], 16);

  return { price, percent };
};
