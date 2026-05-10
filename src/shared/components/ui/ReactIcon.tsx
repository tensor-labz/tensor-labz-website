import { memo, useState, useEffect, type ComponentType, type CSSProperties } from 'react';

export interface ReactIconProps {
  name: string;
  size?: number | string;
  color?: string;
  className?: string;
  style?: CSSProperties;
  title?: string;
  /** Rendered while the library chunk is loading (first use only) */
  fallback?: ComponentType<Omit<ReactIconProps, 'name' | 'fallback'>>;
}

/* ── Library registry ───────────────────────────────────────────────────────
   Each entry is a function that returns a dynamic import so Vite splits the
   library into its own chunk and only loads it when first needed.
   Prefixes are sorted longest-first at runtime to avoid Fa matching Fa6.
──────────────────────────────────────────────────────────────────────────── */
const LIB_MAP: Record<string, () => Promise<Record<string, ComponentType<object>>>> = {
  Ai:  () => import('react-icons/ai'),
  Bi:  () => import('react-icons/bi'),
  Bs:  () => import('react-icons/bs'),
  Cg:  () => import('react-icons/cg'),
  Di:  () => import('react-icons/di'),
  Fa:  () => import('react-icons/fa'),
  Fc:  () => import('react-icons/fc'),
  Fi:  () => import('react-icons/fi'),
  Gi:  () => import('react-icons/gi'),
  Gr:  () => import('react-icons/gr'),
  Hi:  () => import('react-icons/hi'),
  Im:  () => import('react-icons/im'),
  Io:  () => import('react-icons/io'),
  Lu:  () => import('react-icons/lu'),
  Md:  () => import('react-icons/md'),
  Pi:  () => import('react-icons/pi'),
  Ri:  () => import('react-icons/ri'),
  Rx:  () => import('react-icons/rx'),
  Si:  () => import('react-icons/si'),
  Sl:  () => import('react-icons/sl'),
  Tb:  () => import('react-icons/tb'),
  Ti:  () => import('react-icons/ti'),
  Tfi: () => import('react-icons/tfi'),
  Vsc: () => import('react-icons/vsc'),
  Wi:  () => import('react-icons/wi'),
};

const PREFIXES = Object.keys(LIB_MAP).sort((a, b) => b.length - a.length);

function extractPrefix(name: string): string | null {
  return PREFIXES.find((p) => name.startsWith(p)) ?? null;
}

/* Module-level cache — resolved icon components persist for the page session */
const iconCache = new Map<string, ComponentType<object>>();

/* ── ReactIcon ───────────────────────────────────────────────────────────── */
const ReactIcon = memo(
  ({ name, size, color, className, style, title, fallback: Fallback }: ReactIconProps) => {
    const [Icon, setIcon] = useState<ComponentType<object> | null>(
      () => iconCache.get(name) ?? null
    );

    useEffect(() => {
      if (!name) return;

      /* Already cached from a previous render */
      const cached = iconCache.get(name);
      if (cached) {
        setIcon(() => cached);
        return;
      }

      const prefix = extractPrefix(name);
      if (!prefix) {
        console.warn(`[ReactIcon] Unknown prefix for icon "${name}"`);
        return;
      }

      LIB_MAP[prefix]()
        .then((mod) => {
          const Comp = mod[name] as ComponentType<object> | undefined;
          if (!Comp) {
            console.warn(`[ReactIcon] Icon "${name}" not found in react-icons/${prefix.toLowerCase()}`);
            return;
          }
          iconCache.set(name, Comp);
          setIcon(() => Comp);
        })
        .catch(() => {
          console.warn(`[ReactIcon] Failed to load react-icons/${prefix.toLowerCase()}`);
        });
    }, [name]);

    const iconProps = { size, color, className, style, title };

    if (!Icon) {
      return Fallback ? <Fallback {...iconProps} /> : null;
    }

    return <Icon {...iconProps} />;
  }
);

ReactIcon.displayName = 'ReactIcon';
export default ReactIcon;
