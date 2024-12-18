import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import { fetchProducts } from './store/slices/productsSlice';
import theme from './theme';

// Components
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Checkout from './components/Checkout';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Container sx={{ flex: 1, py: 4 }}>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
