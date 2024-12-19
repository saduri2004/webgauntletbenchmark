import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Advertisement as AdvertisementType, AdSlot as AdSlotType } from '../../data/ads_config';

interface AdvertisementProps {
  ad: AdvertisementType;
  slot: AdSlotType;
  onClose?: () => void;
}

const AdContainer = styled(Box)<{ slot: AdSlotType }>(({ slot }) => ({
  position: slot.position || 'relative',
  width: slot.width || 'auto',
  height: slot.height || 'auto',
  zIndex: slot.zIndex || 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  ...(slot.style || {})
}));

const Advertisement: React.FC<AdvertisementProps> = ({ ad, slot, onClose }) => {
  return (
    <AdContainer slot={slot}>
      <div style={{ 
        position: 'relative',
        maxWidth: slot.width,
        width: '100%',
        backgroundColor: 'white',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        {slot.type === 'popup' && onClose && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              right: '15px',
              top: '15px',
              background: 'rgba(255, 255, 255, 0.9)',
              border: '2px solid #666',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              zIndex: 1001,
              fontSize: '24px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
              padding: 0,
              lineHeight: '1',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            ×
          </button>
        )}
        <img
          src={ad.imagePath}
          alt={ad.altText || 'Advertisement'}
          style={{ 
            width: '100%',
            height: slot.type === 'banner' ? '180px' : 'auto',
            display: 'block',
            cursor: 'pointer',
            objectFit: slot.type === 'banner' ? 'contain' : 'cover'
          }}
          onClick={() => window.open(ad.link, '_blank', 'noopener,noreferrer')}
        />
        {ad.caption && (
          <div style={{
            padding: '15px',
            textAlign: 'center',
            backgroundColor: 'white',
            borderTop: '1px solid #eee',
            fontSize: '16px',
            color: '#333',
            fontWeight: 500,
            cursor: 'pointer'
          }}
          onClick={() => window.open(ad.link, '_blank', 'noopener,noreferrer')}
          >
            {ad.caption}
          </div>
        )}
      </div>
    </AdContainer>
  );
};

export { Advertisement };
