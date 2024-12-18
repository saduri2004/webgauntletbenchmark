export const categories = [
  'Beauty and Personal Care',
  'Sports and Outdoors',
  'Clothing, Shoes, Jewelry',
  'Home and Kitchen',
  'Office Products',
  'Tools and Home Improvement',
  'Health and Household',
  'Patio, Lawn and Garden',
  'Electronics',
  'Cell Phones and Accessories',
  'Video Games',
  'Grocery and Gourmet Food'
] as const;

export type CategoryType = typeof categories[number];

// Category icons mapping (if needed in the future)
export const categoryIcons: Record<CategoryType, string> = {
  'Beauty and Personal Care': '💄',
  'Sports and Outdoors': '⚽',
  'Clothing, Shoes, Jewelry': '👕',
  'Home and Kitchen': '🏠',
  'Office Products': '💼',
  'Tools and Home Improvement': '🔧',
  'Health and Household': '🏥',
  'Patio, Lawn and Garden': '🌳',
  'Electronics': '📱',
  'Cell Phones and Accessories': '📱',
  'Video Games': '🎮',
  'Grocery and Gourmet Food': '🍎'
};
