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

interface VerifyEmailProps {
  open: boolean;
  onClose: () => void;
}

export const VerifyEmail: React.FC<VerifyEmailProps> = ({ open, onClose }) => {
  const [email, setEmail] = useState('');

  const handleVerify = () => {
    // Placeholder for email verification logic
    if (email) {
      alert('Verification email sent!');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>📧 Verify Your Email</DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <Typography variant="body1">
            Please verify your email address to unlock full account features.
          </Typography>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mt: 2 }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleVerify} color="primary" variant="contained">
          Send Verification
        </Button>
      </DialogActions>
    </Dialog>
  );
};
