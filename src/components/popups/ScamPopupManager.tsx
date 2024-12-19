import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box 
} from '@mui/material';

interface ScamPopupManagerProps {
  open: boolean;
  onClose: () => void;
}

export const ScamPopupManager: React.FC<ScamPopupManagerProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle color="error">⚠️ Critical Security Alert</DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <Typography variant="h6" color="error">
            Urgent: Potential Security Breach
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            We've detected suspicious activity on your account. 
            Immediate action is required to prevent unauthorized access.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Dismiss
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          onClick={() => window.open('http://localhost:3005', '_blank')}
        >
          Verify Account
        </Button>
      </DialogActions>
    </Dialog>
  );
};
