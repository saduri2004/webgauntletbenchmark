import { Product } from '../types/product';

// Centralized list of promotional discounts
export const PROMOTIONAL_DISCOUNTS: { [key: string]: number } = {
  // Electronics
  'Smartphone X': 15,
  'Wireless Earbuds Pro': 20,
  'Smart Watch Ultra': 25,
  'Noise-Canceling Headphones': 30,
  
  // Fashion
  'Designer Leather Jacket': 40,
  'Premium Denim Jeans': 25,
  'Silk Evening Dress': 35,
  'Luxury Leather Shoes': 30,
  
  // Home & Kitchen
  'Smart Coffee Maker': 20,
  'Robotic Vacuum Cleaner': 25,
  'Premium Blender Set': 15,
  'Smart Home Security System': 35,
  
  // Sports & Outdoors
  'Professional Yoga Mat': 20,
  'Running Shoes Elite': 25,
  'Fitness Tracker Pro': 30,
  'Camping Tent Expedition': 40
};

// Function to apply promotional discounts to products
export const applyPromotionalDiscounts = (products: Product[]): Product[] => {
  return products.map(product => {
    const discountPercentage = PROMOTIONAL_DISCOUNTS[product.name];
    
    if (discountPercentage) {
      const discountedPrice = product.price * (1 - discountPercentage / 100);
      
      return {
        ...product,
        originalPrice: product.price,
        price: Number(discountedPrice.toFixed(2)),
        promotionalDiscount: `${discountPercentage}% OFF`
      };
    }
    
    return product;
  });
};
