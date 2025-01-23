import { NavLink, NavLinkProps } from "react-router-dom";
import navData from "../../data/nav_data";
import { useDeviceContext } from "../../contexts/DeviceContext";


export default function NavBar() {
  const device=useDeviceContext()
  return (
    <nav className='md:flex hidden items-center gap-x-8 bg-transparent'>
        {navData.map((navitem,index)=>(
            <NavLink  to={navitem.to}>
              <span className='md:text-lg lg:text-2xl font-bold text-blue-900 transition-all duration-500 ease-out bg-transparent hover:bg-gradient-to-b from-white via-blue-50 to-blue-200 p-2  relative inline-block rounded-full'>
{navitem.icon}
              </span>
              <span className=''>{device}</span>

            </NavLink>
        ))}
    </nav>
  )
}
