import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

export default function Modal({ children, isOpened = false }) {
  const [isOpen, setOpen] = useState(isOpened);
  const [isClosing, setClosing] = useState(false);

  const closeModal = () => {
    setClosing(true);
    setTimeout(() => setOpen(false), 400); // Wait for animation to complete
  };

  if (!isOpen) return null;
console.log(isOpen);

  return (
    // Backdrop
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal container */}
      <div
        className={`bg-white w-[90%] md:w-[50%] lg:w-[40%] rounded-lg shadow-lg p-6 relative mt-10 md:mt-0 md:mx-auto ${
          isClosing ? 'animate-slide-out' : 'animate-slide-in'
        }`}
      >
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-xl text-gray-500 hover:text-gray-800"
          onClick={closeModal}
        >
          <AiOutlineClose />
        </button>
        {/* Modal content */}
        {children}
      </div>
    </div>
  );
}
