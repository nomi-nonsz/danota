'use client'

import { useState, useEffect } from 'react';

export interface DeviceSizes {
  isMobile: boolean,
  isTablet: boolean,
  isDesktop: boolean,
}

export const useResponsive = () => {
  const [device, setDevice] = useState<DeviceSizes>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;

      setDevice({
        isMobile: width <= 640,
        isTablet: width > 640 && width <= 1024,
        isDesktop: width > 1024,
      });
    };

    updateSize();

    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return device;
};