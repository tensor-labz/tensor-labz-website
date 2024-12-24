import React from 'react'
import PageLayout from '../../layout/PageLayout'
import { aboutusdata } from '../../data/Data_Page';
import PageTitle from '../../components/core/PageTitle';
import hero from '../../asserts/images/page/hero.webp'
export default function AboutUs() {
  return (
    <PageLayout id='about-us' className='about-us flex items-center justify-center' >
 {/* Main Section with Background Image */}
 <div className="relative py-20 px-6 w-full bg-transparent">
        
        <div className=" container mx-auto flex sm:flex-row flex-col items-center gap-10">
          {/* Header */}
         <div className='w-full md:w-1/3'>
         <img src={hero} className='rounded-2xl shadow-inner shadow-md'/>
         </div>
         <div className='w-full md:w-2/3'>
          <PageTitle>{aboutusdata?.title}</PageTitle>
          <p className="text-xl text-blue-900 mb-12 max-w-4xl md:text-justify text-center">
            {aboutusdata?.content}
          </p>
         </div>
         
        </div>
      
 </div>

     
    </PageLayout>
  )
}
