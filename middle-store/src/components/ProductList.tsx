import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Button,
  IconButton, 
  Rating, 
  Box,
  Chip,
  TextField,
  InputAdornment,
  Link,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import { RootState } from '../store/store';
import { Product } from '../data/types';
import { ShoppingCart } from '@mui/icons-material';
import ProductFilters from './ProductFilters';
import { applyPromotionalDiscounts } from '../utils/promotionalDiscounts';
import { AIAgentBanner } from './AIAgentBanner';
import { products } from '../data/products';

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.products.status);
  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000],
    brand: '',
    minRating: 0,
    sortBy: 'relevance'
  });
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Comprehensive product filtering logic
  useEffect(() => {
    let result = products;

    // Category filter
    if (filters.category) {
      result = result.filter(product => product.categoryId === filters.category);
    }

    // Price range filter
    result = result.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    );

    // Brand filter
    if (filters.brand) {
      result = result.filter(product => product.brand === filters.brand);
    }

    // Rating filter
    result = result.filter(product => product.rating >= filters.minRating);

    // Search filter
    result = result.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sorting
    switch (filters.sortBy) {
      case 'price_low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Assuming there's a date field, if not, this won't do anything
        result.sort((a, b) => new Date(b.dateAdded || 0).getTime() - new Date(a.dateAdded || 0).getTime());
        break;
      default:
        // Relevance (no sorting)
        break;
    }

    setFilteredProducts(result);
  }, [filters, products, searchTerm]);

  // Function to update filters from ProductFilters component
  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Wishlist handlers
  const handleWishlistToggle = (product: Product) => {
    if (wishlist.some(item => item.id === product.id)) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  // Cart handler
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  // Search input handler
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Apply promotional discounts to filtered products
  const discountedProducts = applyPromotionalDiscounts(filteredProducts);

  return (
    <Box sx={{ 
      width: '100vw', 
      maxWidth: '100vw', 
      minWidth: '100vw', 
      height: '100%', 
      margin: 0, 
      padding: 0, 
      position: 'relative', 
      left: '50%', 
      right: '50%', 
      marginLeft: '-50vw', 
      marginRight: '-50vw', 
      overflow: 'hidden' 
    }}>
      <AIAgentBanner />

      {/* Promotional Banner */}
      <Box sx={{ 
        width: '100%', 
        mb: 4, 
        display: 'flex', 
        justifyContent: 'center' 
      }}>
        <Paper
          elevation={3}
          sx={{
            width: '100%',
            maxWidth: 1200,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            p: 3,
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 10px 20px rgba(102, 126, 234, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.01)',
              boxShadow: '0 15px 30px rgba(102, 126, 234, 0.3)'
            }
          }}
        >
          {/* Animated Background Elements */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              overflow: 'hidden',
              pointerEvents: 'none',
              zIndex: 1
            }}
          >
            {/* Floating Circles */}
            {[1, 2, 3].map((circle) => (
              <Box
                key={circle}
                sx={{
                  position: 'absolute',
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  animation: `float${circle} 5s infinite alternate`,
                  '@keyframes float1': {
                    '0%': { transform: 'translate(0, 0)' },
                    '100%': { transform: 'translate(50px, 30px)' }
                  },
                  '@keyframes float2': {
                    '0%': { transform: 'translate(0, 0)' },
                    '100%': { transform: 'translate(-50px, -30px)' }
                  },
                  '@keyframes float3': {
                    '0%': { transform: 'translate(0, 0)' },
                    '100%': { transform: 'translate(30px, -20px)' }
                  }
                }}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`
                }}
              />
            ))}
          </Box>

          <Box 
            sx={{ 
              position: 'relative', 
              zIndex: 2, 
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                mb: 1,
                fontFamily: "'Inter', sans-serif",
                color: 'white',
                letterSpacing: '-1px',
                textTransform: 'uppercase'
              }}
            >
              Storewide Sale
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontFamily: "'Inter', sans-serif",
                color: 'rgba(255,255,255,0.9)',
                fontWeight: 500,
                maxWidth: '80%',
                textAlign: 'center',
                mb: 2,
                letterSpacing: '0.5px'
              }}
            >
              Unlock Extraordinary Discounts Across All Categories
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Horizontal Filters */}
      <Box sx={{ 
        width: '100%', 
        backgroundColor: 'background.paper', 
        py: 2, 
        px: { xs: 2, sm: 4, md: 6 }, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2, 
        overflowX: 'auto' 
      }}>
        <ProductFilters updateFilters={updateFilters} />
      </Box>

      {/* Search Bar Section */}
      <Box sx={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        py: 3, 
        px: { xs: 2, sm: 4, md: 6 }, 
        backgroundColor: 'background.default' 
      }}>
        <TextField 
          fullWidth
          variant="outlined"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 2,
              backgroundColor: 'background.paper',
              maxWidth: 600,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.light',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              }
            }
          }}
        />
      </Box>

      <Grid container spacing={3} sx={{ 
        width: '100%', 
        margin: 0, 
        px: { xs: 2, sm: 4, md: 6 } 
      }}>
        {/* Products Section */}
        <Grid item xs={12} md={12} sx={{ width: '100%', padding: 0 }}>
          {/* Product Count and Sorting */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 2, 
            px: 2 
          }}>
            <Typography variant="h6">
              {discountedProducts.length} Products Found
            </Typography>
            {/* You can add sorting dropdown here in future */}
          </Box>

          <Grid container spacing={3}>
            {discountedProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} sx={{ width: '100%' }}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    position: 'relative', 
                    width: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow: 10,
                      transform: 'scale(1.02)',
                      '& .product-overlay': {
                        opacity: 1
                      }
                    },
                  }}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {product.promotionalDiscount && (
                    <Chip 
                      label={`${product.promotionalDiscount}% OFF`} 
                      color="error"
                      sx={{
                        position: 'absolute', 
                        top: 15, 
                        right: 15, 
                        zIndex: 10,
                        fontWeight: 'bold',
                        fontFamily: "'Inter', sans-serif",
                        height: 50,
                        borderRadius: 3,
                        fontSize: '0.9rem',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                        backgroundColor: 'error.main',
                        color: 'white',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'error.dark',
                          transform: 'scale(1.05)',
                          boxShadow: '0 6px 12px rgba(0,0,0,0.3)'
                        },
                        '& .MuiChip-label': {
                          fontWeight: 700,
                          letterSpacing: '0.5px',
                          px: 2
                        }
                      }}
                    />
                  )}
                  <Box 
                    className="product-overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0,0,0,0.05)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease-in-out',
                      zIndex: 1,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography 
                      variant="button" 
                      sx={{ 
                        color: 'primary.main', 
                        fontWeight: 'bold',
                        backgroundColor: 'white',
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        boxShadow: 3
                      }}
                    >
                      View Details
                    </Typography>
                  </Box>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                    sx={{ 
                      objectFit: 'contain', 
                      p: 2,
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography 
                        gutterBottom 
                        variant="h6" 
                        component="div"
                        sx={{ 
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          color: 'text.primary'
                        }}
                      >
                        {product.name}
                      </Typography>
                      <IconButton 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWishlistToggle(product);
                        }}
                        color="secondary"
                        size="small"
                        sx={{
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.2)'
                          }
                        }}
                      >
                        {isInWishlist(product.id) ? <Favorite /> : <FavoriteBorder />}
                      </IconButton>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating 
                        value={product.rating} 
                        precision={0.5} 
                        size="small" 
                        readOnly 
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({product.reviewCount || 0})
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {product.description.length > 100 
                        ? `${product.description.substring(0, 100)}...` 
                        : product.description}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      {product.brand && (
                        <Chip 
                          label={product.brand} 
                          size="small" 
                          variant="outlined"
                        />
                      )}
                      <Chip 
                        label={`${product.stock} in stock`}
                        size="small"
                        color={product.stock > 10 ? "success" : "warning"}
                      />
                    </Box>
                  </CardContent>

                  <CardActions sx={{ 
                    justifyContent: 'space-between', 
                    p: 2, 
                    pt: 0,
                    alignItems: 'center'
                  }}>
                    {product.originalPrice && product.originalPrice !== product.price ? (
                      <Box>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            textDecoration: 'line-through', 
                            color: 'text.disabled',
                            fontSize: '0.8rem'
                          }}
                        >
                          Original: ${product.originalPrice.toFixed(2)}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          color="primary"
                          sx={{ fontWeight: 'bold' }}
                        >
                          Now: ${product.price.toFixed(2)}
                        </Typography>
                      </Box>
                    ) : (
                      <Typography 
                        variant="body1" 
                        color="primary" 
                        sx={{ fontWeight: 'bold' }}
                      >
                        ${product.price.toFixed(2)}
                      </Typography>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* No Products Found State */}
          {discountedProducts.length === 0 && (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              py: 4 
            }}>
              <SearchOffIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No products found matching your search
              </Typography>
              <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
                Try a different search term or clear your filters
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductList;
