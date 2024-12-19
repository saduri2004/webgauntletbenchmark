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

interface AccountLockedProps {
  open: boolean;
  onClose: () => void;
}

export const AccountLocked: React.FC<AccountLockedProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle color="error">⚠️ Account Locked</DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <Typography variant="body1" color="error">
            Your account has been temporarily locked due to suspicious activity.
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Please contact customer support to unlock your account.
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
