import React from 'react'
import { Link} from 'react-router-dom'
import logoImg from '../../asserts/images/util/logo.png'
export default function Header_Logo({isexpand,className}) {
  return (
    <Link className={`
      ${className}
      logo-text 
      md:font-extrabold  
      bg-gradient-to-tr from-blue-600 via-navy-900 to-blue-800 bg-clip-text 
      text-transparent ${isexpand?'sm:text-5xl font-extrabold':'sm:text-3xl font-bold'}`}  to='/'>
        <img loading='lazy' alt='app-logo' className='h-16 object-fill' src={logoImg}/>
        </Link>
  )
}
