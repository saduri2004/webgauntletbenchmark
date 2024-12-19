import rawProductsData from '../../../shared/data/products.json';

// Handle different possible JSON structures
const rawProducts = Array.isArray(rawProductsData) 
  ? rawProductsData 
  : rawProductsData.products || [];

export const products = rawProducts.map(product => ({
  ...product,
  // Divide price by 100 for WebGauntlet
  price: product.price / 100,
  // Ensure image paths are correct
  image: product.image.startsWith('/') 
    ? product.image 
    : `/${product.image}`
}));
