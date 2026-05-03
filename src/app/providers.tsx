import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { store } from './store';
import { ThemeProvider } from '../shared/hooks/useTheme';
import { DeviceProvider } from '../shared/hooks/useDevice';

type ProvidersProps = { children: React.ReactNode };

export const AppProviders: React.FC<ProvidersProps> = ({ children }) => (
  <Provider store={store}>
    <HelmetProvider>
      <ThemeProvider>
        <DeviceProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </DeviceProvider>
      </ThemeProvider>
    </HelmetProvider>
  </Provider>
);
