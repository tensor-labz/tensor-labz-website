
import { motion } from 'framer-motion';
// import { useTabContext } from '../context/TabContext';
// import { homedata } from './../../data/Data_Page';
import f from "../../../../assets/images/Page/ContactUs/lg.jpg"
const HeroSection = () => {
  // const { activeTab } = useTabContext();

  return (
    <motion.div
      // key={activeTab?.slug} // Unique key for animation
      className="relative p-8 text-center bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg overflow-hidden h-56 pt-10 pb-3"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image */}
      <img
        src={f}
        // alt={activeTab?.title}
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="relative z-10">
        {/* Title */}
        <h1 className="md:text-5xl text-3xl font-bold drop-shadow-lg">rdfdfdvhgjdddddddddddddffjh gff</h1>
        {/* Description */}
        <p className="mt-4 text-sm  md:text-lg">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere fuga molestiae itaque repellat quo veniam, delectus magnam tempora doloremque suscipit autem molestias omnis ad. Soluta, veniam? Perspiciatis voluptatem doloremque odio!</p>
      </div>
    </motion.div>
  );
};

export default HeroSection;