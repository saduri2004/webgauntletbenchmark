import React from 'react';
import { AppBar, Box, IconButton, Badge, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import CategoryHeader from './CategoryHeader';

const Navbar = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="fixed" sx={{ 
        background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: '10px 20px'
        }}>
          <Box 
            onClick={() => navigate('/')} 
            sx={{ 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            <img 
              src="/vite.svg" 
              alt="Logo" 
              style={{ 
                height: '32px',
                width: 'auto',
                filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.3))'
              }} 
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography 
                variant="h5" 
                component="div"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                  letterSpacing: '1px',
                  fontFamily: "'Montserrat', sans-serif"
                }}
              >
                Web Gauntlet
              </Typography>
              <Typography 
                variant="caption"
                sx={{
                  color: '#FFA500',
                  letterSpacing: '3px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '0.7rem',
                  opacity: 0.9
                }}
              >
                Online Store
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton 
              color="inherit"
              onClick={() => navigate('/wishlist')}
            >
              <Badge badgeContent={wishlistItems.length} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <IconButton 
              color="inherit"
              onClick={() => navigate('/cart')}
            >
              <Badge badgeContent={cartItems.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Box>
      </AppBar>
      <Box sx={{ marginTop: '64px' }}>
        <CategoryHeader />
      </Box>
    </Box>
  );
};

export default Navbar;
