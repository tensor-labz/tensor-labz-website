import React from 'react';
import PageLayout from '../../layout/PageLayout';
import {servicedata} from '../../data/Data_Page';
import ServiceCard from '../../components/pages/ServiceCard';
import Carousel from '../../components/core/Carosel';
import PageTitle from '../../components/core/PageTitle';
import { Link } from 'react-router-dom';
import { FaArrowAltCircleRight } from 'react-icons/fa';


export default function Services() {
  return (
    <PageLayout id='services' >
      <div className="max-w-screen-xl mx-auto px-6">
        <PageTitle>Our Services</PageTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {servicedata?.services?.slice(0,5).map((service, index) => (
            
              <ServiceCard {...service} />
          ))}
        </div>
        <div className='flex items-center w-full justify-center mt-4'><Link to='/services' className='flex items-center font-semibold bg-blue-700 px-4 rounded-md text-white py-1'>See More <FaArrowAltCircleRight className='text-xl ms-4'/></Link></div>
        
      </div>
    </PageLayout>
  );
}
