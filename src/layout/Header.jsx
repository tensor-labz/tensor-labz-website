import React, { useEffect, useMemo, useState } from 'react'
import NavBar from './NavBar';
import Logo from '../components/layout/Comp_logo';
import { FaBars } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import useScroll from '../hooks/useScroll';
export default function Header() {
  const [isexpand,setExpand]=useState(false)
  // Show button when page is scrolled down
  const location=useLocation()
  const [isVisible,setIsVisible]=useScroll(100)
  const isIndex=useMemo(()=>location.pathname==='/',[location])
const expandtoggle=()=>{
  setExpand(!isexpand)
}
useEffect(()=>console.log(location),[location])
  return (
    <>
    {isexpand&&<div onClick={expandtoggle} className='sticky backdrop-blur-xl min-h-screen w-full top-0 left-bg-sky-900 z-30  transition-all duration-700 ease-in-out md:hidden block'></div>} 
    <header className={`${!isIndex || isVisible?"bg-blue-50 border-b-2 border-b-sky-300":"sm:bg-transparent bg-white"} fixed  top-0 left-0 w-full px-4 sm:px-10 py-2 flex justify-between items-center gap-x-20 z-50 `}>
     {!isexpand&&<Logo/>}
      <NavBar isexpand={isexpand} expandtoggle={expandtoggle}/>
      {!isexpand&&<button onClick={expandtoggle} className={`hover:text-blue-700 text-blue-900 cursor-pointer sm:hidden text-lg font-extrabold block z-10`}>
      <FaBars/>
      </button>}
     
        
    </header>
    </>
  )
}
