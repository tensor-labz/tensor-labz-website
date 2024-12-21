import React, { memo } from 'react'
import NavData from './../data/NavData';
import { FaCube } from 'react-icons/fa6';

function NavBar() {
    return (
        <>
          <nav>
             <div className='container'>
            
        {/* logo section */}
        <div className="text-2xl flex items-center gap-2 font-bold py-8">
            <FaCube />
            <p> Tensor</p>
            <p>Lab</p>
        </div>
        {/* Menu section */}
        {/* Icon section */}
        {/* Mobile hamburger menu section */}
    </div>
    </nav>
    {/* Mobile siderbar section */}
        </>
      
       
    )
}

export default memo(NavBar)
