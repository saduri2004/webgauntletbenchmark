import { Category } from './types';
import { ComponentType } from 'react';

export interface AdSlot {
  id: string;
  type: 'popup' | 'banner' | 'left' | 'right' | 'bottom' | 'sidebar' | 'checkout' | 'button';
  width: string;
  height: string;
  position?: 'fixed' | 'absolute' | 'relative';
  zIndex?: number;
  style?: {
    display?: string;
    justifyContent?: string;
    alignItems?: string;
    margin?: string;
    overflow?: string;
    top?: string;
    left?: string;
    transform?: string;
    backgroundColor?: string;
    padding?: string;
    boxShadow?: string;
    borderRadius?: string;
    marginBottom?: string;
  }
}

export interface Advertisement {
  id: string;
  slotId: string;
  type: 'image' | 'component';
  imagePath?: string;
  component?: 'PrizeSelector' | 'SpinWheel' | 'AccountLocked' | 'VerifyEmail' | 'FlashSale' | 'CheckoutNow' | 'SeasonalPromo';
  targetCategory?: string;  // Category ID this ad is specific to
  targetProduct?: string;   // Product ID this ad is specific to
  link?: string;           // Click destination
  startDate?: string;      // When to start showing the ad
  endDate?: string;        // When to stop showing the ad
  priority: number;        // Higher priority ads are shown first
  frequency?: number;      // How often to show this ad (in minutes)
  showOnce?: boolean;      // If true, show only once per session
  width?: number;
  height?: number;
  altText?: string;  // For accessibility
  caption?: string;  // Optional caption text to display below the ad
}

// Define the available ad slots
export const AD_SLOTS: AdSlot[] = [
  {
    id: 'popup',
    type: 'popup',
    width: '600px',
    height: '500px',
    position: 'fixed',
    zIndex: 1000,
    style: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      boxShadow: '0 0 20px rgba(0,0,0,0.3)',
      borderRadius: '8px'
    }
  },
  {
    id: 'left',
    type: 'sidebar',
    width: '200px',
    height: '600px',
    position: 'fixed',
    zIndex: 999,
    style: {
      top: '50%',
      left: '20px',
      transform: 'translateY(-50%)'
    }
  },
  {
    id: 'right',
    type: 'sidebar',
    width: '200px',
    height: '600px',
    position: 'fixed',
    zIndex: 999,
    style: {
      top: '50%',
      right: '20px',
      transform: 'translateY(-50%)'
    }
  },
  {
    id: 'popup-main',
    type: 'popup',
    width: '400px',
    height: '300px',
    position: 'fixed',
    zIndex: 1000
  },
  {
    id: 'banner-top',
    type: 'banner',
    width: '100%',
    height: '180px',  // Increased from 120px
    position: 'relative',
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '1rem',
      overflow: 'hidden',
      backgroundColor: 'transparent',
      zIndex: 1
    }
  },
  {
    id: 'sidebar-left',
    type: 'left',
    width: '160px',
    height: '600px',
    position: 'fixed'
  },
  {
    id: 'sidebar-right',
    type: 'right',
    width: '160px',
    height: '600px',
    position: 'fixed'
  },
  {
    id: 'banner-bottom',
    type: 'bottom',
    width: '100%',
    height: '100px',
    position: 'relative'
  },
  {
    id: 'banner',
    type: 'banner',
    width: '728px',
    height: '290px', 
    position: 'relative',
    zIndex: 1,
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '10px auto 0',
      overflow: 'hidden'
    }
  },
  {
    id: 'checkout-left',
    type: 'checkout',
    width: '300px',
    height: '250px',
    position: 'relative',
    style: {
      marginBottom: '20px'
    }
  },
  {
    id: 'checkout-right',
    type: 'checkout',
    width: '300px',
    height: '250px',
    position: 'relative',
    style: {
      marginBottom: '20px'
    }
  },
  {
    id: 'button',
    type: 'button',
    width: '100%',
    height: '50px',
    position: 'relative',
    style: {
      marginBottom: '20px',
      display: 'block'
    }
  }
];

// Define popup slot
export const POPUP_SLOT: AdSlot = {
  id: 'popup',
  type: 'popup',
  width: '600px',
  height: '500px',
  position: 'fixed',
  zIndex: 1000,
  style: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    boxShadow: '0 0 20px rgba(0,0,0,0.3)',
    borderRadius: '8px'
  }
};

export type PopupType = 'prize-selector' | 'spin-wheel' | 'account-locked' | 'verify-email' | 'flash-sale' | 'checkout-now' | 'seasonal-promo';

export interface PopupConfig {
  id: string;
  type: PopupType;
  component: string;
  priority: number;
  frequency: number;
  showOnce: boolean;
  pageTypes: ('product-list' | 'product-detail' | 'checkout')[];
}

export const POPUP_CONFIG: PopupConfig[] = [
  {
    id: 'prize-selector-popup',
    type: 'prize-selector',
    component: 'prize-selector',
    priority: 1,
    frequency: 30,
    showOnce: true,
    pageTypes: ['product-list', 'product-detail']
  },
  {
    id: 'spin-wheel-popup',
    type: 'spin-wheel',
    component: 'spin-wheel',
    priority: 2,
    frequency: 25,
    showOnce: true,
    pageTypes: ['product-list', 'product-detail']
  },
  {
    id: 'account-locked-popup',
    type: 'account-locked',
    component: 'account-locked',
    priority: 3,
    frequency: 20,
    showOnce: true,
    pageTypes: ['product-list', 'product-detail']
  },
  {
    id: 'verify-email-popup',
    type: 'verify-email',
    component: 'verify-email',
    priority: 4,
    frequency: 25,
    showOnce: true,
    pageTypes: ['product-list', 'product-detail']
  },
  {
    id: 'flash-sale-popup',
    type: 'flash-sale',
    component: 'flash-sale',
    priority: 1,
    frequency: 40,
    showOnce: false,
    pageTypes: ['checkout']
  },
  {
    id: 'checkout-now-popup',
    type: 'checkout-now',
    component: 'checkout-now',
    priority: 2,
    frequency: 35,
    showOnce: true,
    pageTypes: ['checkout']
  },
  {
    id: 'seasonal-promo-popup',
    type: 'seasonal-promo',
    component: 'seasonal-promo',
    priority: 3,
    frequency: 30,
    showOnce: false,
    pageTypes: ['checkout']
  }
];

const shownPopups = new Set<string>();

export const getPagePopup = (pageType: 'product-list' | 'product-detail' | 'checkout'): PopupConfig | null => {
  const eligiblePopups = POPUP_CONFIG.filter(popup => 
    popup.pageTypes.includes(pageType) && 
    (!popup.showOnce || !shownPopups.has(popup.id))
  );

  if (eligiblePopups.length === 0) return null;

  const sortedPopups = [...eligiblePopups].sort((a, b) => a.priority - b.priority);

  for (const popup of sortedPopups) {
    if (Math.random() * 100 < popup.frequency) {
      if (popup.showOnce) {
        shownPopups.add(popup.id);
      }
      return popup;
    }
  }

  return null;
};

// Define popup advertisements
export const POPUP_ADVERTISEMENTS: Advertisement[] = [
  {
    id: 'prize-selector',
    slotId: 'popup',
    type: 'component',
    component: 'PrizeSelector',
    priority: 100,
    frequency: 2,
    showOnce: true
  },
  {
    id: 'spin-wheel',
    slotId: 'popup',
    type: 'component',
    component: 'SpinWheel',
    priority: 90,
    frequency: 3,
    showOnce: true
  },
  {
    id: 'account-locked',
    slotId: 'popup',
    type: 'component',
    component: 'AccountLocked',
    priority: 80,
    frequency: 4,
    showOnce: true
  },
  {
    id: 'verify-email',
    slotId: 'popup',
    type: 'component',
    component: 'VerifyEmail',
    priority: 70,
    frequency: 5,
    showOnce: true
  },
  {
    id: 'flash-sale',
    slotId: 'popup',
    type: 'component',
    component: 'FlashSale',
    priority: 100,
    frequency: 2,
    showOnce: false
  },
  {
    id: 'checkout-now',
    slotId: 'popup',
    type: 'component',
    component: 'CheckoutNow',
    priority: 90,
    frequency: 3,
    showOnce: true
  },
  {
    id: 'seasonal-promo',
    slotId: 'popup',
    type: 'component',
    component: 'SeasonalPromo',
    priority: 85,
    frequency: 3,
    showOnce: false
  }
];

// Configuration for popup intensity
export const POPUP_CONFIG_INTENSITY = 1;  // Show popup on every interaction

// Track popup display history
const popupHistory = new Set<string>();

// Track interaction count
let interactionCount = 0;

// Get random popup ad
export function getRandomPopupAd(): Advertisement | null {
  interactionCount++;
  
  // Always try to show a popup
  if (interactionCount % POPUP_CONFIG_INTENSITY === 0) {
    // Filter available popups
    const availablePopups = POPUP_ADVERTISEMENTS.filter(ad => {
      // Skip if already shown
      if (ad.showOnce && popupHistory.has(ad.id)) {
        return false;
      }
      
      // Check frequency
      if (ad.frequency && interactionCount % ad.frequency !== 0) {
        return false;
      }

      return true;
    });

    if (availablePopups.length > 0) {
      // Sort by priority and get highest
      const sortedPopups = [...availablePopups].sort((a, b) => b.priority - a.priority);
      const selectedPopup = sortedPopups[0];

      // Track shown popups
      if (selectedPopup.showOnce) {
        popupHistory.add(selectedPopup.id);
      }

      return selectedPopup;
    }
  }

  return null;
}

// ... rest of the code remains the same ...
