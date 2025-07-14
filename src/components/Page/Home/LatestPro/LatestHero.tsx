import React,{memo, useEffect} from "react";
import { motion } from "framer-motion";
import { useRootContext } from "../../../../contexts/RootContext";
const LatestHero: React.FC = memo(() => {
      const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
    };
    const [latesnews, setLatestNews] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const {googleSheet_URl} = useRootContext();
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
        }
        fetchLatestNews();
    }, []);
    if (isLoading) {
        return (
    <motion.div
      className="relative w-full lg:w-2/5 h-48 rounded-xl overflow-hidden bg-gray-200"
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
  <div className='w-full h-full p-8'>
            { latesnews?.type==='vedio'?<video
                src={latesnews?.Value}
                className="object-cover object-center w-full rounded-md h-[400px] lg:h-[600px]"
                autoPlay
                muted
                loop
                playsInline
            />:<img
                    src={latesnews?.Value}
                     className="object-cover object-center w-full rounded-md h-[400px] lg:h-[500px]"
                />
            }
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
    )
})

LatestHero.displayName = "LatestHero";
export default LatestHero;