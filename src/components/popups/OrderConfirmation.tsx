import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box 
} from '@mui/material';

interface OrderConfirmationProps {
  open: boolean;
  onClose: () => void;
  orderNumber?: string;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ 
  open, 
  onClose, 
  orderNumber = 'N/A' 
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>✅ Order Confirmed</DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <Typography variant="h6">
            Thank you for your purchase!
          </Typography>
          <Typography variant="body1">
            Your order number is: {orderNumber}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            We'll send a confirmation email shortly.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
