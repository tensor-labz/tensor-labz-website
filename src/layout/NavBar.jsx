import React from 'react';
import navitems from './../data/Data_NavItems';
import NavItem from '../components/layout/Comp_NavItem';
import { FaBarsStaggered } from 'react-icons/fa6';
import Logo from '../components/layout/Comp_logo';

export default function NavBar({ isexpand,expandtoggle }) {
  return (
    <>
    <nav
    className={`
      ${
        isexpand ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      } 
      sm:translate-x-0 sm:opacity-100
      transition-all ease-in-out duration-700
      sm:block 
      bg-white sm:bg-transparent 
      w-3/4 md:w-1/2 
      h-screen sm:h-auto
      fixed sm:relative 
      top-0
      right-0 z-50
    `}
    >
      
      <ul className="flex sm:flex-row flex-col  transition-all duration-700 ease-in-out sm:mt-0 items-center justify-between mt-16 w-full">
        {isexpand&&<Logo/>}
        {navitems.map((navitem, index) => (
          <NavItem expandToggle={expandtoggle} {...navitem} key={index} />
        ))}
      </ul>
      <button onClick={expandtoggle} className={`hover:text-blue-700 text-blue-900 cursor-pointer absolute top-5 right-6 sm:hidden text-lg font-extrabold block z-10`}>
      <FaBarsStaggered/>
      </button>
    </nav>
    </>
  );
}
