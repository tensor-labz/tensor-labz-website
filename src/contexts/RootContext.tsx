import React, { createContext, useContext } from 'react';
import AppContextProvider from './Api/AppContext';
import DevicesContextProvider from './DeviceContext';
import data from '../data/data';
import { BrowserRouter } from 'react-router-dom';
import ServiceProvider from './ServiceContext';
import { ThemeProvider } from './ThemeContext';

type RootContextType = {
  Data?: any;
  googleSheet_URl?: string;
};
type RootContextProviderType = {
  children: React.ReactNode;
};
const RootContext = createContext<RootContextType>(null as any);
const sheetUrl = import.meta.env.VITE_SHEET_URL as string;
export const RootContextProvider: React.FC<RootContextProviderType> = ({
  children,
}) => {
  return (
    <RootContext.Provider value={{ Data: data, googleSheet_URl: sheetUrl }}>
      <ThemeProvider>
        <DevicesContextProvider>
          <BrowserRouter>
            <ServiceProvider>
              <AppContextProvider>{children}</AppContextProvider>
            </ServiceProvider>
          </BrowserRouter>
        </DevicesContextProvider>
      </ThemeProvider>
    </RootContext.Provider>
  );
};

export const useRootContext = () => useContext(RootContext);
