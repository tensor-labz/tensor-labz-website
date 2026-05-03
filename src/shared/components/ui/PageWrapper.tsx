import React, { memo } from 'react';
import { motion, MotionProps } from 'motion/react';
import HeaderHelment from '../../../base/Head';
import HeaderHelmentProps from '../../../base/type/HeaderHelmentProps.d';

interface PageWrapperProps extends MotionProps {
  children: React.ReactNode;
  HeadProps: HeaderHelmentProps;
  className?: string;
}

const pageVariants = {
  initial: { opacity: 0, width: 0 },
  animate: { opacity: 1, width: '100%', transition: { duration: 0.3 } },
  exit: { opacity: 0, x: '100vw', transition: { duration: 0.4 } },
};

const PageWrapper: React.FC<PageWrapperProps> = memo(
  ({ children, HeadProps, className = '', ...motionProps }) => (
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
  )
);

PageWrapper.displayName = 'PageWrapper';
export default PageWrapper;
