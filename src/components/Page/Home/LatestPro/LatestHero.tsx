import React, { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRootContext } from "../../../../contexts/RootContext";

const LatestHero: React.FC = memo(() => {
  const [latestNews, setLatestNews] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { googleSheet_URl } = useRootContext();

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await fetch(`${googleSheet_URl}LatestData`);
        const data = await response.json();
        setLatestNews(data.data[0]);
      } catch (error) {
        console.error("Error fetching latest news:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatestNews();
  }, [googleSheet_URl]);

  if (isLoading) {
    return (
      <motion.div
        className="w-full h-full relative rounded-2xl overflow-hidden bg-gray-200"
        animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(90deg, #e5e7eb 0%, #f3f4f6 50%, #e5e7eb 100%)",
          backgroundSize: "200% 100%",
        }}
      />
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl md:p-2 p-6">
      {latestNews?.type === "vedio" ? (
        <video
          src={latestNews?.Value}
          className="w-full h-full object-cover object-center rounded-2xl"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <img
          src={latestNews?.Value}
          alt="Latest News"
          className="w-full h-full object-cover object-center"
        />
      )}

      {/* Overlay gradient glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 pointer-events-none mix-blend-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.2, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating blurred shape */}
      <motion.div
        className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"
        animate={{
          x: [0, 20, 0],
          y: [0, 20, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
});

LatestHero.displayName = "LatestHero";

export default LatestHero;
