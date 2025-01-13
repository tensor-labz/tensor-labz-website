import servicesData from "../../../../data/service_data";
import { ServiceCardProps } from "../../../../base/type/ServiceProps.d";
import Section from "../../../resuable/Section";
import ServiceCard from "./ServiceCard";
import { useAnimation, motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Card from "../../../../components/resuable/Card";

export default function ServiceSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  // Define animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        staggerChildren: 0.2, // Stagger each child animation
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <Section id="service_section" className="container py-16">
      {/* Service Cards */}
      <motion.div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <Card className="group relative flex-none md:w-60 w-full flex flex-col  self-start justify-between rounded-lg gap-x-6 overflow-hidden py-2 px-6 md:px-8">
          {/* Animated Border */}
          <h1 className="h text-3xl md:text-4xl py-2 md:text-justify text-center">What we Offer</h1>
          <p className='text-gray-500 md:text-justify text-center'>Lorem  Aspernatur illum cupiditate esse labore iure amet omnis necessitatibus, error magni alias, quo natus minima nesciunt. Nesciunt, odit similique.</p>
          </Card>
        {servicesData.filter((serv:ServiceCardProps)=>serv.home===true).map((serv: ServiceCardProps, i: number) => (
          <motion.div key={i} variants={cardVariants}>
            <ServiceCard {...serv} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
