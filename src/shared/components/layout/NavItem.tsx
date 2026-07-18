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
        return `rounded px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
          isActive
            ? 'bg-sky-500 text-white'
            : 'border border-sky-500/30 bg-sky-500/10 text-sky-400 hover:border-sky-500 hover:bg-sky-500 hover:text-white'
        }`;
      }
      return `relative text-xs font-medium uppercase tracking-widest transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-[var(--accent)] after:transition-all after:duration-300 ${
        isActive
          ? 'text-[var(--accent)] after:w-full'
          : 'text-[var(--text-muted)] after:w-0 hover:text-[var(--text-primary)] hover:after:w-full'
      }`;
    }}
  >
    {nav}
  </NavLink>
));

NavItem.displayName = 'NavItem';
export default NavItem;
