import {
  memo,
  useState,
  useEffect,
  type ComponentType,
  type CSSProperties,
} from 'react';

export interface ReactIconProps {
  name: string;
  size?: number | string;
  color?: string;
  className?: string;
  style?: CSSProperties;
  title?: string;
  /** Rendered while the icon library chunk is loading (first use of a prefix only) */
  fallback?: ComponentType<Omit<ReactIconProps, 'name' | 'fallback'>>;
}

type IconModule = Record<string, ComponentType<object>>;
type LibLoader = () => Promise<IconModule>;

/* ── Library registry ───────────────────────────────────────────────────────
   Values are arrays so that prefixes shared by multiple packages (Fa, Hi, Io)
   load both libraries in parallel and merge their exports.
   Vite code-splits each import() into its own chunk — only the chunks for
   prefixes actually used on the page are ever downloaded.
──────────────────────────────────────────────────────────────────────────── */
const LIB_MAP: Record<string, LibLoader[]> = {
  // Font Awesome 5 + 6 share the "Fa" prefix
  Fa: [() => import('react-icons/fa'), () => import('react-icons/fa6')],
  // Heroicons v1 + v2 share the "Hi" prefix
  Hi: [() => import('react-icons/hi'), () => import('react-icons/hi2')],
  // Ionicons v4 + v5 share the "Io" prefix
  Io: [() => import('react-icons/io'), () => import('react-icons/io5')],
  // Single-library prefixes
  Ai: [() => import('react-icons/ai')],
  Bi: [() => import('react-icons/bi')],
  Bs: [() => import('react-icons/bs')],
  Cg: [() => import('react-icons/cg')],
  Ci: [() => import('react-icons/ci')],
  Di: [() => import('react-icons/di')],
  Fc: [() => import('react-icons/fc')],
  Fi: [() => import('react-icons/fi')],
  Gi: [() => import('react-icons/gi')],
  Go: [() => import('react-icons/go')],
  Gr: [() => import('react-icons/gr')],
  Im: [() => import('react-icons/im')],
  Lia: [() => import('react-icons/lia')],
  Lu: [() => import('react-icons/lu')],
  Md: [() => import('react-icons/md')],
  Pi: [() => import('react-icons/pi')],
  Ri: [() => import('react-icons/ri')],
  Rx: [() => import('react-icons/rx')],
  Si: [() => import('react-icons/si')],
  Sl: [() => import('react-icons/sl')],
  Tb: [() => import('react-icons/tb')],
  Tfi: [() => import('react-icons/tfi')],
  Ti: [() => import('react-icons/ti')],
  Vsc: [() => import('react-icons/vsc')],
  Wi: [() => import('react-icons/wi')],
};

/* Sort longest-first so "Lia" is tested before "Li", "Tfi" before "Ti", etc. */
const PREFIXES = Object.keys(LIB_MAP).sort((a, b) => b.length - a.length);

function extractPrefix(name: string): string | null {
  return PREFIXES.find((p) => name.startsWith(p)) ?? null;
}

/* Module-level cache — resolved icon components survive for the full page session */
const iconCache = new Map<string, ComponentType<object>>();

async function resolveIcon(
  name: string
): Promise<ComponentType<object> | null> {
  const cached = iconCache.get(name);
  if (cached) return cached;

  const prefix = extractPrefix(name);
  if (!prefix) {
    console.warn(`[ReactIcon] Unknown prefix for "${name}"`);
    return null;
  }

  const mods = await Promise.all(LIB_MAP[prefix].map((load) => load()));
  const merged: IconModule = Object.assign({}, ...mods);
  const Comp = merged[name] as ComponentType<object> | undefined;

  if (!Comp) {
    console.warn(
      `[ReactIcon] "${name}" not found in react-icons (prefix: ${prefix})`
    );
    return null;
  }

  iconCache.set(name, Comp);
  return Comp;
}

/* ── ReactIcon component ─────────────────────────────────────────────────── */
const ReactIcon = memo(
  ({
    name,
    size,
    color,
    className,
    style,
    title,
    fallback: Fallback,
  }: ReactIconProps) => {
    const [Icon, setIcon] = useState<ComponentType<object> | null>(
      () => iconCache.get(name) ?? null
    );

    useEffect(() => {
      if (!name) return;
      let cancelled = false;

      resolveIcon(name).then((comp) => {
        if (!cancelled) setIcon(() => comp);
      });

      return () => {
        cancelled = true;
      };
    }, [name]);

    const iconProps = { size, color, className, style, title };

    if (!Icon) return Fallback ? <Fallback {...iconProps} /> : null;
    return <Icon {...iconProps} />;
  }
);

ReactIcon.displayName = 'ReactIcon';
export default ReactIcon;
