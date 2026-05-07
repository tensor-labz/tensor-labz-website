import React, {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
} from 'react';

export type DeviceType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const DeviceContext = createContext<DeviceType>('lg');

const getDeviceType = (width: number): DeviceType => {
  if (width >= 1536) return '2xl';
  if (width >= 1280) return 'xl';
  if (width >= 1024) return 'lg';
  if (width >= 768) return 'md';
  if (width >= 640) return 'sm';
  return 'xs';
};

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [device, setDevice] = useState<DeviceType>('lg');

  useLayoutEffect(() => {
    const update = () => setDevice(getDeviceType(window.innerWidth));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <DeviceContext.Provider value={device}>{children}</DeviceContext.Provider>
  );
};

export const useDevice = () => useContext(DeviceContext);
