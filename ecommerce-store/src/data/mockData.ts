import { Product } from './types';
import productsData from './products.json';

// Type assertion for the JSON data
const typedProductsData = productsData as { products: Product[] };

export function generateMockProducts(): Product[] {
  return typedProductsData.products;
}