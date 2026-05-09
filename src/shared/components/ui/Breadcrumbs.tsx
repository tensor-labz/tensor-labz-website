import { FaChevronRight } from 'react-icons/fa';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
  <div className="flex items-center gap-1.5 min-w-0 text-sm">
    {items.map((item, idx) => {
      const isLast = idx === items.length - 1;
      return (
        <span key={idx} className="flex items-center gap-1.5 min-w-0">
          {idx > 0 && (
            <FaChevronRight
              size={9}
              style={{ color: 'var(--text-muted)', opacity: 0.5, flexShrink: 0 }}
            />
          )}
          {isLast ? (
            <span
              className="font-semibold truncate"
              style={{ color: 'var(--text-primary)', fontFamily: '"Syne", sans-serif' }}
            >
              {item.label}
            </span>
          ) : (
            <button
              type="button"
              onClick={item.onClick}
              className="font-medium shrink-0 hover:underline"
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
