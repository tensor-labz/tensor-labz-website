import React, { memo } from 'react'
import { FaPlay } from 'react-icons/fa'

function HomeHero() {
    return (
        <>
        <section>
            <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px] relative">
                {/* Brand Info */}
                <div className="flex flex-col justify-center py-14 md:py-0 ">
                    <div className='text-center md:text-left space-y-6 font-playfair'>
                    <h1 className='text-5xl lg:text-6xl font-bold leading-relaxed xl:leading-normal'>sfdddddddddddddddddddd sdfsdfsdf dsfdsfsdfsdf dfsdfsf <span className='text-primary'>3 D printings </span></h1>
                    <p className='text-gray-600 xl:max-w-[500px] '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, similique sequi! Neque rerum quibusdam quidem perspiciatis aspernatur. Incidunt quidem vero nemo officiis facere ullam harum. Aliquid natus libero id debitis.</p>
                    {/* Button Section */}
<div className="flex justify-center items-center gap-8 md:justify-start">
    <button className="primary-btn flex items-center gap-2 mt-4">Order Now</button>
    <button className="flex justify-center items-center gap-2 "><FaPlay/> watch</button>
</div>
                    </div>
                  
                </div>
                {/*Hero Image*/}
            </div>
        </section>
        </>
    )
}

export default memo(HomeHero)
