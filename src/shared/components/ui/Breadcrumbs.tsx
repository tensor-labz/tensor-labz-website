import ReactIcon from './ReactIcon';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
  <div className="flex min-w-0 items-center gap-1.5 text-sm">
    {items.map((item, idx) => {
      const isLast = idx === items.length - 1;
      return (
        <span key={idx} className="flex min-w-0 items-center gap-1.5">
          {idx > 0 && (
            <ReactIcon
              name="FaChevronRight"
              size={9}
              style={{
                color: 'var(--text-muted)',
                opacity: 0.5,
                flexShrink: 0,
              }}
            />
          )}
          {isLast ? (
            <span
              className="truncate font-semibold"
              style={{
                color: 'var(--text-primary)',
                fontFamily: '"Syne", sans-serif',
              }}
            >
              {item.label}
            </span>
          ) : (
            <button
              type="button"
              onClick={item.onClick}
              className="shrink-0 font-medium hover:underline"
              style={{ color: 'var(--text-muted)' }}
            >
              {item.label}
            </button>
          )}
        </span>
      );
    })}
  </div>
);

export default Breadcrumbs;
