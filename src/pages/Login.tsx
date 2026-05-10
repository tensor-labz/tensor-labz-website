import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
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
import { useCompanyInfo, resolveLogo } from '../shared/hooks/useCompanyInfo';
import logo from '../assets/images/logo.png';

/* ── Pulsing grid node ── */
const GridNode = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      backgroundColor: 'var(--accent)',
      transform: 'translate(-50%, -50%)',
    }}
    animate={{ opacity: [0.15, 0.9, 0.15], scale: [0.7, 1.6, 0.7] }}
    transition={{
      duration: 3 + delay,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    }}
  />
);

/* ── Animated horizontal scan line ── */
const ScanLine = () => (
  <motion.div
    className="absolute inset-x-0 h-px pointer-events-none"
    style={{
      background:
        'linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%)',
      opacity: 0.35,
    }}
    animate={{ top: ['0%', '100%'] }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: 'linear',
      repeatDelay: 1.5,
    }}
  />
);

/* ── Corner bracket decoration ── */
const Corner = ({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const cls = {
    tl: 'top-0 left-0 border-t border-l',
    tr: 'top-0 right-0 border-t border-r',
    bl: 'bottom-0 left-0 border-b border-l',
    br: 'bottom-0 right-0 border-b border-r',
  }[pos];
  return (
    <div
      className={`absolute w-5 h-5 ${cls}`}
      style={{ borderColor: 'var(--accent)', opacity: 0.6 }}
    />
  );
};

/* ── Page ── */
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
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const from =
    (location.state as { from?: Location })?.from?.pathname ?? '/admin';

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  useEffect(
    () => () => {
      dispatch(clearError());
    },
    [dispatch]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(signIn({ email, password }));
  };

  const info = useCompanyInfo();
  const logoSrc = resolveLogo(info, theme, logo);
  const isLoading = status === 'loading';

  const errorMsg = !error
    ? null
    : error.includes('Invalid login credentials') ||
        error.includes('invalid_credentials')
      ? 'Invalid credentials — access denied.'
      : error.includes('Email not confirmed')
        ? 'Email unconfirmed. Check your inbox.'
        : error.includes('rate limit') || error.includes('too many')
          ? 'Too many attempts. Stand by.'
          : 'Authentication failed. Try again.';

  const nodes = [
    { x: 18, y: 22, delay: 0 },
    { x: 52, y: 12, delay: 0.9 },
    { x: 78, y: 30, delay: 1.5 },
    { x: 28, y: 52, delay: 0.4 },
    { x: 68, y: 62, delay: 2.1 },
    { x: 88, y: 78, delay: 1.2 },
    { x: 12, y: 78, delay: 1.8 },
    { x: 42, y: 88, delay: 0.6 },
    { x: 60, y: 45, delay: 2.6 },
    { x: 35, y: 35, delay: 1.1 },
  ];

  const inputStyle = (field: string) => ({
    backgroundColor: 'var(--bg-raised)',
    border: `1px solid ${focusedField === field ? 'var(--accent)' : 'var(--border)'}`,
    color: 'var(--text-primary)',
    boxShadow:
      focusedField === field
        ? '0 0 0 3px color-mix(in srgb, var(--accent) 12%, transparent)'
        : 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  });

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <HeaderHelmet title="Admin Login" />

      {/* Theme toggle */}
      <motion.button
        whileTap={{ scale: 0.88 }}
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="fixed top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-lg"
        style={{
          backgroundColor: 'var(--bg-raised)',
          border: '1px solid var(--border)',
          color: 'var(--text-muted)',
        }}
      >
        {theme === 'dark' ? (
          <ReactIcon name="RiSunLine" size={16} />
        ) : (
          <ReactIcon name="RiMoonLine" size={16} />
        )}
      </motion.button>

      {/* ══════════════════════════════════════════
          LEFT — atmospheric engineering panel
      ══════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, x: -32 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex relative flex-col items-center justify-center overflow-hidden"
        style={{
          width: '54%',
          backgroundColor: 'var(--bg-surface)',
          borderRight: '1px solid var(--border)',
        }}
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(56,189,248,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.06) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Radial vignette — softens edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 25%, var(--bg-surface) 100%)',
          }}
        />

        {/* Diagonal accent lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.05 }}
        >
          <line
            x1="0"
            y1="100%"
            x2="100%"
            y2="0"
            stroke="var(--accent)"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="75%"
            x2="75%"
            y2="0"
            stroke="var(--accent)"
            strokeWidth="0.5"
          />
          <line
            x1="25%"
            y1="100%"
            x2="100%"
            y2="25%"
            stroke="var(--accent)"
            strokeWidth="0.5"
          />
        </svg>

        <ScanLine />

        {nodes.map((n, i) => (
          <GridNode key={i} {...n} />
        ))}

        {/* Coordinate markers */}
        {[
          { label: 'N:00.00', x: '5%', y: '8%' },
          { label: 'E:24.48', x: '82%', y: '8%' },
          { label: 'S:48.96', x: '5%', y: '88%' },
          { label: 'W:72.48', x: '82%', y: '88%' },
        ].map(({ label, x, y }) => (
          <div
            key={label}
            className="absolute text-[8px] font-mono pointer-events-none select-none"
            style={{ left: x, top: y, color: 'var(--accent)', opacity: 0.25 }}
          >
            {label}
          </div>
        ))}

        {/* Center content */}
        <div className="relative z-10 text-center px-14">
          {logoSrc && (
            <Link to="/">
              <motion.img
                src={logoSrc}
                alt={info.name}
                className="h-14 mx-auto mb-8 object-contain"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.45,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </Link>
          )}

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.55,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p
              className="text-[9px] font-mono tracking-[0.4em] uppercase mb-4"
              style={{ color: 'var(--accent)' }}
            >
              ◈ Secure Access Terminal
            </p>
            <h2
              className="text-3xl xl:text-4xl font-bold leading-snug mb-4 font-display"
              style={{ color: 'var(--text-primary)' }}
            >
              {info.name}
              <br />
              <span style={{ color: 'var(--accent)' }}>Admin</span> Portal
            </h2>
            <p
              className="text-xs font-mono leading-relaxed max-w-[260px] mx-auto"
              style={{ color: 'var(--text-muted)' }}
            >
              Authorized personnel only.
              <br />
              All sessions are monitored and logged.
            </p>
          </motion.div>

          {/* Live status indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="flex items-center justify-center gap-8 mt-10"
          >
            {[
              { label: 'SYS', value: 'ONLINE' },
              { label: 'DB', value: 'LIVE' },
              { label: 'AUTH', value: 'READY' },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-1.5">
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: 'var(--accent)' }}
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <span
                    className="text-[9px] font-mono font-semibold"
                    style={{ color: 'var(--accent)' }}
                  >
                    {value}
                  </span>
                </div>
                <span
                  className="text-[7px] font-mono tracking-widest uppercase"
                  style={{ color: 'var(--text-muted)', opacity: 0.45 }}
                >
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Build tag */}
        <div
          className="absolute bottom-5 left-6 text-[8px] font-mono select-none"
          style={{ color: 'var(--text-muted)', opacity: 0.3 }}
        >
          TL-ADMIN v1.9.0 // BUILD STABLE // {new Date().getFullYear()}
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════
          RIGHT — form panel
      ══════════════════════════════════════════ */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            {logoSrc && (
              <Link to="/">
                <img
                  src={logoSrc}
                  alt={info.name}
                  className="h-10 mx-auto mb-3 object-contain"
                />
              </Link>
            )}
          </div>

          {/* Heading */}
          <div className="mb-8">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[9px] font-mono tracking-[0.35em] uppercase mb-3"
              style={{ color: 'var(--accent)' }}
            >
              ◈ Authentication Required
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.45,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-3xl font-bold font-display"
              style={{ color: 'var(--text-primary)' }}
            >
              Sign In
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="text-sm mt-1.5"
              style={{ color: 'var(--text-muted)' }}
            >
              Access the admin control panel
            </motion.p>
          </div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="relative p-6 rounded-xl"
            style={{
              backgroundColor: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <Corner pos="tl" />
            <Corner pos="tr" />
            <Corner pos="bl" />
            <Corner pos="br" />

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase mb-2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <span style={{ color: 'var(--accent)', fontWeight: 700 }}>
                    01
                  </span>
                  Identifier
                </label>
                <div className="relative">
                  <ReactIcon
                    name="FaEnvelope"
                    size={12}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                      color:
                        focusedField === 'email'
                          ? 'var(--accent)'
                          : 'var(--text-muted)',
                      transition: 'color 0.2s',
                    }}
                  />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="admin@tensorlabz.com"
                    className="w-full pl-9 pr-4 py-3 rounded-lg text-sm font-mono outline-none"
                    style={inputStyle('email')}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase mb-2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <span style={{ color: 'var(--accent)', fontWeight: 700 }}>
                    02
                  </span>
                  Passkey
                </label>
                <div className="relative">
                  <ReactIcon
                    name="FaLock"
                    size={12}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                      color:
                        focusedField === 'password'
                          ? 'var(--accent)'
                          : 'var(--text-muted)',
                      transition: 'color 0.2s',
                    }}
                  />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-10 py-3 rounded-lg text-sm font-mono outline-none"
                    style={inputStyle('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                    style={{ color: 'var(--text-muted)' }}
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    <ReactIcon
                      name={showPassword ? 'FaEyeSlash' : 'FaEye'}
                      size={13}
                    />
                  </button>
                </div>
              </div>

              {/* Error */}
              <AnimatePresence>
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-mono"
                    style={{
                      backgroundColor: 'rgba(239,68,68,0.08)',
                      border: '1px solid rgba(239,68,68,0.25)',
                      color: '#f87171',
                    }}
                  >
                    <ReactIcon name="FaExclamationTriangle" size={11} />
                    {errorMsg}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileTap={{ scale: 0.98 }}
                className="relative w-full py-3 rounded-lg text-sm font-semibold font-mono tracking-wider overflow-hidden disabled:opacity-60"
                style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
              >
                {/* Shimmer sweep */}
                <motion.span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                  }}
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <motion.span
                        className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white inline-block"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 0.75,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                      AUTHENTICATING…
                    </>
                  ) : (
                    <>
                      <ReactIcon name="FiArrowRight" size={13} />
                      AUTHENTICATE
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>

          {/* Footer */}
          <div className="mt-6 flex flex-col items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-[10px] font-mono tracking-wide transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
            >
              <ReactIcon name="FiArrowLeft" size={10} />
              Back to site
            </Link>
            <p
              className="text-center text-[9px] font-mono select-none"
              style={{ color: 'var(--text-muted)', opacity: 0.35 }}
            >
              {info.name.toUpperCase()} {'// SECURE ADMIN ACCESS //'}{' '}
              {new Date().getFullYear()}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
