"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const skills = [
  { name: "Troubleshooting", level: 90 },
  { name: "Network Setup", level: 85 },
  { name: "Security Systems", level: 80 },
  { name: "Audio Visual", level: 75 },
  { name: "Hardware Repair", level: 95 },
  { name: "Software Installation", level: 85 },
];

const SkillBar = ({ name, level }: { name: string; level: number }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  
  useEffect(() => {
    if (isInView) {
      controls.start({
        width: `${level}%`,
        transition: { duration: 1.5, ease: "easeOut" }
      });
    }
  }, [isInView, controls, level]);
  
  return (
    <div className="mb-4" ref={ref}>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-white">{name}</span>
        <span className="text-sm font-medium text-white">{level}%</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full relative"
          initial={{ width: 0 }}
          animate={controls}
          style={{
            background: "linear-gradient(90deg, #B19EEF, #8A2BE2)",
            boxShadow: "0 0 10px #B19EEF, 0 0 20px #8A2BE2"
          }}
          whileHover={{
            scaleY: 1.5,
            transition: { duration: 0.2 }
          }}
        >
          <motion.div 
            className="absolute inset-0 bg-white opacity-30"
            animate={{
              x: ["0%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{ width: "20%" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

const SkillsSection: React.FC = () => {
  return (
    <motion.div 
      className="w-full max-w-4xl mt-40 p-8 rounded-3xl backdrop-blur-md bg-gradient-to-b from-purple-900/30 to-indigo-900/30 border border-purple-500/30 relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      style={{
        boxShadow: "0 0 25px rgba(177, 158, 239, 0.3)"
      }}
    >
      {/* Section title */}
      <h2 className="text-3xl font-bold mb-8 text-center text-white">
        Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Skills</span>
      </h2>
      
      {/* Skills grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill, index) => (
          <SkillBar key={index} name={skill.name} level={skill.level} />
        ))}
      </div>
      
      {/* Floating elements */}
      <motion.div 
        className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-purple-500/20 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
      <motion.div 
        className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-blue-500/20 blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          delay: 1,
        }}
      />
    </motion.div>
  );
};

export default SkillsSection;