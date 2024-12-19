import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Box,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { RootState } from '../store/store';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = useSelector((state: RootState) => state.cart.total);

  if (cartItems.length === 0) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <ShoppingCartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Your cart is empty
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
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={3}>
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      sx={{ borderRadius: 1, maxHeight: 120, objectFit: 'contain' }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h6" gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${item.price.toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton
                        size="small"
                        onClick={() => 
                          dispatch(updateQuantity({ 
                            id: item.id, 
                            quantity: Math.max(0, item.quantity - 1)
                          }))
                        }
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => 
                          dispatch(updateQuantity({ 
                            id: item.id, 
                            quantity: item.quantity + 1
                          }))
                        }
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Typography variant="subtitle1" sx={{ mr: 2 }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                      <IconButton
                        color="error"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summarys
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Subtotal</Typography>
                <Typography>${total.toFixed(2)}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Shipping</Typography>
                <Typography>Free</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary">
                  ${total.toFixed(2)}
                </Typography>
              </Box>

              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCartCheckoutIcon />}
                onClick={() => window.open('http://localhost:3005', '_blank')}
                sx={{
                  background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
                  border: 0,
                  borderRadius: '25px',
                  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                  color: 'white',
                  padding: '12px 30px',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': {
                      transform: 'scale(1)',
                      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                    },
                    '50%': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 5px 15px 4px rgba(255, 105, 135, .4)',
                    },
                    '100%': {
                      transform: 'scale(1)',
                      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                    },
                  },
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FF8E53 30%, #FF6B6B 90%)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease-in-out',
                  },
                }}
              >
                Checkout Now! 🔥
              </Button>
              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => window.open('http://localhost:3005', '_blank')}
                  sx={{
                    background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                    color: '#000',
                    fontWeight: 'bold',
                    animation: 'flash 1.5s infinite',
                    '@keyframes flash': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.7 },
                    },
                  }}
                >
                  🎯 New Promo Code: SAVE90NOW!!! 🎯
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => window.open('http://localhost:3005', '_blank')}
                  sx={{
                    background: 'linear-gradient(45deg, #FF1493 30%, #FF69B4 90%)',
                    color: '#fff',
                    fontWeight: 'bold',
                    animation: 'bounce 1s infinite',
                    '@keyframes bounce': {
                      '0%, 100%': { transform: 'translateY(0)' },
                      '50%': { transform: 'translateY(-5px)' },
                    },
                  }}
                >
                  ⚡️ Flash Sale: Extra 20% OFF! ⚡️
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
