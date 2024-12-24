import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-300 py-6">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
          {/* Company Info */}
          <div className="mb-6 md:mb-0 md:text-justify text-center">
          <h4 className='logo-text md:font-extrabold   cursor-poiner bg-gradient-to-tr from-blue-600 via-navy-900 to-blue-800 bg-clip-text text-transparent text-2xl sm:text-3xl font-bold'>Tensor Labs</h4>
            <p className="text-blue-800 mt-1">Building innovative solutions for a digital world.</p>
          </div>

       

          {/* Social Media Links */}
          <div className="flex gap-8">
            {[
              [ <FaFacebookF />,"https://facebook.com"],
              [ <FaLinkedinIn />,"https://facebook.com"],
              [ <FaInstagram />,"https://facebook.com"],
            ].map(([Icon,link],index)=>(<a key={index} href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xl hover:text-blue-800">
             {Icon}
            </a>))
            }
            
           
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-blue-400 pt-4 text-center">
          <p className="text-blue-800">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
