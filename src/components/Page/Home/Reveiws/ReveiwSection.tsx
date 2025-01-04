import { motion } from "framer-motion";
import ReveiwData from "../../../../data/review_data";
import Section from "../../../../components/resuable/Section";
import ReveiwCard from "./ReveiwCard";

export default function ReveiwSection() {
  const cardVariants = {
    hidden: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100, // Move left or right based on direction
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <Section className="container py-4">
      {/* Review Section Header */}
      <h1 className="h3 pb-8">Reviews</h1>

      {/* Reviews */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 mt-10">
        {ReveiwData.map((reviewdata, index) => (
          <motion.div
            key={index}
            custom={index % 2 === 0 ? -1 : 1} // Pass direction as custom prop
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the card is visible
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
    </Section>
  );
}
