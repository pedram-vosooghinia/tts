export const priceToHash = (price: number): string => {
    if (isNaN(price) || price <= 0) return "";
    return "PRD-" + price.toString(16).toUpperCase();
  };
  
  export const hashToPrice = (hash: string): number | null => {
    if (!hash.startsWith("PRD-")) return null;
    const value = hash.replace("PRD-", "");
    return parseInt(value, 16)*1000 || null;
  };
  