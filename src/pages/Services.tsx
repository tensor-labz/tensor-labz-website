import Section from "../components/resuable/Section";
import Page from "../components/resuable/Page";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { motion, useAnimation } from 'framer-motion';

export default function Services() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const controls=useAnimation()
  useEffect(()=>{
    controls.start({
      opacity: 1,
      background: "linear-gradient(to top right, #66ccff 0%, #ffffff 25%)",
      transition: { duration: 0.8, ease: "easeInOut" },
    });

  },[])
  return (
    <Page HeadProps={{title:"Services"}}>
      <Section ref={ref}>
        <motion.div initial={{ opacity: 0 }}
        animate={controls}>
        <h1>Hi</h1>
        </motion.div>
     
      </Section>
    </Page>
  )
}
