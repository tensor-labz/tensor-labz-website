import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { store } from './store';
import { ThemeProvider } from '../shared/hooks/useTheme';
import { DeviceProvider } from '../shared/hooks/useDevice';
import { supabase } from '../lib/supabase';
import { setUser } from '../store/authSlice';

function AuthListener({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      store.dispatch(
        setUser(
          user
            ? {
                uid: user.id,
                email: user.email ?? null,
                displayName: (user.user_metadata?.full_name as string) ?? null,
              }
            : null
        )
      );
    });
    return () => subscription.unsubscribe();
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
