import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import productsReducer from './slices/productsSlice';
import { Product, Category } from '../data/types';

// Environment variables
const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  storeName: import.meta.env.VITE_STORE_NAME,
  currency: import.meta.env.VITE_CURRENCY,
  taxRate: Number(import.meta.env.VITE_TAX_RATE),
  shippingCost: Number(import.meta.env.VITE_SHIPPING_COST),
};

export interface RootState {
  cart: {
    items: (Product & { quantity: number })[];
    total: number;
  };
  wishlist: {
    items: Product[];
  };
  products: {
    items: Product[];
    filteredItems: Product[];
    categories: Category[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    filters: {
      categoryId: string;
      subCategoryId?: string;
      priceRange: [number, number];
      minRating: number;
      brand?: string;
    };
  };
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: config,
      },
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export { config };
