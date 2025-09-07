"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

interface AboutTitleProps {
  onAnimationComplete: () => void;
}

const AboutTitle: React.FC<AboutTitleProps> = ({ onAnimationComplete }) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
          onAnimationComplete();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls, onAnimationComplete]);

  const letters = "Experience".split("");

  return (
    <div ref={ref} className="mb-24 relative z-10">
      <div className="relative flex justify-center">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block text-6xl md:text-8xl font-bold text-white"
            style={{
              textShadow: `
                0 0 5px #fff,
                0 0 10px #fff,
                0 0 15px #B19EEF,
                0 0 20px #B19EEF,
                0 0 25px #B19EEF,
                0 0 30px #B19EEF,
                0 0 35px #B19EEF
              `,
            }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 }
            }}
            initial="hidden"
            animate={controls}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{
              scale: 1.2,
              textShadow: `
                0 0 10px #fff,
                0 0 20px #fff,
                0 0 30px #ff00ff,
                0 0 40px #ff00ff,
                0 0 50px #ff00ff,
                0 0 60px #ff00ff,
                0 0 70px #ff00ff
              `,
              transition: { duration: 0.3 }
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>
      <motion.p 
        className="text-center mt-4 text-purple-200"
        initial={{ opacity: 1 }}
        animate={controls}
        transition={{ delay: 0.5, duration: 1 }}
      >
        My professional journey and technical expertise
      </motion.p>
    </div>
  );
};

export default AboutTitle;