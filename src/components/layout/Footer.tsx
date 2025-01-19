import { memo } from 'react';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import logo from "../../assets/images/logo.png"
function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-500 via-white to-gray-100 text-blue-50 py-6 border-t-2 border-blue-300">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
          {/* Company Info */}
          <div className="mb-6 md:mb-0 md:text-justify text-center flex flex-col items-center lg:items-start justify-center lg:justify-start">
            <img src={logo} loading='lazy' alt='tensor labz logo' className='object-center h-12' />
            <p className="text-blue-800 mt-1">Building innovative solutions for a digital world.</p>
          </div>

       

          {/* Social Media Links */}
          <div className="flex gap-8">
            {[
              [ <FaFacebookF />,"https://facebook.com"],
              [ <FaLinkedinIn />,"https://facebook.com"],
              [ <FaInstagram />,"https://facebook.com"],
            ].map(([Icon,link],index)=>(<a key={index} href={link as string} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xl hover:text-blue-800">
             {Icon}
            </a>))
            }
            
           
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-400 pt-4 text-center">
          <p className="text-blue-800">&copy; {new Date().getFullYear()} <strong className='text-blue-600'>Tensor Labz</strong>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer)