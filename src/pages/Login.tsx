import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import ReactIcon from '../shared/components/ui/ReactIcon';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useTheme } from '../shared/hooks/useTheme';
import {
  signIn,
  clearError,
  selectAuthStatus,
  selectAuthError,
  selectIsAuthenticated,
} from '../store/authSlice';
import HeaderHelmet from '../base/Head';
import data from '../data/data';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const status = useAppSelector(selectAuthStatus);
  const error = useAppSelector(selectAuthError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Redirect to the page the user originally tried to visit, or /admin
  const from =
    (location.state as { from?: Location })?.from?.pathname ?? '/admin';

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(signIn({ email, password }));
  };

  const isLoading = status === 'loading';

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Theme toggle */}
      <motion.button
        whileTap={{ scale: 0.88 }}
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="fixed top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-lg text-base"
        style={{
          backgroundColor: 'var(--bg-raised)',
          border: '1px solid var(--border)',
          color: 'var(--text-muted)',
        }}
      >
        {theme === 'dark' ? <ReactIcon name="RiSunLine" size={16} /> : <ReactIcon name="RiMoonLine" size={16} />}
      </motion.button>
      <HeaderHelmet title="Admin Login" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        {/* Logo / brand */}
        <div className="text-center mb-8">
          {data?.layout?.logo && (
            <img
              src={data.layout.logo}
              alt="Tensor Labz"
              className="h-12 mx-auto mb-4 object-contain"
            />
          )}
          <h1
            className="text-2xl font-bold"
            style={{
              color: 'var(--text-primary)',
              fontFamily: '"Syne", sans-serif',
            }}
          >
            Admin Portal
          </h1>
          <p className="text-sm mt-1" className="text-muted">
            Sign in to manage your content
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            backgroundColor: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2"
                className="text-muted"
              >
                Email address
              </label>
              <div className="relative">
                <ReactIcon
                  name="FaEnvelope"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
                  className="text-muted"
                />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                  style={{
                    backgroundColor: 'var(--input-bg)',
                    border: '1px solid var(--input-border)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
                className="text-muted"
              >
                Password
              </label>
              <div className="relative">
                <ReactIcon
                  name="FaLock"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
                  className="text-muted"
                />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-lg text-sm outline-none transition-all"
                  style={{
                    backgroundColor: 'var(--input-bg)',
                    border: '1px solid var(--input-border)',
                    color: 'var(--text-primary)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  className="text-muted"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <ReactIcon name="FaEyeSlash" size={14} />
                  ) : (
                    <ReactIcon name="FaEye" size={14} />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-400 text-center"
              >
                {error.includes('Invalid login credentials') ||
                error.includes('invalid_credentials')
                  ? 'Invalid email or password.'
                  : error.includes('Email not confirmed')
                    ? 'Please confirm your email before signing in.'
                    : error.includes('rate limit') || error.includes('too many')
                      ? 'Too many attempts. Please try again later.'
                      : 'Sign in failed. Please try again.'}
              </motion.p>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 rounded-lg text-sm font-semibold transition-opacity disabled:opacity-60"
              style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
            >
              {isLoading ? 'Signing in…' : 'Sign in'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
