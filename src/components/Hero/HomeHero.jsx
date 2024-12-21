import React, { memo } from 'react'

function HomeHero() {
    return (
        <>
        <section>
            <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px] relative">
                {/* Brand Info */}
                <div className="flex flex-col justify-center py-14 md:py-0">
                    <h1 className='text-5xl lg:text-6xl font-bold leading-relaxed xl:leading-normal'>sfdddddddddddddddddddd sdfsdfsdf dsfdsfsdfsdf dfsdfsf <span className='text-primary'>3 D printings </span></h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, similique sequi! Neque rerum quibusdam quidem perspiciatis aspernatur. Incidunt quidem vero nemo officiis facere ullam harum. Aliquid natus libero id debitis.</p>
                </div>
                {/*Hero Image*/}
            </div>
        </section>
        </>
    )
}

export default memo(HomeHero)
