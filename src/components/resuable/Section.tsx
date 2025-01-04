import { motion, MotionProps } from "framer-motion";
import { forwardRef } from "react";

type SectionProps = MotionProps & {
  children: React.ReactNode;
  id?: string;
  className?: string;
};

const Section = forwardRef<HTMLElement, SectionProps>((
  {
    children,
    id,
    className = "",
    initial = { opacity: 0, y: -150 },
    whileInView = { opacity: 1, y: 0 },
    exit = { opacity: 0, y: 150 },
    transition = { duration: 0.5, ease: "easeOut" },
    viewport = { once: true, amount: 0.4 },
    ...rest
  },
  sectionRef
) => {
  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`${className} min-h-screen`}
      initial={initial}
      whileInView={whileInView}
      exit={exit}
      transition={transition}
      viewport={viewport}
      {...rest}
    >
      {children}
    </motion.section>
  );
});

// Set the display name for better debugging
Section.displayName = "Section";

export default Section;
