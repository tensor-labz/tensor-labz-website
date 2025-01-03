
import { motion } from 'motion/react';

type SectionProps = {
    children: React.ReactNode;
    id: string;
}
export default function Section({children,id}: SectionProps) {
  return (
    <motion.section 
    initial={{opacity:0}}
    whileInView={{opacity:1}}
    exit={{opacity:0}}
    id={id}>
{children}
    </motion.section>
  )
}
