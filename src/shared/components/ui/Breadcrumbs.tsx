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
              className="shrink-0 text-muted opacity-50"
            />
          )}
          {isLast ? (
            <span className="truncate font-display font-semibold text-fg">
              {item.label}
            </span>
          ) : (
            <button
              type="button"
              onClick={item.onClick}
              className="shrink-0 font-medium text-muted hover:underline"
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
