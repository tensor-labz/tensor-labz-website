import { useMemo, useState, useEffect } from "react";
import { useDeviceContext } from "../../../../contexts/DeviceContext";
import { motion, useAnimation } from "framer-motion";
import ReveiwData from "../../../../data/review_data";
import ReveiwCard from "./ReveiwCard";
import { useInView } from "react-intersection-observer";

export default function HeroImageSlider() {
  const device = useDeviceContext();
//   const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [ref, inView] = useInView({ threshold: 0.3 });
  const controls = useAnimation();
  
  // Set the max items per slide (no more than 9)
  const [peritems, setPeritems] = useState<number>(
    Math.min(
      device === "lg" || device === "2xl" || device === "xl" ? 9 : device === "md" ? 6 : 3,
      9
    )
  );
  
  const reviews = useMemo(()=>ReveiwData.slice(0, peritems),[peritems]);

//   const slideCount = useMemo(() => Math.ceil(ReveiwData.length / peritems), [peritems]);

  // Adjust peritems based on the device screen
  useEffect(() => {
    setPeritems(
      device === "lg" || device === "2xl" || device === "xl" ? 9 : device === "md" ? 6 : 3
    );
  }, [device]);

//   // Update the displayed reviews when the current slide changes
//   useEffect(() => {
//     setReviews(ReveiwData.slice((currentSlide - 1) * peritems, currentSlide * peritems));
//   }, [currentSlide, peritems]);

  // Trigger animations when the section is in view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  // Function to go to the next slide
//   const goNext = () => {
//     if (currentSlide < slideCount) {
//       setCurrentSlide((prev) => prev + 1);  // Move to the next slide
//     } else {
//       setCurrentSlide(1);  // Reset to the first slide
//     }
//   };

//   // Auto slide every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       goNext();
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [currentSlide]);

  // Define variants for animations
  const cardVariants = {
    hidden: (direction: "right-top" | "left-top" | "right-bottom" | "left-bottom") => {
      const positions = {
        "right-top": { x: 100, y: -100, opacity: 0 },
        "left-top": { x: -100, y: -100, opacity: 0 },
        "right-bottom": { x: 100, y: 100, opacity: 0 },
        "left-bottom": { x: -100, y: 100, opacity: 0 },
      };
      return positions[direction];
    },

    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Assign animation directions dynamically
  const getAnimationDirection = (index: number) => {
    const directions = ["right-top", "left-top", "right-bottom", "left-bottom"];
    return directions[index % directions.length];
  };

  return (
    <div ref={ref}>
      <div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 mt-10">
          {reviews.map((reviewdata, index) => (
            <motion.div
              key={index}
              custom={getAnimationDirection(index)} // Pass direction as custom prop
              variants={cardVariants}
              initial="hidden"
              animate={controls}
            >
              <ReveiwCard
                name={reviewdata.name}
                social={reviewdata.social}
                rating={reviewdata.rating}
                profile={reviewdata.profile}
                reveiw={reviewdata.review}
                comment_at={reviewdata.comment_at}
                org={reviewdata.org}
              />
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
