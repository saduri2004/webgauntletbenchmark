import rawProductsData from '../../../shared/data/products.json';

// Handle different possible JSON structures
const rawProducts = Array.isArray(rawProductsData) 
  ? rawProductsData 
  : rawProductsData.products || [];

export const products = rawProducts.map(product => ({
  ...product,
  // No price modification for middle-store
  price: product.price
}));
