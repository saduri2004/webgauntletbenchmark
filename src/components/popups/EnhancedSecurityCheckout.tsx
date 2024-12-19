import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box, 
  TextField 
} from '@mui/material';

interface EnhancedSecurityCheckoutProps {
  open: boolean;
  onClose: () => void;
}

export const EnhancedSecurityCheckout: React.FC<EnhancedSecurityCheckoutProps> = ({ open, onClose }) => {
  const [securityCode, setSecurityCode] = useState('');

  const handleVerify = () => {
    // Placeholder for security verification logic
    if (securityCode) {
      alert('Security verification successful!');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>🔒 Enhanced Security Checkout</DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <Typography variant="body1">
            For your security, please enter the verification code sent to your registered email.
          </Typography>
          <TextField
            fullWidth
            label="Security Code"
            variant="outlined"
            value={securityCode}
            onChange={(e) => setSecurityCode(e.target.value)}
            sx={{ mt: 2 }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleVerify} color="primary" variant="contained">
          Verify
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EnhancedSecurityCheckout;
