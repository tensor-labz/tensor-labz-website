import React, { memo } from 'react';
import { motion, MotionProps, Variants } from 'framer-motion';

// Enhanced type definition for more precise prop typing
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onClick?: () => void;
  animation?: {
    initial?: MotionProps['initial'];
    whileHover?: MotionProps['whileHover'];
    whileTap?: MotionProps['whileTap'];
    transition?: MotionProps['transition'];
    viewport?: MotionProps['viewport'];
    whileInView?: MotionProps['whileInView'];
  };
}

// Default animation variants
const defaultAnimationVariants: CardProps['animation'] = {
  initial: { opacity: 0, x: -50 },
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { 
    duration: 0.6, 
    ease: "easeOut" 
  },
  viewport: { 
    once: true, 
    amount: 0.1 
  },
  whileInView: { 
    opacity: 1, 
    x: 0 
  }
};

const Card: React.FC<CardProps> = memo(({
  children, 
  className = '', 
  onClick, 
  animation = defaultAnimationVariants,
  ...rest
}) => {
  // Merge default and custom animations
  const mergedAnimation = {
    ...defaultAnimationVariants,
    ...animation
  };

  return (
    <motion.div
      onClick={onClick}
      initial={mergedAnimation.initial}
      whileHover={mergedAnimation.whileHover}
      whileTap={mergedAnimation.whileTap}
      whileInView={mergedAnimation.whileInView}
      viewport={mergedAnimation.viewport}
      transition={mergedAnimation.transition}
      className={`group cursor-pointer ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = 'AnimatedCard';

export default Card;