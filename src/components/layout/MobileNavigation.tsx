import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import navData from "../../data/nav_data";
import logo from "../../assets/images/logo.png"; // Replace with your actual logo path
import useScroll from "../../base/hooks/useScroll";
interface NavItemProps {
  icon: React.ReactNode;
  nav: string;
  to: string;
  onNavigate: () => void;
}

const NavItem: React.FC<NavItemProps> = memo(({ icon, nav, to, onNavigate }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    onNavigate(); // Close the drawer
    setTimeout(() => navigate(to), 300); // Navigate after drawer close animation
  };

  return (
    <motion.div
      className="flex items-center p-4 hover:bg-blue-100 transition-colors cursor-pointer rounded-lg"
      whileTap={{ scale: 0.95 }}
      onClick={handleNavigation}
    >
      <div className="mr-4 text-xl text-blue-600">{icon}</div>
      <span className="text-sm md:text-md font-semibold text-gray-800">
        {nav}
      </span>
    </motion.div>
  );
});

const MobileNavigation: React.FC = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDrawer = () => setIsOpen(!isOpen);

  const closeDrawer = () => setIsOpen(false);
  const { pathname } = useLocation();
  const isVisible = useScroll();
  const ishome = pathname === "/";
  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleDrawer}
          className={`text-xl ${ishome && !isVisible?"text-blue-600":"text-white"}  focus:outline-none`}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </motion.button>
      </div>

      {/* Drawer Overlay and Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed top-0 right-0 h-full bg-white shadow-xl z-50 w-full sm:w-72"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-10 w-auto object-contain"
                  onClick={() => {
                    navigate("/");
                    closeDrawer();
                  }}
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={closeDrawer}
                  className="text-xl text-gray-600"
                >
                  <FaTimes />
                </motion.button>
              </div>

              {/* Navigation Items */}
              <div className="mt-6">
                {navData.map((item, index) => (
                  <NavItem
                    key={index}
                    icon={item.icon}
                    nav={item.nav}
                    to={item.to}
                    onNavigate={closeDrawer}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

MobileNavigation.displayName = "MobileNavigation";

export default MobileNavigation;
