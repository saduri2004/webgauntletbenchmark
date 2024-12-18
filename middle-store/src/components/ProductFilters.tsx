import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Slider,
  Rating,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Paper,
  Checkbox,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { RootState } from '../store/store';
import { setFilters, clearFilters } from '../store/slices/productsSlice';
import { products } from '../data/products';

// Extract unique brands and categories from products
const uniqueBrands = Array.from(new Set(products.map(p => p.brand)));
const uniqueCategories = Array.from(new Set(products.map(p => p.categoryId)));

interface ProductFiltersProps {
  updateFilters: (filters: any) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ updateFilters }) => {
  const dispatch = useDispatch();
  const { categories, filters, brands, features } = useSelector((state: RootState) => state.products);

  const [localFilters, setLocalFilters] = useState({
    category: '',
    priceRange: [0, 1000],
    brand: '',
    minRating: 0,
    sortBy: 'relevance'
  });

  // Dynamically calculate max price
  const maxPrice = Math.max(...products.map(p => p.price));

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    const newFilters = { ...localFilters, priceRange: newValue as [number, number] };
    setLocalFilters(newFilters);
    updateFilters(newFilters);
  };

  const handleRatingChange = (event: React.SyntheticEvent, newValue: number | null) => {
    const newFilters = { ...localFilters, minRating: newValue || 0 };
    setLocalFilters(newFilters);
    updateFilters(newFilters);
  };

  const handleCategoryChange = (categoryId: string) => {
    const newFilters = { ...localFilters, category: categoryId };
    setLocalFilters(newFilters);
    updateFilters(newFilters);
  };

  const handleBrandChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newFilters = { ...localFilters, brand: event.target.value as string };
    setLocalFilters(newFilters);
    updateFilters(newFilters);
  };

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newFilters = { ...localFilters, sortBy: event.target.value as string };
    setLocalFilters(newFilters);
    updateFilters(newFilters);
  };

  const handleClearFilters = () => {
    const defaultFilters = {
      category: '',
      priceRange: [0, maxPrice],
      brand: '',
      minRating: 0,
      sortBy: 'relevance'
    };
    setLocalFilters(defaultFilters);
    updateFilters(defaultFilters);
  };

  return (
    <Box sx={{ 
      width: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      gap: 3,  
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      py: 2,   
      px: 3,   
      backgroundColor: 'background.paper',
      borderRadius: 2,  
      boxShadow: 1,     
    }}>
      {/* Sort By Dropdown */}
      <FormControl sx={{ minWidth: 150 }} size="small">
        <InputLabel>Sort By</InputLabel>
        <Select
          value={localFilters.sortBy}
          onChange={handleSortChange}
          label="Sort By"
        >
          <MenuItem value="relevance">Relevance</MenuItem>
          <MenuItem value="price_low">Price: Low to High</MenuItem>
          <MenuItem value="price_high">Price: High to Low</MenuItem>
          <MenuItem value="rating">Highest Rated</MenuItem>
          <MenuItem value="newest">New Arrivals</MenuItem>
        </Select>
      </FormControl>

      {/* Categories Chips */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1, 
        flexWrap: 'wrap' 
      }}>
        <Chip
          label="All"
          variant={localFilters.category === '' ? 'filled' : 'outlined'}
          color="primary"
          onClick={() => {
            const newFilters = { ...localFilters, category: '' };
            setLocalFilters(newFilters);
            updateFilters(newFilters);
          }}
          sx={{ 
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        />
        {uniqueCategories.map((categoryId) => (
          <Chip
            key={categoryId}
            label={categoryId}
            variant={localFilters.category === categoryId ? 'filled' : 'outlined'}
            color="primary"
            onClick={() => {
              const newFilters = { ...localFilters, category: categoryId };
              setLocalFilters(newFilters);
              updateFilters(newFilters);
            }}
            sx={{ 
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
        ))}
      </Box>

      {/* Price Range Slider */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2, 
        minWidth: 200 
      }}>
        <Typography variant="body2">Price:</Typography>
        <Slider
          value={localFilters.priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={maxPrice}
          sx={{ width: 150 }}
        />
        <Typography variant="body2">
          ${localFilters.priceRange[0]} - ${localFilters.priceRange[1]}
        </Typography>
      </Box>

      {/* Rating Filter */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2">Rating:</Typography>
        <Rating
          value={localFilters.minRating}
          onChange={handleRatingChange}
          precision={0.5}
          size="small"
        />
      </Box>

      {/* Clear Filters Button */}
      <Button 
        size="small" 
        color="secondary" 
        variant="outlined"
        onClick={handleClearFilters}
      >
        Clear Filters
      </Button>
    </Box>
  );
};

export default ProductFilters;
