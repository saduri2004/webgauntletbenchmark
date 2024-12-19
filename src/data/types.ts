export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
  subCategories?: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  parentId: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;  // For showing discounts
  image: string;
  additionalImages?: string[];  // For product gallery
  categoryId: string;
  subCategoryId?: string;
  category: string;
  subCategory: string;
  stock: number;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  specifications: Record<string, string | string[]>;
  features: string[];
  tags: string[];
  brand?: string;
  model?: string;
  createdAt: string;  // For "new arrivals" sorting
  updatedAt: string;
  variants?: ProductVariant[];
  deliveryInfo: DeliveryInfo;
  returnPolicy: ReturnPolicy;
  warranty?: string;
  isEcoFriendly?: boolean;
  condition: 'new' | 'used-like-new' | 'used-good' | 'used-fair';
  compareAtPrice?: number;  // For showing "market price" or "MSRP"
}

export interface ProductVariant {
  id: string;
  name: string;
  type: 'color' | 'size' | 'style' | 'material';
  value: string;
  image?: string;
  price?: number;  // If variant has different price
  stock: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  notHelpful: number;
  title?: string;
  verifiedPurchase: boolean;
  images?: string[];
  replies?: ReviewReply[];
}

export interface ReviewReply {
  id: string;
  userId: string;
  userName: string;
  comment: string;
  date: string;
  isSellerResponse: boolean;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  description?: string;
  rating?: number;
  productCount?: number;
}

export interface DeliveryInfo {
  isFreeDelivery: boolean;
  estimatedDays: number;
  shippingCost?: number;
  availableLocations: string[];
  expeditedAvailable: boolean;
  expeditedCost?: number;
}

export interface ReturnPolicy {
  daysToReturn: number;
  isFreeTurn: boolean;
  returnShippingCost: number;
  conditions?: string[];
  restockingFee?: number;
}
