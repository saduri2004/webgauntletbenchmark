import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Box,
  Stepper,
  Step,
  StepLabel,
  Divider,
} from '@mui/material';
import { RootState } from '../store/store';
import { AIAgentBanner } from './AIAgentBanner';

interface FormData {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  cardName: string;
  cardNumber: string;
  expDate: string;
  cvv: string;
}

const steps = ['Shipping Address', 'Payment Details', 'Review Order'];

const Checkout: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cartTotal = useSelector((state: RootState) => state.cart.total);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '', lastName: '', address1: '', address2: '', 
    city: '', state: '', zip: '', country: '',
    cardName: '', cardNumber: '', expDate: '', cvv: ''
  });

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // Here you would typically send the form data to your backend
    console.log('Submitting order:', formData);
    // Simulate API call
    setTimeout(() => {
      setActiveStep(steps.length);
    }, 1000);
  };

  const ShippingForm = () => (
    <Grid container spacing={3} component="form">
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="firstName"
          name="firstName"
          label="First name"
          fullWidth
          autoComplete="given-name"
          value={formData.firstName}
          onChange={handleFormChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="lastName"
          name="lastName"
          label="Last name"
          fullWidth
          autoComplete="family-name"
          value={formData.lastName}
          onChange={handleFormChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="address1"
          name="address1"
          label="Address line 1"
          fullWidth
          autoComplete="shipping address-line1"
          value={formData.address1}
          onChange={handleFormChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="address2"
          name="address2"
          label="Address line 2"
          fullWidth
          autoComplete="shipping address-line2"
          value={formData.address2}
          onChange={handleFormChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="city"
          name="city"
          label="City"
          fullWidth
          autoComplete="shipping address-level2"
          value={formData.city}
          onChange={handleFormChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="state"
          name="state"
          label="State/Province/Region"
          fullWidth
          value={formData.state}
          onChange={handleFormChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="zip"
          name="zip"
          label="Zip / Postal code"
          fullWidth
          autoComplete="shipping postal-code"
          value={formData.zip}
          onChange={handleFormChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="country"
          name="country"
          label="Country"
          fullWidth
          autoComplete="shipping country"
          value={formData.country}
          onChange={handleFormChange}
        />
      </Grid>
    </Grid>
  );

  const PaymentForm = () => (
    <Grid container spacing={3} component="form">
      <Grid item xs={12}>
        <TextField
          required
          id="cardName"
          name="cardName"
          label="Name on card"
          fullWidth
          autoComplete="cc-name"
          value={formData.cardName}
          onChange={handleFormChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="cardNumber"
          name="cardNumber"
          label="Card number"
          fullWidth
          autoComplete="cc-number"
          value={formData.cardNumber}
          onChange={handleFormChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="expDate"
          name="expDate"
          label="Expiry date"
          fullWidth
          autoComplete="cc-exp"
          value={formData.expDate}
          onChange={handleFormChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="cvv"
          name="cvv"
          label="CVV"
          helperText="Last three digits on signature strip"
          fullWidth
          autoComplete="cc-csc"
          value={formData.cvv}
          onChange={handleFormChange}
        />
      </Grid>
    </Grid>
  );

  const OrderSummary = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      {cartItems.map((item) => (
        <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
          <Typography>
            {item.name} x {item.quantity}
          </Typography>
          <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
        </Box>
      ))}
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6">${cartTotal.toFixed(2)}</Typography>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Shipping Address
        </Typography>
        <Typography>
          {formData.firstName} {formData.lastName}
        </Typography>
        <Typography>{formData.address1}</Typography>
        {formData.address2 && <Typography>{formData.address2}</Typography>}
        <Typography>
          {formData.city}, {formData.state} {formData.zip}
        </Typography>
        <Typography>{formData.country}</Typography>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Payment Details
        </Typography>
        <Typography>
          Card ending in {formData.cardNumber.slice(-4)}
        </Typography>
        <Typography>
          Expires: {formData.expDate}
        </Typography>
      </Box>
    </Box>
  );

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ShippingForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <OrderSummary />;
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mb: 4, mt: 4 }}>
      <AIAgentBanner />
      <Paper sx={{ p: 4 }}>
       
       
       <Typography component="h1" variant="h4" align="center" gutterBottom>
          Checkout
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant="subtitle1">
              Your order number is #2001539. We have emailed your order
              confirmation, and will send you an update when your order has
              shipped.
            </Typography>
          </>
        ) : (
          <>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
              >
                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Checkout;
