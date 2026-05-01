import React, { memo } from 'react';
import { motion, MotionProps } from 'motion/react';
import HeaderHelment from "../../base/Head";
import  HeaderHelmentProps  from "../../base/type/HeaderHelmentProps.d";

// Refined type definition with clearer interfaces
interface PageProps extends MotionProps {
  children: React.ReactNode;
  HeadProps: HeaderHelmentProps;
  className?: string;
}

// Memoized Page component with optimized motion configuration
const Page: React.FC<PageProps> = memo(({ 
  children, 
  HeadProps, 
  className = '', 
  ...motionProps 
}) => {
  // Standard page transition animations
  const pageVariants = {
    initial: { 
      opacity: 0,
      width: 0 
    },
    animate: { 
      opacity: 1,
      width: "100%",
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      x: typeof window !== 'undefined' ? window.innerWidth : 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <>
      <HeaderHelment {...HeadProps} />
      <motion.main 
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className={`min-h-screen relative min-w-full ${className}`}
        {...motionProps}
      >
        {children}
      </motion.main>
    </>
  );
});

Page.displayName = 'Page';
export default Page;