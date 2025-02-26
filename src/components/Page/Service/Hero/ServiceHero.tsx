import { FC } from 'react';
import { motion } from 'framer-motion';
import f from "../../../../assets/images/Page/ContactUs/lg.jpg";

const ServiceHero: FC = () => {
  return (
    <div className="relative w-full h-40 md:h-96">
      {/* Background Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
      >
        <img
          src={f}
          alt="Hero Background"
          className="w-full h-full object-cover brightness-75"
        />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        {/* Title */}
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl md:text-5xl font-bold text-center mb-4"
        >
          Our Professional Services
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-sm md:text-lg text-center max-w-2xl md:block hidden"
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere fuga molestiae itaque repellat quo veniam, delectus magnam tempora doloremque suscipit autem molestias omnis ad. Soluta, veniam? Perspiciatis voluptatem doloremque odio!
        </motion.p>
      </div>
    </div>
  );
};

export default ServiceHero;
