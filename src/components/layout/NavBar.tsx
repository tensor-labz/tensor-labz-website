import navData from '../../data/nav_data';
import {AnimatePresence,motion } from 'framer-motion';
import NavItem from './NavItem';

const NavBar: React.FC = () => {



  return (
    <nav className="md:flex hidden items-center space-x-6">
      <AnimatePresence>
        {navData.map((navItem, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{
              delay: index * 0.1,
              type: 'spring',
              stiffness: 300
            }}
          >
            <NavItem
              nav={navItem.nav}
              to={navItem.to}
              icon={navItem.icon} />

          </motion.div>
        ))}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar