import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { store } from './store';
import { ThemeProvider } from '../shared/hooks/useTheme';
import { DeviceProvider } from '../shared/hooks/useDevice';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser } from '../store/authSlice';

function AuthListener({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      store.dispatch(
        setUser(
          user
            ? { uid: user.uid, email: user.email, displayName: user.displayName }
            : null
        )
      );
    });
    return unsubscribe;
  }, []);
  return <>{children}</>;
}

type ProvidersProps = { children: React.ReactNode };

export const AppProviders: React.FC<ProvidersProps> = ({ children }) => (
  <Provider store={store}>
    <HelmetProvider>
      <ThemeProvider>
        <DeviceProvider>
          <BrowserRouter>
            <AuthListener>{children}</AuthListener>
          </BrowserRouter>
        </DeviceProvider>
      </ThemeProvider>
    </HelmetProvider>
  </Provider>
);
