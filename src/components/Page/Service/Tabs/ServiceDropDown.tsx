import  { memo, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ServiceDropDown = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="relative flex  md:hidden items-center justify-end w-full">
      {/* Filter Button */}
      <button
        className="flex self-end rounded items-center px-4 py-2 bg-transparent text-blue-700 hover:text-blue-500 transition-all duration-300"
        onClick={() => setToggle(!toggle)}
      >
        <FaFilter className="text-lg transition-transform duration-300 transform hover:scale-110" />
      </button>

      {/* Animated Dropdown Menu */}
      <AnimatePresence>
        {toggle && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50"
          >
            <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <select
                className="w-full p-3 bg-white text-gray-800 border-none outline-none"
                onChange={() => setToggle(false)}
              >
                <option value="">Select an option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option>
                <option value="5">Option 5</option>
                <option value="6">Option 6</option>
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(ServiceDropDown);
