import React from 'react'
import { Link } from 'react-router-dom'

export default function NavItem({title,link,className="",expandToggle}) {
 
  return (
    <li className={`
    py-2 px-4  
    sm:font-bold 
    lg:text-lg sm:text-sm text-xl 
    relative ${className}`}>
<Link className={`
  hover:text-blue-800 text-blue-900 
  after:content-[""] 
  after:rounded-xl 
  after:absolute 
  after:left-0 after:bottom-0 
  after:h-0.5 sm:after:h-1 after:w-0 
  after:bg-blue-800 
  after:transition-all after:duration-300 hover:after:w-3/4 
 `} href={link}>{title}</Link>

    </li>
  )
}
