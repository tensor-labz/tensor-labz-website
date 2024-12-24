import React from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'


export function CarouselButton({ onClick, vertical = 'top-1/2', horizontal = 'right-0', className = "absolute", color = "hover:bg-green-200 text-gray-400 hover:text-green-700", type = 'next' }) {
    return (
        <button
            className={`${vertical} transition-transform duration-700 ease-in-out ${horizontal} transform ${className} -translate-y-1/2 rounded-full opacity-70 hover:opacity-100`}
            onClick={onClick}>
            {type === 'next' ? <FaAngleRight /> : <FaAngleLeft />}
        </button>
    )
}

