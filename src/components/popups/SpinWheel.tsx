import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box 
} from '@mui/material';

interface SpinWheelProps {
  open: boolean;
  onClose: () => void;
}

export const SpinWheel: React.FC<SpinWheelProps> = ({ open, onClose }) => {
  const [spinResult, setSpinResult] = useState<string | null>(null);

  const handleSpin = () => {
    const prizes = ['10% Off', '$20 Coupon', 'Free Shipping', 'Mystery Bonus'];
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    setSpinResult(randomPrize);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>🎡 Spin the Wheel</DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <Typography variant="h6">
            {spinResult ? `You won: ${spinResult}!` : 'Ready to spin?'}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSpin}
            sx={{ mt: 2 }}
          >
            Spin Now
          </Button>
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
