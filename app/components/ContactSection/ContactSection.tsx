import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import TextType from '../TextType/TextType';
import { 
  SiLinkedin, SiGithub, SiInstagram, SiGmail, SiX 
} from "react-icons/si";

// Define types for the component props
interface ContactSectionProps {
  // You can add props here if needed
}

const ContactSection: React.FC<ContactSectionProps> = () => {
  // Refs for GSAP animations
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Framer Motion inView hooks for scroll animations
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const formInView = useInView(formRef, { once: true, margin: "-100px" });
  const cardInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  const titleControls = useAnimation();
  const formControls = useAnimation();
  const cardControls = useAnimation();
  
  // Handle scroll animations
  useEffect(() => {
    if (titleInView) {
      titleControls.start("visible");
    }
  }, [titleInView, titleControls]);
  
  useEffect(() => {
    if (formInView) {
      formControls.start("visible");
    }
  }, [formInView, formControls]);
  
  useEffect(() => {
    if (cardInView) {
      cardControls.start("visible");
    }
  }, [cardInView, cardControls]);
  
  // GSAP effect for neon title animation
  useEffect(() => {
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        textShadow: "0 0 5px #8B5CF6, 0 0 10px #8B5CF6, 0 0 15px #8B5CF6, 0 0 20px #3B82F6, 0 0 35px #3B82F6, 0 0 40px #3B82F6",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, []);
  
  // Social media data with proper icons and brand colors
  const socialMedia = [
    { 
      name: 'LinkedIn', 
      icon: <SiLinkedin />, 
      url: 'https://linkedin.com',
      color: '#0077B5'
    },
    { 
      name: 'GitHub', 
      icon: <SiGithub />, 
      url: 'https://github.com',
      color: '#ffffff'
    },
    { 
      name: 'Instagram', 
      icon: <SiInstagram />, 
      url: 'https://instagram.com',
      color: '#E4405F'
    },
    { 
      name: 'Email', 
      icon: <SiGmail />, 
      url: 'mailto:example@email.com',
      color: '#EA4335'
    },
    { 
      name: 'X (Twitter)', 
      icon: <SiX />, 
      url: 'https://x.com',
      color: '#000000'
    },
  ];
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  };
  
  return (
    <section id="contact" className="min-h-screen text-white py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto max-w-6xl">
        {/* Title with neon glow animation */}
        <motion.h2 
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-center mb-16 font-orbitron"
          initial="hidden"
          animate={titleControls}
          variants={{
            hidden: { opacity: 0, y: -50 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.8, ease: "easeOut" }
            }
          }}
          style={{ 
            color: '#B19EEF',
            textShadow: '0 0 5px #8B5CF6, 0 0 10px #8B5CF6, 0 0 15px #8B5CF6, 0 0 20px #3B82F6, 0 0 35px #3B82F6, 0 0 40px #3B82F6'
          }}
        >
        <TextType 
            text={["Text typing effect", "for your websites", "Happy coding!"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            />
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
            initial="hidden"
            animate={formControls}
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.8, ease: "easeOut" }
              }
            }}
          >
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-[#B19EEF]">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 bg-transparent border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                style={{
                  borderColor: '#8B5CF6',
                  boxShadow: '0 0 5px rgba(139, 92, 246, 0.5)',
                  color: 'white'
                }}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#B19EEF]">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-transparent border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                style={{
                  borderColor: '#8B5CF6',
                  boxShadow: '0 0 5px rgba(139, 92, 246, 0.5)',
                  color: 'white'
                }}
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-[#B19EEF]">
                Pesan
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 bg-transparent border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                style={{
                  borderColor: '#8B5CF6',
                  boxShadow: '0 0 5px rgba(139, 92, 246, 0.5)',
                  color: 'white'
                }}
              ></textarea>
            </div>
            
            <motion.button
              type="submit"
              className="w-full py-3 px-6 rounded-full font-bold text-white border transition-all duration-300 relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 15px rgba(59, 130, 246, 0.8)"
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                borderColor: '#3B82F6',
                boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
              }}
            >
              <span className="relative z-10">Kirim Pesan</span>
              <motion.div 
                className="absolute inset-0 z-0 rounded-full"
                initial={{ background: 'transparent' }}
                whileHover={{ 
                  background: 'linear-gradient(90deg, #8B5CF6, #3B82F6)',
                  transition: { duration: 0.3 }
                }}
              />
            </motion.button>
          </motion.form>
          
          {/* Profile Card */}
          <motion.div 
            ref={cardRef}
            className="relative p-8 rounded-xl"
            initial="hidden"
            animate={cardControls}
            variants={{
              hidden: { opacity: 0, x: 100 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.8, ease: "easeOut" }
              }
            }}
            style={{
              background: 'rgba(25, 25, 35, 0.5)',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
            }}
          >
            {/* Animated border */}
            <div className="absolute inset-0 rounded-xl p-[1px] z-0"
                 style={{
                   background: 'linear-gradient(45deg, #8B5CF6, #3B82F6, #B19EEF)',
                   mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                   maskComposite: 'exclude',
                   WebkitMaskComposite: 'xor',
                 }} />
            
            <div className="flex flex-col items-center text-center relative z-10">
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4"
                     style={{ borderColor: '#8B5CF6', boxShadow: '0 0 15px rgba(139, 92, 246, 0.7)' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Status Badge */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                     style={{ 
                       backgroundColor: '#8B5CF6', 
                       color: 'white',
                       boxShadow: '0 0 10px rgba(139, 92, 246, 0.7)'
                     }}>
                  Tersedia untuk bekerja
                </div>
              </div>
              
              {/* Description */}
              <p className="text-gray-300 mb-8 leading-relaxed">
                Inbox saya selalu terbuka. Baik Anda punya proyek atau hanya ingin menyapa, jangan ragu untuk menghubungi saya!
              </p>
              
              {/* Social Media Icons */}
              <div className="flex justify-center space-x-4">
                {socialMedia.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300"
                    whileHover={{ 
                      scale: 1.2,
                      boxShadow: `0 0 15px ${social.color}80`,
                      y: -5
                    }}
                    style={{
                      backgroundColor: 'rgba(25, 25, 35, 0.7)',
                      border: '1px solid #8B5CF6',
                      boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)',
                      color: social.color
                    }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;