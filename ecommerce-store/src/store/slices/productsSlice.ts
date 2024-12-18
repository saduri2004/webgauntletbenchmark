import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, Category } from '../../data/types';
import { categories } from '../../data/categories';
import productsData from '../../data/products.json';

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  categories: Category[];
  brands: string[];
  features: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filters: FilterState;
}

interface FilterState {
  category: string;
  subCategory?: string;
  priceRange: [number, number];
  minRating: number;
  brand?: string;
  features: string[];
  inStock: boolean;
  sortBy: 'relevance' | 'price_low' | 'price_high' | 'rating' | 'newest';
  searchQuery: string;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  categories: categories,
  brands: [], // Will be populated from products
  features: [], // Will be populated from products
  status: 'idle',
  error: null,
  filters: {
    category: '',
    subCategory: undefined,
    priceRange: [0, 1000],
    minRating: 0,
    brand: undefined,
    features: [],
    inStock: false,
    sortBy: 'relevance',
    searchQuery: ''
  }
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    // Load from products.json
    return productsData.products as Product[];
  }
);

// Helper function to extract unique brands and features from products
function extractMetadata(products: Product[]) {
  const brands = new Set<string>();
  const features = new Set<string>();

  products.forEach(product => {
    if (product.brand) brands.add(product.brand);
    if (product.features) product.features.forEach(feature => features.add(feature));
  });

  return {
    brands: Array.from(brands).sort(),
    features: Array.from(features).sort()
  };
}

// Helper function to check if a product matches the search query
function matchesSearchQuery(product: Product, query: string): boolean {
  if (!query) return true;
  
  const searchTerms = query.toLowerCase().split(' ');
  const searchableText = [
    product.name,
    product.description,
    product.brand,
    ...(product.features || []),
    product.category,
    product.subCategory
  ].join(' ').toLowerCase();

  return searchTerms.every(term => searchableText.includes(term));
}

// Helper function to filter and sort products
function filterProducts(products: Product[], filters: FilterState): Product[] {
  console.log('Filtering products with filters:', filters);
  console.log('Number of products before filtering:', products.length);
  
  let filtered = products.filter(product => {
    // Debug logging for category matching
    if (filters.category) {
      console.log('Filtering by category:', filters.category);
      console.log('Product category:', product.category);
    }

    const categoryMatch = !filters.category || product.categoryId === filters.category;
      
    const subCategoryMatch = !filters.subCategory || 
      product.subCategory === filters.subCategory;
      
    const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const ratingMatch = product.rating >= filters.minRating;
    const brandMatch = !filters.brand || product.brand?.toLowerCase() === filters.brand.toLowerCase();
    const featuresMatch = filters.features.length === 0 || 
      filters.features.every(feature => product.features?.some(f => f.toLowerCase() === feature.toLowerCase()));
    const stockMatch = !filters.inStock || product.inStock;
    const searchMatch = matchesSearchQuery(product, filters.searchQuery);

    // Debug each match condition
    if (filters.category) {
      console.log('Product:', product.id, 'CategoryMatch:', categoryMatch, 
        'Product category:', product.category, 
        'Filter category:', filters.category);
    }
    
    return categoryMatch && subCategoryMatch && priceMatch && ratingMatch && 
           brandMatch && featuresMatch && stockMatch && searchMatch;
  });

  console.log('Number of products after filtering:', filtered.length);

  // Sort the filtered products
  switch (filters.sortBy) {
    case 'price_low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price_high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case 'relevance':
    default:
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filtered.sort((a, b) => {
          const aScore = getRelevanceScore(a, query);
          const bScore = getRelevanceScore(b, query);
          return bScore - aScore;
        });
      }
      break;
  }

  return filtered;
}

// Helper function to calculate relevance score for sorting
function getRelevanceScore(product: Product, query: string): number {
  let score = 0;
  
  // Exact match in name
  if (product.name.toLowerCase().includes(query)) score += 10;
  
  // Exact match in description
  if (product.description.toLowerCase().includes(query)) score += 5;
  
  // Match in brand
  if (product.brand.toLowerCase().includes(query)) score += 3;
  
  // Match in category or subcategory
  if (product.category.toLowerCase().includes(query)) score += 2;
  if (product.subCategory?.toLowerCase().includes(query)) score += 2;
  
  // Match in features
  if (product.features?.some(f => f.toLowerCase().includes(query))) score += 1;
  
  return score;
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      console.log('Setting filters:', action.payload);
      state.filters = { ...state.filters, ...action.payload };
      state.filteredItems = filterProducts(state.items, state.filters);
      console.log('Updated filtered items:', state.filteredItems.length);
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredItems = state.items;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
      state.filteredItems = filterProducts(state.items, state.filters);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.filteredItems = filterProducts(action.payload, state.filters);
        const metadata = extractMetadata(action.payload);
        state.brands = metadata.brands;
        state.features = metadata.features;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  }
});

export const { setFilters, clearFilters, setSearchQuery } = productsSlice.actions;
export default productsSlice.reducer;
