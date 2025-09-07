"use client";

import React, { useState } from "react";
import { motion } from "framer-motion"; // Import motion yang diperlukan
import AboutTitle from "./AboutTitle";
import ExperienceTimeline from "./ExperienceTimeline";
import SkillsSection from "./SkillsSection";

const About: React.FC = () => {
  const [hasTitleAnimated, setHasTitleAnimated] = useState(false);

  const handleAnimationComplete = () => {
    setHasTitleAnimated(true);
  };

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-20 text-white overflow-hidden"
    >
      {/* Animated title - Terpisah dalam komponen sendiri */}
      <AboutTitle onAnimationComplete={handleAnimationComplete} />
      
      {/* Timeline pengalaman - Terpisah dalam komponen sendiri */}
      <ExperienceTimeline />
      
      {/* Skills section - Terpisah dalam komponen sendiri */}
      <SkillsSection />

      {/* Call to action */}
      <motion.div 
        className="mt-20 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      >
        <motion.button
          className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold relative overflow-hidden group"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 25px rgba(177, 158, 239, 0.7)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Download Resume</span>
          
          {/* Button glow effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100"
            initial={false}
            transition={{ duration: 0.3 }}
          />
          
          {/* Button animation */}
          <motion.div 
            className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
            initial={false}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ 
              duration: 1, 
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 0.5
            }}
          />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default About;