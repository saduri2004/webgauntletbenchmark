import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Typography, styled, keyframes, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/Product';
import { Star, LocalOffer, Bolt } from '@mui/icons-material';
import { generateFakeProduct, fakeProductTemplates } from '../../data/fake_products';

const shimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(-45deg, #FF6B6B, #4ECDC4, #45B7D1, #96C93D, #FF6B6B)',
  backgroundSize: '400% 400%',
  animation: `${shimmer} 3s linear infinite`,
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1.2rem',
  padding: '15px',
  marginBottom: '16px',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent)',
    animation: `${shimmer} 1.5s linear infinite`,
  },
}));

const StarIcon = styled(Star)(({ theme }) => ({
  animation: `${rotate} 4s linear infinite`,
  color: '#FFD700',
  position: 'absolute',
  fontSize: '24px',
}));

const ButtonContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  animation: `${pulse} 2s ease-in-out infinite`,
});

const SponsoredCard = ({ product }: { product: Product }) => (
  <Card sx={{ 
    display: 'flex', 
    mb: 2, 
    border: '2px solid #1976d2',
    position: 'relative',
    background: 'linear-gradient(45deg, #fff, #f0f8ff)',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out',
    height: '100%',
    '&:hover': {
      transform: 'scale(1.02)',
    }
  }}>
    <CardMedia
      component="img"
      sx={{ width: 100, height: '100%', objectFit: 'cover' }}
      image={product.image}
      alt={product.name}
    />
    <CardContent sx={{ flex: 1 }}>
      <Typography variant="subtitle1" component="div" fontWeight="bold" color="#1976d2">
        {product.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {product.description}
      </Typography>
      <Typography variant="h6" color="#2e7d32" sx={{ mt: 1, fontWeight: 'bold' }}>
        ${product.price.toFixed(2)}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          bgcolor: 'gold',
          color: '#1976d2',
          padding: '4px 8px',
          borderRadius: '4px',
          fontWeight: 'bold',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        ⭐ Sponsored
      </Typography>
    </CardContent>
  </Card>
);

interface SearchAdsProps {
  searchQuery: string;
  products: Product[];
  selectedCategory?: string;
}

const SearchAds = ({ searchQuery, products, selectedCategory }: SearchAdsProps) => {
  const navigate = useNavigate();
  const [starPositions, setStarPositions] = useState<Array<{ top: string; left: string }>>([]);
  const [sponsoredProducts, setSponsoredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const positions = Array.from({ length: 5 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }));
    setStarPositions(positions);
  }, []);

  useEffect(() => {
    const newSponsoredProducts: Product[] = [];
    
    // If in a specific category, show 3 random products from that category
    if (selectedCategory) {
      const template = fakeProductTemplates.find(t => t.category === selectedCategory);
      if (template) {
        for (let i = 0; i < 3; i++) {
          const templateProduct = template.products[Math.floor(Math.random() * template.products.length)];
          newSponsoredProducts.push({
            ...templateProduct,
            id: `fake-${selectedCategory}-${Date.now()}-${Math.random()}`,
            category: selectedCategory,
          });
        }
      }
    }
    // Otherwise, show 3 random products from any category
    else {
      const categories = Array.from(new Set(products.map(p => p.category)));
      for (let i = 0; i < 3; i++) {
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const template = fakeProductTemplates.find(t => t.category === randomCategory);
        if (template) {
          const templateProduct = template.products[Math.floor(Math.random() * template.products.length)];
          newSponsoredProducts.push({
            ...templateProduct,
            id: `fake-random-${Date.now()}-${Math.random()}`,
            category: randomCategory,
          });
        }
      }
    }

    setSponsoredProducts(newSponsoredProducts);
  }, [selectedCategory, products]);

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={3}>
        {sponsoredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <SponsoredCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SearchAds;
