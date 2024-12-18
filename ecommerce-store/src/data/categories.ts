import { Category } from './types';

export const categories: Category[] = [
  {
    id: 'beauty-personal-care',
    name: 'Beauty and Personal Care',
    icon: '💄',
    slug: 'beauty-personal-care',
    subCategories: [
      { id: 'skincare', name: 'Skincare', slug: 'skincare', parentId: 'beauty-personal-care' },
      { id: 'haircare', name: 'Hair Care', slug: 'haircare', parentId: 'beauty-personal-care' },
      { id: 'makeup', name: 'Makeup', slug: 'makeup', parentId: 'beauty-personal-care' },
    ],
  },
  {
    id: 'sports-outdoors',
    name: 'Sports and Outdoors',
    icon: '⚽',
    slug: 'sports-outdoors',
    subCategories: [
      { id: 'exercise-fitness', name: 'Exercise & Fitness', slug: 'exercise-fitness', parentId: 'sports-outdoors' },
      { id: 'outdoor-recreation', name: 'Outdoor Recreation', slug: 'outdoor-recreation', parentId: 'sports-outdoors' },
      { id: 'team-sports', name: 'Team Sports', slug: 'team-sports', parentId: 'sports-outdoors' },
    ],
  },
  {
    id: 'clothing-shoes-jewelry',
    name: 'Clothing, Shoes, Jewelry',
    icon: '👕',
    slug: 'clothing-shoes-jewelry',
    subCategories: [
      { id: 'womens', name: "Women's", slug: 'womens', parentId: 'clothing-shoes-jewelry' },
      { id: 'mens', name: "Men's", slug: 'mens', parentId: 'clothing-shoes-jewelry' },
      { id: 'kids', name: "Kids'", slug: 'kids', parentId: 'clothing-shoes-jewelry' },
    ],
  },
  {
    id: 'home-kitchen',
    name: 'Home and Kitchen',
    icon: '🏠',
    slug: 'home-kitchen',
    subCategories: [
      { id: 'kitchen-dining', name: 'Kitchen & Dining', slug: 'kitchen-dining', parentId: 'home-kitchen' },
      { id: 'bedding', name: 'Bedding', slug: 'bedding', parentId: 'home-kitchen' },
      { id: 'storage', name: 'Storage & Organization', slug: 'storage', parentId: 'home-kitchen' },
    ],
  },
  {
    id: 'office-products',
    name: 'Office Products',
    icon: '💼',
    slug: 'office-products',
    subCategories: [
      { id: 'office-supplies', name: 'Office Supplies', slug: 'office-supplies', parentId: 'office-products' },
      { id: 'office-furniture', name: 'Office Furniture', slug: 'office-furniture', parentId: 'office-products' },
      { id: 'office-electronics', name: 'Office Electronics', slug: 'office-electronics', parentId: 'office-products' },
    ],
  },
  {
    id: 'tools-home-improvement',
    name: 'Tools and Home Improvement',
    icon: '🔧',
    slug: 'tools-home-improvement',
    subCategories: [
      { id: 'power-tools', name: 'Power Tools', slug: 'power-tools', parentId: 'tools-home-improvement' },
      { id: 'hand-tools', name: 'Hand Tools', slug: 'hand-tools', parentId: 'tools-home-improvement' },
      { id: 'hardware', name: 'Hardware', slug: 'hardware', parentId: 'tools-home-improvement' },
    ],
  },
  {
    id: 'health-household',
    name: 'Health and Household',
    icon: '🏥',
    slug: 'health-household',
    subCategories: [
      { id: 'vitamins', name: 'Vitamins & Supplements', slug: 'vitamins', parentId: 'health-household' },
      { id: 'household-supplies', name: 'Household Supplies', slug: 'household-supplies', parentId: 'health-household' },
      { id: 'personal-care', name: 'Personal Care', slug: 'personal-care', parentId: 'health-household' },
    ],
  },
  {
    id: 'patio-lawn-garden',
    name: 'Patio, Lawn and Garden',
    icon: '🌳',
    slug: 'patio-lawn-garden',
    subCategories: [
      { id: 'patio-furniture', name: 'Patio Furniture', slug: 'patio-furniture', parentId: 'patio-lawn-garden' },
      { id: 'gardening', name: 'Gardening', slug: 'gardening', parentId: 'patio-lawn-garden' },
      { id: 'outdoor-decor', name: 'Outdoor Décor', slug: 'outdoor-decor', parentId: 'patio-lawn-garden' },
    ],
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: '📱',
    slug: 'electronics',
    subCategories: [
      { id: 'computers', name: 'Computers', slug: 'computers', parentId: 'electronics' },
      { id: 'tv-video', name: 'TV & Video', slug: 'tv-video', parentId: 'electronics' },
      { id: 'cameras', name: 'Cameras', slug: 'cameras', parentId: 'electronics' },
    ],
  },
  {
    id: 'cell-phones-accessories',
    name: 'Cell Phones and Accessories',
    icon: '📱',
    slug: 'cell-phones-accessories',
    subCategories: [
      { id: 'smartphones', name: 'Smartphones', slug: 'smartphones', parentId: 'cell-phones-accessories' },
      { id: 'cases', name: 'Cases', slug: 'cases', parentId: 'cell-phones-accessories' },
      { id: 'accessories', name: 'Accessories', slug: 'accessories', parentId: 'cell-phones-accessories' },
    ],
  },
  {
    id: 'video-games',
    name: 'Video Games',
    icon: '🎮',
    slug: 'video-games',
    subCategories: [
      { id: 'playstation', name: 'PlayStation', slug: 'playstation', parentId: 'video-games' },
      { id: 'xbox', name: 'Xbox', slug: 'xbox', parentId: 'video-games' },
      { id: 'nintendo', name: 'Nintendo', slug: 'nintendo', parentId: 'video-games' },
    ],
  },
  {
    id: 'grocery-gourmet-food',
    name: 'Grocery and Gourmet Food',
    icon: '🍎',
    slug: 'grocery-gourmet-food',
    subCategories: [
      { id: 'beverages', name: 'Beverages', slug: 'beverages', parentId: 'grocery-gourmet-food' },
      { id: 'snacks', name: 'Snacks', slug: 'snacks', parentId: 'grocery-gourmet-food' },
      { id: 'organic', name: 'Organic', slug: 'organic', parentId: 'grocery-gourmet-food' },
    ],
  },
];
