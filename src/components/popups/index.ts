import React from 'react';

interface PopupProps {
  open: boolean;
  onClose: () => void;
}

export { PrizeSelector } from './PrizeSelector';
export { SpinWheel } from './SpinWheel';
export { AccountLocked } from './AccountLocked';
export { VerifyEmail } from './VerifyEmail';
export { ShippingInfo } from './ShippingInfo';
export { OrderConfirmation } from './OrderConfirmation';
export { EnhancedSecurityCheckout } from './EnhancedSecurityCheckout';
export { ScamPopupManager } from './ScamPopupManager';
