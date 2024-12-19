import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
} from '@mui/material';
import { RootState } from '../store/store';
import { setFilters } from '../store/slices/productsSlice';
import { Category } from '../data/types';
import { getRandomPopupAd } from '../data/ads_config';
import { PrizeSelector, SpinWheel, AccountLocked, VerifyEmail } from './popups';

const CategoryHeader: React.FC = () => {
  const categories = useSelector((state: RootState) => state.products.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [currentPopup, setCurrentPopup] = useState<any>(null);

  // Split categories into two rows
  const halfLength = Math.ceil(categories.length / 2);
  const firstRow = categories.slice(0, halfLength);
  const secondRow = categories.slice(halfLength);

  const handleClosePopup = () => {
    setShowPopup(false);
    setTimeout(() => {
      setCurrentPopup(null);
    }, 300);
  };

  const renderPopup = () => {
    if (!currentPopup) return null;

    const PopupComponent = {
      'prize-selector': PrizeSelector,
      'spin-wheel': SpinWheel,
      'account-locked': AccountLocked,
      'verify-email': VerifyEmail,
    }[currentPopup.component];

    if (!PopupComponent) return null;

    return (
      <PopupComponent
        open={showPopup}
        onClose={handleClosePopup}
      />
    );
  };

  const handleCategorySelect = (categoryId: string) => {
    dispatch(setFilters({ category: categoryId }));
    navigate(`/category/${categoryId}`);

    // Show popup when filter is clicked
    const popup = getRandomPopupAd();
    if (popup) {
      setCurrentPopup(popup);
      setTimeout(() => {
        setShowPopup(true);
      }, 500);
    }
  };

  return (
    <>
      {renderPopup()}
      <AppBar 
        position="static" 
        color="default" 
        sx={{ 
          mt: 8, 
          boxShadow: 1,
          backgroundColor: '#f8f8f8',
          width: '100%'
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ py: 1 }}>
            <Grid container direction="column" spacing={1}>
              {/* First Row */}
              <Grid item>
                <Grid container spacing={1} justifyContent="space-between">
                  {firstRow.map((category: Category) => (
                    <Grid item key={category.id}>
                      <Button
                        color="inherit"
                        onClick={() => handleCategorySelect(category.id)}
                        sx={{
                          textTransform: 'none',
                          '&:hover': {
                            color: 'primary.main',
                            backgroundColor: 'transparent',
                          },
                        }}
                      >
                        {category.icon} {category.name}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              
              {/* Second Row */}
              <Grid item>
                <Grid container spacing={1} justifyContent="space-between">
                  {secondRow.map((category: Category) => (
                    <Grid item key={category.id}>
                      <Button
                        color="inherit"
                        onClick={() => handleCategorySelect(category.id)}
                        sx={{
                          textTransform: 'none',
                          '&:hover': {
                            color: 'primary.main',
                            backgroundColor: 'transparent',
                          },
                        }}
                      >
                        {category.icon} {category.name}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </AppBar>
    </>
  );
};

export default CategoryHeader;
