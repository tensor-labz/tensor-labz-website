import HeaderHelmentProps from "../../base/type/HeaderHelmentProps.d";
import HeaderHelment from "../../base/Head";
import { motion } from "motion/react";
type PageProps = {
    children: React.ReactNode;
    HeadProps:HeaderHelmentProps
}

export default function Page({children,HeadProps }: PageProps) {
  return (
    <>
  <HeaderHelment {...HeadProps}/>
      <motion.main initial={{ opacity: 0,width:0 }} animate={{ opacity: 1,width:"100%",transition:{duration:0.2} }} exit={{ opacity: 0,x:window.innerWidth,transition:{duration:0.3} }} className="min-h-screen relative min-w-full">
{children}
   </motion.main>
    </>
 
  )
}
