import React, { useEffect, useState } from 'react'
import { TiArrowUpThick } from 'react-icons/ti'
import { scrollToTop } from '../../functions/fun_layout';
import { FaWhatsapp } from 'react-icons/fa';
import contactDetails from '../../data/Data_ContacDetails';

export default function GoToTop() {
    const [isVisible, setIsVisible] = useState(false)

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };


    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);
    return (
        <div className='fixed 
        flex md:flex-col flex-row-reverse
        gap-8
        md:w-fit w-full
        justify-between
        md:px-auto px-5
        bottom-2 md:bottom-6
        right-0 md:right-10 
        z-10
        '>
     
            <Button 
        onClick={scrollToTop} 
        className={`${isVisible?"opacity-100":"opacity-0"} text-blue-600  md:text-white md:bg-blue-600`}>
            <TiArrowUpThick />
        </Button>
        <Button className='text-white bg-green-600 hover:bg-green-700' href={contactDetails.find(contact=>contact.type==='whatsapp')?.link}><FaWhatsapp className='md:text-2xl text-4xl'/></Button>
        </div>
        
    )
}

function Button({children,className='text-blue-600  md:text-white md:bg-blue-600',onClick,href}){
    return href?(
    <a href={href} className={`${className} 
        transition 
        duration-500
        border-0 outline-0 
        ease-in-out 
        md:p-3 p-1
        rounded-full   
        cursor-pointer
        sm:text-2xl text-lg
        hover:drop-shadow-2xl`}>
            {children}

    </a>):(
        <button onClick={onClick} className={`${className} 
        transition 
        duration-100
        border-0 outline-0 
        ease-in-out 
        md:p-3 p-1
        rounded-full
        cursor-pointer   
        sm:text-2xl text-lg 
        hover:drop-shadow-2xl
        `}>{children}</button>
    )
}