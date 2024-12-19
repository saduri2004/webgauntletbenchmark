import React from 'react';
import { Box } from '@mui/material';
import { AdSlot as AdSlotType } from '../../data/ads_config';

interface AdSlotProps {
  slot: AdSlotType;
  children: React.ReactNode;
}

export const AdSlot: React.FC<AdSlotProps> = ({ slot, children }) => {
  return (
    <Box
      sx={{
        width: slot.width,
        height: slot.height,
        position: slot.position || 'relative',
        zIndex: slot.zIndex,
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        margin: 0,
        padding: 0,
        ...(slot.type === 'left' && {
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)'
        }),
        ...(slot.type === 'right' && {
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)'
        }),
        ...(slot.type === 'popup' && {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        })
      }}
    >
      {children}
    </Box>
  );
};
