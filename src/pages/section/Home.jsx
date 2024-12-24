import React from 'react';
import PageLayout from '../../layout/PageLayout';
import { homedata } from '../../data/Data_Page';

export default function Home() {
  return (
    <PageLayout id="home">
      <div className="relative md:bg-gradient-to-br from-white to-sky-50 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 py-10 sm:py-20 md:py-18 lg:py-24 px-6  md:px-8 lg:px-12 min-h-screen flex items-center justify-center">
        {/* Curved Shape */}
        <div className="border-sky-700 md:border-l-2 lg:border-l-4 absolute inset-0 bg-gradient-to-bl from-sky-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-bl-none sm:rounded-bl-[18%] lg:rounded-bl-[38%] pointer-events-none"></div>
        <div className="relative lg:container lg:px-0 px-3 sm:px-6 mx-auto flex flex-col-reverse  md:flex-row  md:items-center md:gap-x-8 lg:gap-x-10 md:justify-between">
          {/* Text Content */}
          <div className="text-center sm:text-left w-full md:w-1/2 lg:w-3/5">
          <h1 className="text-2xl md:text-3xl md:text-left text-center lg:text-5xl md:font-bold lg:font-extrabold font-serif leading-tight mb-4 bg-gradient-to-tr from-blue-500 via-navy-900 to-blue-800 bg-clip-text text-transparent lg:py-6 py-4">
  {homedata?.hero?.title}
</h1>

            <p className="text-base md:text-lg lg:text-xl text-navy-700 leading-relaxed">
              {homedata?.hero?.content}
            </p>
          </div>
          {/* Image */}
          <div className="w-full md:w-1/2 lg:w-2/5 mt-12 md:mt-0 ">
          

            <img
              src={homedata?.hero?.image}
              alt="Hero Section"
              className="w-full object-fit rounded-xl transform"
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
