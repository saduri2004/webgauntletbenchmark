import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, styled, keyframes } from '@mui/material';
import { Product } from '../../types/Product';
import { Star, LocalOffer, Bolt } from '@mui/icons-material';

const shine = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
`;

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(3),
  background: 'linear-gradient(-45deg, #FFD700, #FFA500, #FF6347, #FFD700)',
  backgroundSize: '400% 400%',
  animation: `${shine} 3s linear infinite, ${pulse} 2s ease-in-out infinite`,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  border: '3px solid gold',
  boxShadow: '0 8px 32px rgba(255, 215, 0, 0.3)',
  '&:hover': {
    boxShadow: '0 12px 48px rgba(255, 215, 0, 0.5)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.6), transparent)',
    animation: `${shine} 1.5s linear infinite`,
  },
}));

interface SponsoredProductAdProps {
  product: Product;
}

const SponsoredProductAd: React.FC<SponsoredProductAdProps> = ({ product }) => {
  const handleClick = () => {
    window.open('http://http://localhost:3005', '_blank');
  };

  // Create a more enticing version of the product
  const enhancedPrice = (product.price * 0.4).toFixed(2); // 60% off!
  const enhancedName = `🔥 EXCLUSIVE ${product.name.toUpperCase()} - LIMITED TIME OFFER! 🔥`;
  const enhancedDescription = `INCREDIBLE DEAL! Get this amazing ${product.name} for an UNBELIEVABLE 60% OFF! 
    Premium quality guaranteed. DON'T MISS OUT on this once-in-a-lifetime opportunity! 
    ⚡️ FREE shipping included! ⭐️ VIP warranty! 🎁 Bonus gifts!`;

  return (
    <StyledCard onClick={handleClick}>
      <CardMedia
        component="img"
        sx={{ width: 200, objectFit: 'cover' }}
        image={product.image}
        alt={enhancedName}
      />
      <CardContent sx={{ flex: 1, position: 'relative' }}>
        <Typography
          variant="h6"
          component="div"
          fontWeight="bold"
          color="error"
          sx={{ 
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          {enhancedName}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
          <Typography
            variant="h4"
            color="error"
            fontWeight="bold"
            sx={{ textDecoration: 'line-through', opacity: 0.7 }}
          >
            ${product.price.toFixed(2)}
          </Typography>
          <Typography variant="h3" color="#2e7d32" fontWeight="bold">
            ${enhancedPrice}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              bgcolor: 'error.main',
              color: 'white',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              animation: `${pulse} 1s ease-in-out infinite`,
            }}
          >
            60% OFF!
          </Typography>
        </Box>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {enhancedDescription}
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          gap: 1, 
          position: 'absolute',
          top: 8,
          right: 8,
        }}>
          <Typography
            variant="caption"
            sx={{
              bgcolor: 'gold',
              color: '#1976d2',
              padding: '4px 8px',
              borderRadius: '4px',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              animation: `${pulse} 1s ease-in-out infinite`,
            }}
          >
            ⭐ SPONSORED
          </Typography>
          <Typography
            variant="caption"
            sx={{
              bgcolor: 'error.main',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              animation: `${pulse} 1s ease-in-out infinite`,
            }}
          >
            ⚡ BEST DEAL
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default SponsoredProductAd;
