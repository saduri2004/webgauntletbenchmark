import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Button,
  Rating,
  Box,
  Paper,
  Divider,
  IconButton,
  Chip,
  Card,
  CardContent,
  Avatar,
  ImageList,
  ImageListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tabs,
  Tab,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Tooltip,
  Badge,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { RootState } from '../store/store';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import { Product, Review, ProductVariant } from '../data/types';
import { applyPromotionalDiscounts } from '../utils/promotionalDiscounts';
import { AIAgentBanner } from './AIAgentBanner';
import { products } from '../data/products';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div hidden={value !== index} style={{ padding: '20px 0' }}>
    {value === index && children}
  </div>
);

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [tabValue, setTabValue] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  
  const product = products.find((p: Product) => p.id === id);
  
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = product ? wishlistItems.some(item => item.id === product.id) : false;

  if (!product) {
    return <Typography>Product not found</Typography>;
  }

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleVariantChange = (type: string, value: string) => {
    setSelectedVariants(prev => ({ ...prev, [type]: value }));
  };

  const getVariantsByType = (type: 'color' | 'size' | 'style' | 'material'): ProductVariant[] => {
    return product.variants?.filter(v => v.type === type) || [];
  };

  const calculateCurrentPrice = (): number => {
    let price = product.price;
    Object.entries(selectedVariants).forEach(([type, value]) => {
      const variant = product.variants?.find(v => v.type === type && v.value === value);
      if (variant?.price) {
        price = variant.price;
      }
    });
    return price;
  };

  const discountedProduct = product 
    ? applyPromotionalDiscounts([product])[0] 
    : null;

  const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
            {review.userName.charAt(0)}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1">
                {review.userName}
                {review.verifiedPurchase && (
                  <Tooltip title="Verified Purchase">
                    <CheckCircleIcon color="primary" sx={{ ml: 1, fontSize: 16 }} />
                  </Tooltip>
                )}
              </Typography>
              <Typography variant="caption">
                {new Date(review.date).toLocaleDateString()}
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ my: 1 }}>{review.title}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating value={review.rating} readOnly size="small" />
            </Box>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {review.comment}
        </Typography>
        {review.images && (
          <ImageList sx={{ width: '100%', height: 100 }} cols={3} rowHeight={100}>
            {review.images.map((image, index) => (
              <ImageListItem key={index}>
                <img src={image} alt={`Review image ${index + 1}`} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Button
            size="small"
            startIcon={<ThumbUpIcon />}
            sx={{ mr: 1 }}
          >
            Helpful ({review.helpful})
          </Button>
          <Button
            size="small"
            startIcon={<ThumbDownIcon />}
          >
            Not Helpful ({review.notHelpful})
          </Button>
        </Box>
        {review.replies?.map((reply) => (
          <Box key={reply.id} sx={{ ml: 4, mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center' }}>
              {reply.isSellerResponse && (
                <Chip label="Seller" size="small" color="primary" sx={{ mr: 1 }} />
              )}
              {reply.userName}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {reply.comment}
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* AI Agent Banner */}
      <AIAgentBanner />

      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 4 }}
      >
        Back to Products
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ mb: 2 }}>
            <img
              src={selectedImage || product.image}
              alt={product.name}
              style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
            />
          </Paper>
          <ImageList sx={{ width: '100%', height: 100 }} cols={4} rowHeight={100}>
            <ImageListItem key={product.image} onClick={() => setSelectedImage(product.image)}>
              <img src={product.image} alt={product.name} loading="lazy" />
            </ImageListItem>
            {product.additionalImages?.map((image, index) => (
              <ImageListItem key={index} onClick={() => setSelectedImage(image)}>
                <img src={image} alt={`${product.name} ${index + 1}`} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                by {product.brand}
              </Typography>
            </Box>
            <IconButton
              onClick={handleWishlistToggle}
              color="secondary"
              size="large"
            >
              {isInWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={product.rating} precision={0.5} readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.reviewCount} reviews)
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Chip label={product.category} />
            {product.subCategory && <Chip label={product.subCategory} variant="outlined" />}
            {product.condition && product.condition !== 'new' && (
              <Chip label={product.condition?.replace('-', ' ')} color="secondary" />
            )}
            {product.isEcoFriendly && (
              <Chip icon={<CheckCircleIcon />} label="Eco-Friendly" color="success" />
            )}
          </Stack>

          <Box sx={{ mb: 3 }}>
            {discountedProduct && (
              <Box sx={{ mb: 2 }}>
                {discountedProduct.promotionalDiscount && (
                  <Chip 
                    label={`${discountedProduct.promotionalDiscount}`} 
                    color="error"
                    size="small"
                    sx={{ 
                      mb: 2,
                      fontWeight: 'bold',
                      backgroundColor: 'error.main',
                      color: 'white',
                      borderRadius: 1,
                      px: 1,
                      py: 0.5
                    }}
                  />
                )}
                
                {discountedProduct.originalPrice && discountedProduct.originalPrice !== discountedProduct.price ? (
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 2 }}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        textDecoration: 'line-through', 
                        color: 'text.disabled' 
                      }}
                    >
                      Original: ${discountedProduct.originalPrice.toFixed(2)}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="primary"
                      sx={{ fontWeight: 'bold' }}
                    >
                      Now: ${discountedProduct.price.toFixed(2)}
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="h5" color="primary">
                    ${discountedProduct.price.toFixed(2)}
                  </Typography>
                )}
              </Box>
            )}
            {discountedProduct && discountedProduct.originalPrice === discountedProduct.price && (
              <Typography variant="h5" color="primary">
                ${discountedProduct.price.toFixed(2)}
              </Typography>
            )}
            {!discountedProduct && (
              <Typography variant="h5" color="primary">
                ${calculateCurrentPrice().toFixed(2)}
              </Typography>
            )}
            {product.originalPrice && product.originalPrice !== product.price && (
              <Typography
                component="span"
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                  fontSize: '1rem'
                }}
              >
                ${product.originalPrice.toFixed(2)}
              </Typography>
            )}
          </Box>

          {/* Variants Selection */}
          <Box sx={{ mb: 3 }}>
            {getVariantsByType('color').length > 0 && (
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Color</InputLabel>
                <Select
                  value={selectedVariants.color || ''}
                  onChange={(e) => handleVariantChange('color', e.target.value)}
                  label="Color"
                >
                  {getVariantsByType('color').map((variant) => (
                    <MenuItem key={variant.id} value={variant.value}>
                      {variant.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {getVariantsByType('size').length > 0 && (
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Size</InputLabel>
                <Select
                  value={selectedVariants.size || ''}
                  onChange={(e) => handleVariantChange('size', e.target.value)}
                  label="Size"
                >
                  {getVariantsByType('size').map((variant) => (
                    <MenuItem key={variant.id} value={variant.value}>
                      {variant.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>

          <Box sx={{ mb: 3 }}>
            {product.inStock ? (
              <Alert severity="success" sx={{ mb: 2 }}>
                In Stock ({product.stock} available)
              </Alert>
            ) : (
              <Alert severity="error" sx={{ mb: 2 }}>
                Out of Stock
              </Alert>
            )}
          </Box>

          <Button
            variant="contained"
            size="large"
            fullWidth
            startIcon={<ShoppingCartIcon />}
            onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
            disabled={!product.inStock}
            sx={{ mb: 2 }}
          >
            Add to Cart
          </Button>

          {/* Delivery and Return Info */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              <LocalShippingIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Delivery Information
            </Typography>
            <Typography variant="body2" paragraph>
              {product.deliveryInfo.isFreeDelivery ? 'Free Delivery' : `Shipping: $${product.deliveryInfo.shippingCost}`}
            </Typography>
            <Typography variant="body2">
              Estimated delivery: {product.deliveryInfo.estimatedDays} days
            </Typography>
            {product.deliveryInfo.expeditedAvailable && (
              <Typography variant="body2" color="primary">
                Expedited delivery available (+${product.deliveryInfo.expeditedCost})
              </Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
              <Tab label="Description" />
              <Tab label="Specifications" />
              <Tab label="Reviews" />
              <Tab label="Return Policy" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Typography variant="body1">{product.description}</Typography>
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>Features</Typography>
              <Grid container spacing={1}>
                {product.features.map((feature, index) => (
                  <Grid item key={index}>
                    <Chip label={feature} variant="outlined" />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <TableContainer>
              <Table>
                <TableBody>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row" sx={{ width: '30%' }}>
                        {key}
                      </TableCell>
                      <TableCell>{Array.isArray(value) ? value.join(', ') : value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Box sx={{ maxWidth: 800, mx: 'auto' }}>
              {product.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Typography variant="h6" gutterBottom>Return Policy</Typography>
            <Typography variant="body1" paragraph>
              {product.returnPolicy.isFreeTurn ? 'Free Returns' : 'Paid Returns'}
            </Typography>
            <Typography variant="body2" paragraph>
              Return window: {product.returnPolicy.daysToReturn} days
            </Typography>
            {product.returnPolicy.conditions && (
              <>
                <Typography variant="subtitle1" gutterBottom>Conditions:</Typography>
                <ul>
                  {product.returnPolicy.conditions.map((condition, index) => (
                    <li key={index}>
                      <Typography variant="body2">{condition}</Typography>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {product.returnPolicy.restockingFee && (
              <Typography variant="body2" color="error">
                Restocking Fee: ${product.returnPolicy.restockingFee}
              </Typography>
            )}
          </TabPanel>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
