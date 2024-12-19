import rawProductsData from '/Users/sasankaduri/WebGauntlet/shared/data/products.json';

// Handle different possible JSON structures
const rawProducts = Array.isArray(rawProductsData) 
  ? rawProductsData 
  : rawProductsData.products || [];

export const products = rawProducts.map(product => ({
  ...product,
  // No price modification for this store
  price: product.price
}));
