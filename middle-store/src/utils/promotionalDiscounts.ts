import { Product } from '../data/types';
export { PROMOTIONAL_DISCOUNTS } from '../../../shared/utils/promotionalDiscounts';


export const applyPromotionalDiscounts = (products: Product[]): Product[] => {
  // Define a list of product names to apply discounts to
  const discountedProductNames = [
    'Classic Leather Dress Shoe', 
    'Trek Mountain Bike', 
    'Elegant Wooden Storage Box', 
    'Elegant Women\'s Dress', 
    'Hydrating Face Moisturizer', 
    'PlayStation 5 Console'
  ];

  return products.map(product => {
    if (discountedProductNames.includes(product.name)) {
      // Calculate the discounted price (25% off)
      const discountPercentage = 25;
      const discountedPrice = product.price * (1 - discountPercentage / 100);
      
      return {
        ...product,
        promotionalDiscount: `${discountPercentage}% off`,
        originalPrice: product.price,
        price: Number(discountedPrice.toFixed(2))
      };
    }
    return product;
  });
};
