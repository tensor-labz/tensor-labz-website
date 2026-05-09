import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import {
  selectIsAuthenticated,
  selectAuthInitialized,
} from '../store/authSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const initialized = useAppSelector(selectAuthInitialized);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  // Hold render until Firebase onAuthStateChanged has fired at least once
  if (!initialized) return null;

  // Not logged in → redirect to /login, preserving the attempted URL
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
