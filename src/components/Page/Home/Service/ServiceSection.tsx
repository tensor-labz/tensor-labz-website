import servicesData from "../../../../data/service_data";
import { ServiceCardProps } from "../../../../base/type/ServiceProps.d";
import Section from "../../../resuable/Section";
import ServiceCard from "./ServiceCard";
import { useAnimation,motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function ServiceSection() {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const controls = useAnimation();
  useEffect(()=>{
    if(inView){
      controls.start({
        opacity: 1,
        x:0,
        transition: { duration: 0.8, ease: "easeInOut" },
      });
    }
   
  },[inView,controls])
  return (
    <Section ref={ref} className="container py-4">
    {/* Review Section Header */}
    <h1 className={`h3 pb-8`}>Services</h1>
    <motion.div initial={{opacity:0,x:-100}} animate={controls} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {servicesData.map((serv:ServiceCardProps,i:number) => (<ServiceCard key={i} {...serv} />))}
      </motion.div>
  </Section>
  )
}
