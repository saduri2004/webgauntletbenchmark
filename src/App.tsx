import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Container, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import { fetchProducts, setFilters } from './store/slices/productsSlice';
import theme from './theme';
import { StyledEngineProvider } from '@mui/material/styles';
import { NotificationManager } from './components/notifications/NotificationManager';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ScamPopupManager } from './components/popups/ScamPopupManager';

// Components
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './components/Wishlist';
import Checkout from './components/Checkout';

// Wrapper component to handle route-based category management
const RouteWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const categoryId = pathname.startsWith('/category/') ? pathname.split('/')[2] : '';

  React.useEffect(() => {
    if (categoryId) {
      dispatch(setFilters({ category: categoryId }));
    } else if (pathname === '/') {
      dispatch(setFilters({ category: '' }));
    }
  }, [categoryId, pathname, dispatch]);

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Router>
        <NotificationManager />
        <Navbar />
        <ScamPopupManager />
        <Routes>
          <Route 
            path="/" 
            element={
              <RouteWrapper>
                <Container maxWidth={false} sx={{ flex: 1, mt: 2, px: { xs: 2, sm: 3, md: 4 } }}>
                  <ProductList />
                </Container>
              </RouteWrapper>
            } 
          />
          <Route 
            path="/category/:categoryId" 
            element={
              <RouteWrapper>
                <Container maxWidth={false} sx={{ flex: 1, mt: 2, px: { xs: 2, sm: 3, md: 4 } }}>
                  <ProductList />
                </Container>
              </RouteWrapper>
            } 
          />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </Box>
  );
};

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <AppContent />
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
