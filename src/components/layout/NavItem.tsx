import React, { memo,useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useScroll from '../../base/hooks/useScroll';
import {motion } from 'framer-motion';
type NavItemType = {
    nav: string;
    to: string;
    icon: React.ReactNode;
}
const NavItem: React.FC<NavItemType> = memo((navItem: NavItemType) => {
      const isVisible = useScroll();
    const { pathname } = useLocation()
    const isattack=useMemo(()=>/\/(services|contact-us)/.test(pathname),[pathname])

  return (
        <NavLink
        to={navItem.to}
        className="group relative inline-block overflow-hidden"
      >
        {isVisible ? (
          <motion.span
            className={`file:inline-block text-lg font-semibold text-blue-800 relative  after:content-['']
after:rounded-xl
after:absolute
after:left-0 after:bottom-0
after:h-0.5 sm:after:h-1 after:w-0
after:bg-blue-800
after:transition-all after:duration-300 hover:after:w-3/4 `}
          >
            {navItem.nav}
          </motion.span>
        ) : (
          <motion.span
              className={`block p-2 text-xl ${isattack?"text-white":"text-blue-900 hover:shadow-lg"} transition-all duration-300`}
          >
            {navItem.icon}
          </motion.span>
        )}
      </NavLink>
    )
})

NavItem.displayName = 'NavItem';
export default NavItem;