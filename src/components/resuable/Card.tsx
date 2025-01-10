
import { motion } from "framer-motion";
type CardProps = {
    children: React.ReactNode;
className?:string,
onClick?: () => void;
animation?:{
    initial:{[key:string]:any},
    whileHover?:{[key:string]:any},
    whileTap?:{[key:string]:any},
    transition?:{[key:string]:any},
    viewport?:{[key:string]:any},
    whileInView?:{[key:string]:any},
}
}
export default function Card({children,className,onClick,
    animation={initial:{ opacity: 0, x: -50 },transition:{ duration: 0.6, ease: "easeOut"},viewport:{ once: true, amount: 0.1 },whileInView:{ opacity: 1, x: 0 }}}: CardProps) {
  return (
    <motion.div
    onClick={onClick}
    initial={animation?.initial} // Start off-screen
    whileInView={animation?.whileInView} // Animate to center
    viewport={animation.viewport} // Trigger animation when 10% of the card is visible
    transition={animation?.transition}
    className={`group ${className}`}
  >
    {children}
    </motion.div>
  )
}
