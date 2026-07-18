import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import ReactIcon from '../shared/components/ui/ReactIcon';
import { useAppDispatch, useAppSelector } from '../app/hooks';
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
    className="pointer-events-none absolute h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
    style={{ left: `${x}%`, top: `${y}%` }}
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
    className="pointer-events-none absolute inset-x-0 h-px opacity-35"
    style={{
      background:
        'linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%)',
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
  return <div className={`absolute h-5 w-5 border-accent opacity-60 ${cls}`} />;
};

/* ── Page ── */
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const status = useAppSelector(selectAuthStatus);
  const error = useAppSelector(selectAuthError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

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
  const logoSrc = resolveLogo(info, logo);
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

  // Focus-dependent border/shadow — genuinely dynamic, kept inline.
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
    <div className="flex min-h-screen bg-canvas">
      <HeaderHelmet title="Admin Login" />

      {/* ══════════════════════════════════════════
          LEFT — atmospheric engineering panel
      ══════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, x: -32 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative hidden w-[54%] flex-col items-center justify-center overflow-hidden border-r border-rim bg-surface lg:flex"
      >
        {/* Grid background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(56,189,248,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.06) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Radial vignette — softens edges */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 25%, var(--bg-surface) 100%)',
          }}
        />

        {/* Diagonal accent lines */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-5">
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
            className="pointer-events-none absolute select-none font-mono text-[8px] text-accent opacity-25"
            style={{ left: x, top: y }}
          >
            {label}
          </div>
        ))}

        {/* Center content */}
        <div className="relative z-10 px-14 text-center">
          {logoSrc && (
            <Link to="/">
              <motion.img
                src={logoSrc}
                alt={info.name}
                className="mx-auto mb-8 h-14 object-contain"
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
            <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.4em] text-accent">
              ◈ Secure Access Terminal
            </p>
            <h2 className="mb-4 font-display text-3xl font-bold leading-snug text-fg xl:text-4xl">
              {info.name}
              <br />
              <span className="text-accent">Admin</span> Portal
            </h2>
            <p className="mx-auto max-w-[260px] font-mono text-xs leading-relaxed text-muted">
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
            className="mt-10 flex items-center justify-center gap-8"
          >
            {[
              { label: 'SYS', value: 'ONLINE' },
              { label: 'DB', value: 'LIVE' },
              { label: 'AUTH', value: 'READY' },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-1.5">
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <span className="font-mono text-[9px] font-semibold text-accent">
                    {value}
                  </span>
                </div>
                <span className="font-mono text-[7px] uppercase tracking-widest text-muted opacity-[0.45]">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Build tag */}
        <div className="absolute bottom-5 left-6 select-none font-mono text-[8px] text-muted opacity-30">
          TL-ADMIN v1.9.0 // BUILD STABLE // {new Date().getFullYear()}
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════
          RIGHT — form panel
      ══════════════════════════════════════════ */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="mb-8 text-center lg:hidden">
            {logoSrc && (
              <Link to="/">
                <img
                  src={logoSrc}
                  alt={info.name}
                  className="mx-auto mb-3 h-10 object-contain"
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
              className="mb-3 font-mono text-[9px] uppercase tracking-[0.35em] text-accent"
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
              className="font-display text-3xl font-bold text-fg"
            >
              Sign In
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="mt-1.5 text-sm text-muted"
            >
              Access the admin control panel
            </motion.p>
          </div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="relative rounded-xl border border-glass-rim bg-glass-bg p-6"
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
                  className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted"
                >
                  <span className="font-bold text-accent">01</span>
                  Identifier
                </label>
                <div className="relative">
                  <ReactIcon
                    name="FaEnvelope"
                    size={12}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2"
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
                    className="w-full rounded-lg py-3 pl-9 pr-4 font-mono text-sm outline-none"
                    style={inputStyle('email')}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted"
                >
                  <span className="font-bold text-accent">02</span>
                  Passkey
                </label>
                <div className="relative">
                  <ReactIcon
                    name="FaLock"
                    size={12}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2"
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
                    className="w-full rounded-lg py-3 pl-9 pr-10 font-mono text-sm outline-none"
                    style={inputStyle('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors duration-200"
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
                    className="flex items-center gap-2 rounded-lg border border-red-500/25 bg-red-500/[0.08] px-3 py-2.5 font-mono text-xs text-red-400"
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
                className="relative w-full overflow-hidden rounded-lg bg-accent py-3 font-mono text-sm font-semibold tracking-wider text-white disabled:opacity-60"
              >
                {/* Shimmer sweep */}
                <motion.span
                  className="pointer-events-none absolute inset-0"
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
                        className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white"
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
              className="flex items-center gap-1.5 font-mono text-[10px] tracking-wide text-muted transition-colors duration-200"
            >
              <ReactIcon name="FiArrowLeft" size={10} />
              Back to site
            </Link>
            <p className="select-none text-center font-mono text-[9px] text-muted opacity-[0.35]">
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
