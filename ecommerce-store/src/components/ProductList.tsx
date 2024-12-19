import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  IconButton, 
  Box,
  Chip,
  TextField,
  InputAdornment,
  Container,
  Stack,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Paper,
  Button,
  Rating
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Favorite, FavoriteBorder, StarRounded } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import { RootState } from '../store/store';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { Product } from '../data/types';

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      result = result.filter(product => {
        const category = categories.find(cat => cat.name === filters.category);
        return category ? product.categoryId === category.id : false;
      });
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
      default:
        break;
    }

    setFilteredProducts(result);
  }, [filters, searchTerm]);

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

  // Get unique brands from products
  const uniqueBrands = Array.from(new Set(products.map(p => p.brand)));

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Website Title and Search */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        mb: 4 
      }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 700, 
            mb: 1,
            fontFamily: "'Playfair Display', serif", 
            color: 'rgba(139, 69, 19, 0.9)', 
            textShadow: '1px 1px 2px rgba(139, 69, 19, 0.2)', 
            letterSpacing: 2, 
            textAlign: 'center',
            fontSize: '3.5rem', 
            fontStyle: 'italic' 
          }}
        >
          Web Paradise
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: "'Playfair Display', serif",
            color: 'rgba(139, 69, 19, 0.7)',
            textAlign: 'center',
            mb: 3,
            fontStyle: 'italic',
            fontSize: '1.2rem',
            maxWidth: 600,
            mx: 'auto'
          }}
        >
          Best most premium products. Make sure to buy here for satisfaction
        </Typography>
        <TextField 
          fullWidth
          variant="outlined"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ 
                  color: 'rgba(139, 69, 19, 0.7)',
                  mr: 1 
                }} />
              </InputAdornment>
            )
          }}
          sx={{ 
            maxWidth: 1200, 
            width: '100%', 
            '& .MuiOutlinedInput-root': {
              borderRadius: 5,
              boxShadow: '0 4px 8px rgba(139, 69, 19, 0.1)',
              backgroundColor: 'rgba(255,255,255,0.95)',
              fontFamily: "'Playfair Display', serif", 
              '& input': {
                paddingY: 1.5, 
                fontSize: '1rem' 
              },
              '& fieldset': {
                borderColor: 'rgba(139, 69, 19, 0.3)',
                borderWidth: 2 
              },
              '&:hover fieldset': {
                borderColor: 'rgba(139, 69, 19, 0.6)'
              },
              '&.Mui-focused fieldset': {
                borderColor: 'rgba(139, 69, 19, 0.8)'
              }
            }
          }}
        />
      </Box>

      {/* Horizontal Filters */}
      <Paper 
        elevation={3}
        sx={{ 
          mb: 4, 
          p: 2, 
          borderRadius: 4,
          backgroundColor: 'rgba(139, 69, 19, 0.05)', 
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(139, 69, 19, 0.2)', 
          boxShadow: '0 8px 16px rgba(139, 69, 19, 0.1)'
        }}
      >
        <Stack 
          direction="column" 
          spacing={2}
          alignItems="center"
        >
          {/* Category Chips - First Row */}
          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            width: '100%' 
          }}>
            {categories.slice(0, Math.ceil(categories.length / 2)).map((category) => (
              <Chip
                key={category.name}
                label={category.name}
                clickable
                color={filters.category === category.name ? 'primary' : 'default'}
                onClick={() => setFilters(prev => ({
                  ...prev, 
                  category: prev.category === category.name ? '' : category.name
                }))}
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '0.9rem',
                  height: 40,
                  borderRadius: 3,
                  backgroundColor: filters.category === category.name 
                    ? 'rgba(139, 69, 19, 0.9)' 
                    : 'rgba(139, 69, 19, 0.1)',
                  color: filters.category === category.name 
                    ? 'white' 
                    : 'rgba(139, 69, 19, 0.8)',
                  boxShadow: filters.category === category.name 
                    ? '0 4px 8px rgba(139, 69, 19, 0.3)' 
                    : 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: filters.category === category.name 
                      ? 'rgba(139, 69, 19, 1)' 
                      : 'rgba(139, 69, 19, 0.2)',
                    transform: 'scale(1.05)'
                  }
                }}
              />
            ))}
          </Box>

          {/* Category Chips - Second Row */}
          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            width: '100%' 
          }}>
            {categories.slice(Math.ceil(categories.length / 2)).map((category) => (
              <Chip
                key={category.name}
                label={category.name}
                clickable
                color={filters.category === category.name ? 'primary' : 'default'}
                onClick={() => setFilters(prev => ({
                  ...prev, 
                  category: prev.category === category.name ? '' : category.name
                }))}
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '0.9rem',
                  height: 40,
                  borderRadius: 3,
                  backgroundColor: filters.category === category.name 
                    ? 'rgba(139, 69, 19, 0.9)' 
                    : 'rgba(139, 69, 19, 0.1)',
                  color: filters.category === category.name 
                    ? 'white' 
                    : 'rgba(139, 69, 19, 0.8)',
                  boxShadow: filters.category === category.name 
                    ? '0 4px 8px rgba(139, 69, 19, 0.3)' 
                    : 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: filters.category === category.name 
                      ? 'rgba(139, 69, 19, 1)' 
                      : 'rgba(139, 69, 19, 0.2)',
                    transform: 'scale(1.05)'
                  }
                }}
              />
            ))}
          </Box>

          {/* Other Filters Row */}
          <Stack 
            direction="row" 
            spacing={3} 
            justifyContent="space-around"
            alignItems="center"
            sx={{ 
              width: '100%',
              '& > *': { 
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }
            }}
          >
            {/* Brand Filter */}
            <FormControl 
              variant="outlined" 
              fullWidth
              sx={{ 
                minWidth: 120, 
                fontFamily: "'Playfair Display', serif" 
              }}
            >
              <InputLabel 
                sx={{ 
                  fontFamily: "'Playfair Display', serif",
                  color: 'rgba(139, 69, 19, 0.7)' 
                }}
              >
                Brand
              </InputLabel>
              <Select
                value={filters.brand}
                onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value as string }))}
                label="Brand"
                sx={{ 
                  fontFamily: "'Playfair Display', serif",
                  '& .MuiSelect-select': {
                    color: 'rgba(139, 69, 19, 0.9)'
                  }
                }}
              >
                <MenuItem value="" sx={{ fontFamily: "'Playfair Display', serif" }}>
                  All Brands
                </MenuItem>
                {uniqueBrands.map((brand) => (
                  <MenuItem 
                    key={brand} 
                    value={brand} 
                    sx={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {brand}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Price Range Slider */}
            <Box sx={{ width: '100%', px: 2 }}>
              <Typography 
                gutterBottom 
                sx={{ 
                  fontFamily: "'Playfair Display', serif",
                  color: 'rgba(139, 69, 19, 0.7)' 
                }}
              >
                Price Range
              </Typography>
              <Slider
                value={filters.priceRange}
                onChange={(_, newValue) => setFilters(prev => ({ ...prev, priceRange: newValue as number[] }))}
                valueLabelDisplay="auto"
                min={0}
                max={1000}
                sx={{
                  color: 'rgba(139, 69, 19, 0.7)',
                  '& .MuiSlider-thumb': {
                    backgroundColor: 'rgba(139, 69, 19, 0.9)'
                  }
                }}
              />
            </Box>

            {/* Rating Filter */}
            <Box sx={{ width: '100%', px: 2 }}>
              <Typography 
                gutterBottom 
                sx={{ 
                  fontFamily: "'Playfair Display', serif",
                  color: 'rgba(139, 69, 19, 0.7)' 
                }}
              >
                Minimum Rating
              </Typography>
              <Rating
                value={filters.minRating}
                onChange={(_, newValue) => setFilters(prev => ({ ...prev, minRating: newValue || 0 }))}
                sx={{
                  '& .MuiRating-iconFilled': {
                    color: 'rgba(139, 69, 19, 0.9)'
                  }
                }}
              />
            </Box>

            {/* Sorting */}
            <FormControl 
              variant="outlined" 
              fullWidth
              sx={{ 
                minWidth: 120, 
                fontFamily: "'Playfair Display', serif" 
              }}
            >
              <InputLabel 
                sx={{ 
                  fontFamily: "'Playfair Display', serif",
                  color: 'rgba(139, 69, 19, 0.7)' 
                }}
              >
                Sort By
              </InputLabel>
              <Select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as string }))}
                label="Sort By"
                sx={{ 
                  fontFamily: "'Playfair Display', serif",
                  '& .MuiSelect-select': {
                    color: 'rgba(139, 69, 19, 0.9)'
                  }
                }}
              >
                <MenuItem value="relevance" sx={{ fontFamily: "'Playfair Display', serif" }}>
                  Relevance
                </MenuItem>
                <MenuItem value="price_low" sx={{ fontFamily: "'Playfair Display', serif" }}>
                  Price: Low to High
                </MenuItem>
                <MenuItem value="price_high" sx={{ fontFamily: "'Playfair Display', serif" }}>
                  Price: High to Low
                </MenuItem>
                <MenuItem value="rating" sx={{ fontFamily: "'Playfair Display', serif" }}>
                  Top Rated
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Paper>

      {/* Products Grid */}
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: '0 8px 16px rgba(139, 69, 19, 0.2)'
                }
              }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <CardMedia
                component="img"
                height="250"
                image={product.image || product.imageUrl || 'https://via.placeholder.com/400'}
                alt={product.name}
                sx={{
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />
              <CardContent sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column',
                fontFamily: "'Playfair Display', serif"
              }}>
                <Typography 
                  gutterBottom 
                  variant="h5" 
                  component="div"
                  sx={{ 
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    color: 'rgba(139, 69, 19, 0.9)'
                  }}
                >
                  {product.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    fontFamily: "'Playfair Display', serif",
                    flexGrow: 1 
                  }}
                >
                  {product.description}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  mt: 2 
                }}>
                  <Typography 
                    variant="h6"
                    sx={{ 
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                      color: 'rgba(139, 69, 19, 0.9)'
                    }}
                  >
                    ${(product.price * 10).toFixed(2)}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product.id}`);
                      }}
                      sx={{
                        fontFamily: "'Playfair Display', serif",
                        borderColor: 'rgba(139, 69, 19, 0.7)',
                        color: 'rgba(139, 69, 19, 0.9)',
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: 'rgba(139, 69, 19, 0.1)',
                          borderColor: 'rgba(139, 69, 19, 0.9)'
                        }
                      }}
                    >
                      View
                    </Button>
                    <IconButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWishlistToggle(product);
                      }}
                      sx={{ 
                        color: isInWishlist(product.id) 
                          ? 'rgba(139, 69, 19, 0.9)' 
                          : 'rgba(139, 69, 19, 0.5)' 
                      }}
                    >
                      {isInWishlist(product.id) ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No Products Found */}
      {filteredProducts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No products found
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default ProductList;
