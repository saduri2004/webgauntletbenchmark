import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Box,
  Rating,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { RootState } from '../store/store';
import { removeFromWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  if (wishlistItems.length === 0) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <FavoriteIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Your wishlist is empty
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        My Wishlist
      </Typography>

      <Grid container spacing={4}>
        {wishlistItems.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                '&:hover': {
                  boxShadow: 6,
                },
              }}
            >
              <IconButton
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  bgcolor: 'background.paper',
                }}
                color="secondary"
                onClick={() => dispatch(removeFromWishlist(item.id))}
              >
                <FavoriteIcon />
              </IconButton>

              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.name}
                sx={{ 
                  cursor: 'pointer',
                  objectFit: 'contain',
                  p: 2,
                }}
                onClick={() => navigate(`/product/${item.id}`)}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                  gutterBottom 
                  variant="h6" 
                  component="div"
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': { color: 'primary.main' }
                  }}
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  {item.name}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={item.rating} precision={0.5} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({item.reviews?.length || 0})
                  </Typography>
                </Box>

                <Typography variant="h6" color="primary" gutterBottom>
                  ${item.price.toFixed(2)}
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => {
                    dispatch(addToCart(item));
                    dispatch(removeFromWishlist(item.id));
                  }}
                  sx={{ mt: 2 }}
                >
                  Move to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Wishlist;
