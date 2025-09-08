"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, 
  SiJavascript, SiNodedotjs, SiGit, SiFigma,
  SiHtml5, SiCss3, SiMysql, SiCanva,
  SiLaravel, SiPhp
} from "react-icons/si";

const technologies = [
  // Baris 1 (7 teknologi)
  { name: "HTML5", icon: <SiHtml5 size={28} />, color: "#E34F26" },
  { name: "CSS3", icon: <SiCss3 size={28} />, color: "#1572B6" },
  { name: "JavaScript", icon: <SiJavascript size={28} />, color: "#F7DF1E" },
  { name: "TypeScript", icon: <SiTypescript size={28} />, color: "#3178C6" },
  { name: "React", icon: <SiReact size={28} />, color: "#61DAFB" },
  { name: "Next.js", icon: <SiNextdotjs size={28} />, color: "#000000" },
  { name: "Node.js", icon: <SiNodedotjs size={28} />, color: "#339933" },
  
  // Baris 2 (7 teknologi)
  { name: "Tailwind CSS", icon: <SiTailwindcss size={28} />, color: "#06B6D4" },
  { name: "PHP", icon: <SiPhp size={28} />, color: "#777BB4" },
  { name: "Laravel", icon: <SiLaravel size={28} />, color: "#FF2D20" },
  { name: "MySQL", icon: <SiMysql size={28} />, color: "#4479A1" },
  { name: "Canva", icon: <SiCanva size={28} />, color: "#00C4CC" },
  { name: "Git", icon: <SiGit size={28} />, color: "#F05032" },
  { name: "Figma", icon: <SiFigma size={28} />, color: "#F24E1E" },
];

const TechnologiesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Animasi untuk fade in/out berdasarkan scroll position
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  return (
    <motion.div 
      ref={sectionRef}
      className="w-full max-w-6xl mt-24 p-8 rounded-3xl backdrop-blur-md bg-gradient-to-b from-purple-900/30 to-indigo-900/30 border border-purple-500/30 relative overflow-hidden"
      style={{
        opacity,
        scale,
        y,
        boxShadow: "0 0 25px rgba(177, 158, 239, 0.3)"
      }}
    >
      {/* Section title */}
      <h2 className="text-3xl font-bold mb-8 text-center text-white">
        Technologies <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">I Use</span>
      </h2>
      
      {/* Technologies grid - 7 kolom untuk desktop */}
      <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 justify-items-center">
        {technologies.map((tech, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group w-20 h-20 md:w-22 md:h-22" // Ukuran sedikit lebih kecil untuk muat 7 kolom
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 15px rgba(177, 158, 239, 0.5)",
              backgroundColor: "rgba(177, 158, 239, 0.1)"
            }}
          >
            <div 
              className="transition-colors duration-300 group-hover:scale-110 mb-1 flex justify-center items-center"
              style={{ color: tech.color }}
            >
              {tech.icon}
            </div>
            <span className="text-xs text-purple-200 text-center group-hover:text-white transition-colors leading-tight">
              {tech.name}
            </span>
          </motion.div>
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

export default TechnologiesSection;