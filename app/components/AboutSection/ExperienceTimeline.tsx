"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const experiences = [
  {
    side: "left",
    place: "Team NXL",
    desc: "Management Team Lead (2020 - 2022)",
    logo: "/assets/nxl.png",
    details: "Managing the esports team while handling design, keeping the Instagram account active, and ensuring the team's participation in competitive events.",
    technologies: "Adobe Photoshop, Photopea, Canva, Alight Motion, CapCut, Kinemaster."
  },
  {
    side: "right",
    place: "HMIF FT UNTAN",
    desc: "Team Leader E-commerce (2025 - Present)",
    logo: "/assets/hmif.jpeg",
    details: "My duty as an E-commerce Team Leader is to lead and coordinate e-commerce team activities while also contributing to designing and maintaining the growth of Instagram and Lynk.id accounts to support online sales strategies.",
    technologies: "ClickUp, Canva, Photopea, Figma."
  },
  {
    side: "left",
    place: "Dinas Komunikasi dan Informatika",
    desc: "Web Developer (2025 - Present)",
    logo: "/assets/kominfo.png",
    details: "I developed a Web To-Do List application for Diskominfo to efficiently store data and track task progress.",
    technologies: "Laravel, MySQL, Figma, React, TypeScript, PHP, Tailwind CSS, Next.js, JavaScript."
  },
];

const ExperienceTimeline: React.FC = () => {
  const [activeExperience, setActiveExperience] = useState<number | null>(null);

  return (
    <div className="relative w-full max-w-6xl flex flex-col gap-32 mt-12">
      {/* Central timeline with glow */}
      <motion.div 
        className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-500 to-blue-500 z-0"
        initial={{ height: 0 }}
        whileInView={{ height: "100%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        style={{
          boxShadow: "0 0 10px #B19EEF, 0 0 20px #8A2BE2, 0 0 30px #4B0082"
        }}
      />
      
      {experiences.map((exp, index) => {
        const isLeft = exp.side === "left";
        const isActive = activeExperience === index;
        
        return (
          <motion.div
            key={index}
            className={`relative flex ${isLeft ? "justify-start" : "justify-end"} items-stretch z-10`}
            initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            onHoverStart={() => setActiveExperience(index)}
            onHoverEnd={() => setActiveExperience(null)}
          >
            {/* Content card */}
            <motion.div
              className={`w-full md:w-[45%] p-6 rounded-2xl shadow-lg backdrop-blur-md border border-transparent relative overflow-hidden group
                ${isActive ? "bg-gradient-to-r from-purple-900/40 to-indigo-900/40" : "bg-white/10"}`}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 0 20px rgba(177, 158, 239, 0.7)",
                borderColor: "#B19EEF"
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Hover glow effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100"
                initial={false}
                animate={{ opacity: isActive ? 0.2 : 0 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className={`flex items-start gap-4 ${isLeft ? "flex-row" : "flex-row-reverse"} z-10 relative`}>
                {/* Logo with glow effect */}
                <motion.div
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: "0 0 15px #B19EEF"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={exp.logo}
                    alt={exp.place}
                    width={60}
                    height={60}
                    className="object-contain rounded-md bg-white p-1"
                    style={{
                      boxShadow: "0 0 10px rgba(177, 158, 239, 0.5)"
                    }}
                  />
                </motion.div>
                
                {/* Text content */}
                <div className={`flex-1 ${isLeft ? "text-left" : "text-right"}`}>
                  <motion.h3 
                    className="text-xl font-bold mb-1 text-white"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.3 + 0.2 }}
                    viewport={{ once: true }}
                    style={{
                      textShadow: "0 0 5px rgba(255, 255, 255, 0.5)"
                    }}
                  >
                    {exp.place}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-purple-200 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.3 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    {exp.desc}
                  </motion.p>
                  
                  <motion.p 
                    className="text-sm text-purple-100 opacity-80"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.3 + 0.4 }}
                    viewport={{ once: true }}
                  >
                    {exp.details}
                  </motion.p>
                </div>
              </div>
              
              {/* Expandable detail section */}
              <motion.div 
                className="mt-4 overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: isActive ? "auto" : 0,
                  opacity: isActive ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="pt-2 border-t border-purple-500/30">
                  <p className="text-sm text-purple-200">
                    Technologies used: {exp.technologies}
                  </p>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Timeline node */}
            <motion.span 
              className="absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full z-20 flex items-center justify-center border-2 border-white"
              whileHover={{ 
                scale: 1.5,
                boxShadow: "0 0 15px #B19EEF, 0 0 30px #8A2BE2"
              }}
              transition={{ duration: 0.2 }}
              style={{
                boxShadow: isActive 
                  ? "0 0 10px #B19EEF, 0 0 20px #8A2BE2" 
                  : "0 0 5px rgba(177, 158, 239, 0.5)"
              }}
            >
              <motion.span 
                className="w-2 h-2 bg-white rounded-full"
                animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
              />
            </motion.span>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ExperienceTimeline;