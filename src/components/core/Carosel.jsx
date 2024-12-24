import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Carousel = ({ data, CardComponent, autoSlide = true, slideInterval = 2000 }) => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start on the first duplicated slide
  const transitionRef = useRef(true);
  const autoSlideInterval = useRef();

  // Next slide logic with smooth looping
  const nextSlide = () => {
    if (currentIndex < data.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      transitionRef.current = false;
      setCurrentIndex(1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 1) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else {
      transitionRef.current = false;
      setCurrentIndex(data.length);
    }
  };

  // Reset transition after snapping
  useEffect(() => {
    if (!transitionRef.current) {
      transitionRef.current = true;
    }
  }, [currentIndex]);

  // Automatic slide change if autoSlide is enabled
  useEffect(() => {
    if (autoSlide) {
      autoSlideInterval.current = setInterval(() => {
        nextSlide();
      }, slideInterval);

      return () => clearInterval(autoSlideInterval.current);
    }
  }, [currentIndex]);


  return (
    <div className=" sm:hidden block relative max-w-screen-xl mx-auto overflow-hidden">
      {/* Carousel Slides */}
      <div
        className={` flex ${transitionRef.current ? 'transition-transform duration-1000 ease-in-out' : ''}`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {/* Duplicate last slide for smooth looping */}
        <CardComponent {...data[data?.length - 1]} key="last-duplicate" />

        {/* Main slides */}
        {data.map((item, index) =>{ 
          return(
          <CardComponent {...item} key={index} />
          
        )})}

        {/* Duplicate first slide for smooth looping */}
        <CardComponent {...data[0]} key="first-duplicate" />
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out hover:bg-green-800 text-green-200 hover:text-white p-2 rounded-full opacity-70 hover:opacity-100"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out hover:bg-green-800 text-green-200 hover:text-white p-2 rounded-full opacity-70 hover:opacity-100"
      >
        <FaArrowRight />
      </button>

      {/* Indicator */}
      <div className="absolute sm:hidden bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {data.map((_, index) => (
          <span
            key={index}
            className={`transition-all duration-300 ease-in-out h-2 ${currentIndex - 1 === index ? 'w-3 bg-green-800 scale-125 shadow-lg rounded-3xl' : 'w-2 bg-green-100 rounded-full'}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
