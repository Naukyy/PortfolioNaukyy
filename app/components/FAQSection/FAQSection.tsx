import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextType from '../TextType/TextType';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [titleInView, setTitleInView] = useState(false);

  useEffect(() => {
    // Trigger animasi judul setelah component mount
    setTitleInView(true);
  }, []);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "Do you work with clients internationally?",
      answer: "Yes, we work with clients from all around the world. Our remote collaboration process is optimized for international projects with different time zones, and we use various tools to ensure smooth communication throughout the project."
    },
    {
      id: 2,
      question: "What technologies do I master?",
      answer: "We specialize in modern web technologies including React, TypeScript, Next.js, Node.js, and various CSS frameworks. We also have experience with backend technologies, databases, and cloud platforms like AWS and Vercel."
    },
    {
      id: 3,
      question: "What services do you offer?",
      answer: "We offer a wide range of services including web development, UI/UX design, mobile app development, e-commerce solutions, API integration, and ongoing maintenance and support for digital products."
    },
    {
      id: 4,
      question: "How long does a typical project take?",
      answer: "The timeline depends on the project scope and complexity. Simple websites typically take 2-4 weeks, medium projects 4-8 weeks, and larger applications 8+ weeks. We provide a detailed timeline after our initial consultation."
    },
    {
      id: 5,
      question: "What is your pricing model?",
      answer: "We offer both fixed-price and hourly-rate models depending on project requirements. Fixed-price works best for well-defined projects, while hourly rates are better for projects that may evolve during development."
    },
    {
      id: 6,
      question: "Do you provide ongoing support?",
      answer: "Yes, we offer various support packages after project completion. These include bug fixes, feature updates, performance optimization, and regular maintenance to keep your digital product running smoothly."
    }
  ];

  const toggleQuestion = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="min-h-screen p-8">
      {/* Judul dengan animasi masuk di pojok kiri */}
      <motion.h2 
        initial={{ opacity: 0, x: -100 }}
        animate={titleInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl font-bold mb-12 text-white neon-title"
      >
        <TextType 
        text={["Frequently Asked Questions", "Any Question?", "FAQS Page", "We Got Answer!"]}
        typingSpeed={75}
        pauseDuration={1500}
        showCursor={true}
        cursorCharacter="|"
        />
      </motion.h2>
      
      <div className="space-y-0 w-full">
        {faqData.map((item, index) => (
          <motion.div 
            key={item.id}
            className="relative w-full"
          >
            {/* Garis pembatas ungu gelap neon */}
            <div className={`absolute left-0 right-0 h-px bg-purple-900 neon-glow ${index === 0 ? 'top-0' : 'top-0'}`} />
            
            <motion.div 
              className="flex justify-between items-center py-6 cursor-pointer w-full"
              onClick={() => toggleQuestion(item.id)}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-medium text-purple-200 pl-2">{item.question}</h3>
              <motion.div
                animate={{ rotate: activeId === item.id ? 45 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-3xl font-light text-purple-400 pr-4"
              >
                {activeId === item.id ? '✕' : '+'}
              </motion.div>
            </motion.div>
            
            <AnimatePresence>
              {activeId === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: 'auto', 
                    opacity: 1,
                    transition: {
                      height: { duration: 0.3 },
                      opacity: { duration: 0.4, delay: 0.1 }
                    }
                  }}
                  exit={{ 
                    height: 0, 
                    opacity: 0,
                    transition: {
                      height: { duration: 0.3 },
                      opacity: { duration: 0.2 }
                    }
                  }}
                  className="overflow-hidden w-full"
                >
                  <div className="pb-6 text-purple-300 pl-2 pr-4">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Garis pembatas bawah untuk item terakhir */}
            {index === faqData.length - 1 && (
              <div className="absolute left-0 right-0 bottom-0 h-px bg-purple-900 neon-glow" />
            )}
          </motion.div>
        ))}
      </div>
      
      <style jsx>{`
        .neon-title {
          text-shadow: 0 0 5px rgba(192, 132, 252, 0.7),
                       0 0 10px rgba(192, 132, 252, 0.5),
                       0 0 15px rgba(192, 132, 252, 0.3),
                       0 0 20px rgba(192, 132, 252, 0.1);
        }
        
        .neon-glow {
          box-shadow: 0 0 3px rgba(192, 132, 252, 0.7),
                      0 0 5px rgba(192, 132, 252, 0.5);
        }
      `}</style>
    </div>
  );
};

export default FAQSection;