import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AIAgentAlert from './AIAgentAlert';

interface NotificationManagerProps {
  disabled?: boolean;
}

const NotificationManager: React.FC<NotificationManagerProps> = ({ disabled = false }) => {
  const [showSystemAlert, setShowSystemAlert] = useState(false);
  const location = useLocation();

  // Show alert on page changes
  useEffect(() => {
    if (!disabled) {
      const path = location.pathname;
      // Show on all pages
      setShowSystemAlert(true);
      
      // Log for debugging
      console.log('Path changed:', path);
      console.log('Alert should show:', !disabled);
    }
  }, [location.pathname, disabled]);

  // Show alert every 30 seconds
  useEffect(() => {
    if (disabled) return;

    const showAlert = () => {
      setShowSystemAlert(true);
    };

    // Initial show
    showAlert();

    // Set up interval
    const intervalId = setInterval(showAlert, 30000);

    // Log for debugging
    console.log('Timer started');

    return () => {
      clearInterval(intervalId);
      console.log('Timer cleared');
    };
  }, [disabled]);

  // Log when alert state changes
  useEffect(() => {
    console.log('Alert state changed:', showSystemAlert);
  }, [showSystemAlert]);

  return showSystemAlert ? (
    <AIAgentAlert
      type="system"
      onClose={() => setShowSystemAlert(false)}
      offsetY={80}
    />
  ) : null;
};

export { NotificationManager };
