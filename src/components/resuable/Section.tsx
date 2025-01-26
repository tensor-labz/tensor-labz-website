import React, { memo, forwardRef } from 'react';
import { motion, Variants, MotionProps } from "framer-motion";

type AnimationType = 'default' | 'staggered' | 'cascade';

type SectionProps = MotionProps & {
  children: React.ReactNode;
  id?: string;
  className?: string;
  animationType?: AnimationType;
};

const Section = memo(forwardRef<HTMLElement, SectionProps>((
  {
    children,
    id,
    className = "",
    animationType = 'default',
    ...props
  },
  sectionRef
) => {
  // Explicitly typed Variants
  const containerVariants: Record<AnimationType, Variants> = {
    default: {
      initial: { opacity: 0, y: 50 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.6,
          ease: "easeOut"
        }
      }
    },
    staggered: {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          delayChildren: 0.3,
          staggerChildren: 0.2
        }
      }
    },
    cascade: {
      initial: { opacity: 0, scale: 0.9 },
      animate: {
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 10,
          staggerChildren: 0.1
        }
      }
    }
  };

  // Child element variants
  // const childVariants: Variants = {
  //   initial: { opacity: 0, y: 20 },
  //   animate: { 
  //     opacity: 1, 
  //     y: 0,
  //     transition: { 
  //       type: "tween",
  //       duration: 0.5 
  //     }
  //   }
  // };

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`w-full ${className}`}
      initial="initial"
      animate="animate"
      variants={containerVariants[animationType]}
      viewport={{ once: true, amount: 0.2 }}
      {...props}
    >
      {children}
    </motion.section>
  );
}));

Section.displayName = "Section";

export default Section;