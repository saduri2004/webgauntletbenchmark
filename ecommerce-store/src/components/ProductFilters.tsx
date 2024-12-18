import React, { useState } from 'react';
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
  Select,
  MenuItem,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { products } from '../data/products';

// Extract unique brands and categories from products
const uniqueBrands = Array.from(new Set(products.map(p => p.brand)));
const uniqueCategories = Array.from(new Set(products.map(p => p.categoryId)));

interface ProductFiltersProps {
  updateFilters: (filters: any) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ updateFilters }) => {
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

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...localFilters, category: event.target.value };
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
    <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Filters</Typography>
        <Button 
          size="small" 
          color="secondary" 
          onClick={handleClearFilters}
        >
          Clear All
        </Button>
      </Box>

      {/* Sort Options */}
      <Box sx={{ mb: 4 }}>
        <FormControl fullWidth>
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
      </Box>

      {/* Categories */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Categories</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            <RadioGroup value={localFilters.category} onChange={handleCategoryChange}>
              <FormControlLabel value="" control={<Radio />} label="All Categories" />
              {uniqueCategories.map((categoryId) => (
                <FormControlLabel
                  key={categoryId}
                  value={categoryId}
                  control={<Radio />}
                  label={categoryId}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      {/* Price Range */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Price Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            value={localFilters.priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={maxPrice}
            sx={{ mt: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2">${localFilters.priceRange[0]}</Typography>
            <Typography variant="body2">${localFilters.priceRange[1]}</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Rating Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Minimum Rating</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Rating
            value={localFilters.minRating}
            onChange={handleRatingChange}
            precision={0.5}
          />
        </AccordionDetails>
      </Accordion>

      {/* Brands */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Brands</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth>
            <Select
              value={localFilters.brand}
              onChange={handleBrandChange}
              displayEmpty
            >
              <MenuItem value="">All Brands</MenuItem>
              {uniqueBrands.map((brand) => (
                <MenuItem key={brand} value={brand}>
                  {brand}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default ProductFilters;
