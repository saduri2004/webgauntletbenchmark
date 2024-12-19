import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  IconButton,
  Rating,
  Box,
  Chip,
  CardActions,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import { RootState } from '../store/store';
import { Product } from '../data/types';
import { Favorite, FavoriteBorder, ShoppingCart } from '@mui/icons-material';

interface ProductListSearchProps {
  products: Product[];
}

export const ProductListSearch: React.FC<ProductListSearchProps> = ({ products }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              '&:hover': {
                boxShadow: 6,
                transform: 'scale(1.02)',
                transition: 'all 0.2s ease-in-out',
              },
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={product.image}
              alt={product.name}
              sx={{ cursor: 'pointer', objectFit: 'contain', p: 2 }}
              onClick={() => navigate(`/product/${product.id}`)}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography 
                  gutterBottom 
                  variant="h6" 
                  component="div"
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': { color: 'primary.main' },
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {product.name}
                </Typography>
                <IconButton 
                  onClick={() => handleWishlistToggle(product)}
                  color="secondary"
                  size="small"
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

              <Typography variant="h6" color="primary">
                ${product.price.toFixed(2)}
              </Typography>
            </CardContent>

            <CardActions sx={{ p: 2, pt: 0 }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<ShoppingCart />}
                onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
                size="small"
              >
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
