import { motion } from "framer-motion";
import { useState} from "react";

const items = [
  { id: 1, content: "Item 1" },
  { id: 2, content: "Item 2" },
  { id: 3, content: "Item 3" },
  { id: 4, content: "Item 4" },
  { id: 5, content: "Item 5" },
];

export default function Carousel3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const radius = 200; // Radius of the carousel
  const angleStep = 360 / items.length; // Angle between each item

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="relative w-full h-[300px] flex items-center justify-center perspective">
      <div className="absolute flex items-center justify-center">
        {items.map((item, index) => {
          const angle = angleStep * (index - activeIndex);
          const x = radius * Math.sin((angle * Math.PI) / 180);
          const z = radius * Math.cos((angle * Math.PI) / 180);
          const scale = z > 0 ? 1 - z / (2 * radius) : 0.5;

          return (
            <motion.div
              key={item.id}
              style={{
                transform: `translateX(${x}px) translateZ(${z}px) scale(${scale})`,
                zIndex: z > 0 ? 1 : 0,
              }}
              className="absolute flex items-center justify-center w-32 h-32 bg-blue-500 text-white text-xl font-semibold shadow-lg rounded-lg"
            >
              {item.content}
            </motion.div>
          );
        })}
      </div>

      {/* Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white rounded-full p-2 shadow-md"
      >
        {"<"}
      </button>
      <button
        onClick={handleNext}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white rounded-full p-2 shadow-md"
      >
        {">"}
      </button>
    </div>
  );
}