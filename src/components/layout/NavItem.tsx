import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

type NavItemType = {
  nav: string;
  to: string;
  icon?: React.ReactNode;
  isButton?: boolean;
}

const NavItem: React.FC<NavItemType> = memo(({ nav, to, isButton = false }) => (
  <NavLink
    to={to}
    className={({ isActive }) => {
      if (isButton) {
        return `text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-sm border transition-all duration-300
          ${isActive
            ? 'border-white text-white bg-white/10'
            : 'border-white/40 text-white/80 hover:border-white hover:text-white hover:bg-white/10'
          }`;
      }
      return `relative text-xs font-semibold tracking-widest uppercase transition-colors duration-300
        after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-white
        after:transition-all after:duration-300
        ${isActive
          ? 'text-white after:w-full'
          : 'text-white/60 hover:text-white after:w-0 hover:after:w-full'
        }`;
    }}
  >
    {nav}
  </NavLink>
));

NavItem.displayName = 'NavItem';
export default NavItem;
