import { FC } from 'react';
import { motion } from 'framer-motion';
import { useRootContext } from '../../../../contexts/RootContext';



const ServiceHero: FC = () => {
  const {Data}=useRootContext()
  return (
    <div className="relative w-full h-32 sm:h-40 md:h-60">
      {/* Background for small screens (Image) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0 md:hidden"
      >
        <img
          src={Data.insight.hero.hero_bg.sm}
          alt="Hero Background"
          className="w-full h-full object-cover brightness-75"
        />
      </motion.div>

      {/* Background for medium and up (Video) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0 hidden md:block"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center brightness-75"
        >
          <source src={Data.insight.hero.hero_bg.lg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl md:text-5xl font-bold text-center mb-4"
        >
          {Data.insight.hero.title}
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-sm md:text-lg text-center max-w-2xl md:block hidden"
        >
          {Data.insight.hero.description}
        </motion.p>
      </div>
    </div>
  );
};

export default ServiceHero;
