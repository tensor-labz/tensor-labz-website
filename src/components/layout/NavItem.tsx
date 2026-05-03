import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

type NavItemType = {
  nav: string;
  to: string;
  icon?: React.ReactNode;
  isButton?: boolean;
};

const NavItem: React.FC<NavItemType> = memo(({ nav, to, isButton = false }) => (
  <NavLink
    to={to}
    className={({ isActive }) => {
      if (isButton) {
        return `text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded
          transition-all duration-300
          ${
            isActive
              ? 'bg-sky-500 text-white'
              : 'bg-sky-500/10 text-sky-600 dark:text-sky-400 hover:bg-sky-500 hover:text-white border border-sky-500/30 hover:border-sky-500'
          }`;
      }
      return `relative text-xs font-medium tracking-widest uppercase
        transition-colors duration-300
        after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-[var(--accent)]
        after:transition-all after:duration-300
        ${
          isActive
            ? 'text-[var(--accent)] after:w-full'
            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] after:w-0 hover:after:w-full'
        }`;
    }}
  >
    {nav}
  </NavLink>
));

NavItem.displayName = 'NavItem';
export default NavItem;
