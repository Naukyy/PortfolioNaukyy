'use client'; 
import React, { useState, useEffect } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion'; 

interface NavLink { 
  href: string; 
  label: string; 
} 

const Navbar: React.FC = () => { 
  const [isOpen, setIsOpen] = useState(false); 
  const [hasScrolled, setHasScrolled] = useState(false); 
  const [activeSection, setActiveSection] = useState('home');
  
  const navLinks: NavLink[] = [ 
    { href: '#home', label: 'Home' }, 
    { href: '#about', label: 'About' }, 
    { href: '#projects', label: 'Projects' }, 
    { href: '#certificates', label: 'Certificates' }, 
    { href: '#contact', label: 'Contact' }, 
  ]; 

  useEffect(() => { 
    const handleScroll = () => {
      // Cek jika sudah scroll lebih dari 10px
      setHasScrolled(window.scrollY > 10);
      
      // Deteksi section yang aktif
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll); 
    return () => window.removeEventListener('scroll', handleScroll); 
  }, []); 

  // Fungsi untuk smooth scroll
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
      
      // Untuk mobile, tutup menu setelah klik
      if (isOpen) {
        setIsOpen(false);
      }
    }
  };

  return ( 
    <motion.nav 
      initial={{ y: -80, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ type: 'spring', stiffness: 70 }} 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        hasScrolled ? 'bg-slate-900/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`} 
    > 
      <div className="container mx-auto px-6 py-4 flex justify-center items-center"> 
        <div className="flex items-center space-x-10"> 
          {navLinks.map((link) => { 
            const isActive = activeSection === link.href.substring(1);
            return (
              <motion.a 
                key={link.label} 
                href={link.href} 
                onClick={(e) => handleSmoothScroll(e, link.href)}
                whileHover={{ scale: 1.2, color: '#B19EEF' }} 
                whileTap={{ scale: 0.9 }} 
                transition={{ type: 'spring', stiffness: 300 }} 
                className={`relative text-lg font-medium ${
                  isActive ? 'text-white-400' : 'text-slate-200'
                } group`} 
              > 
                {link.label} 
                {isActive && (
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-400"
                    layoutId="activeSection"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            );
          })} 
        </div> 
        <div className="md:hidden absolute right-6"> 
          <button onClick={() => setIsOpen(!isOpen)} className="flex flex-col space-y-1.5 focus:outline-none" > 
            <motion.span animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="block w-6 h-0.5 bg-slate-200" /> 
            <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-6 h-0.5 bg-slate-200" /> 
            <motion.span animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="block w-6 h-0.5 bg-slate-200" /> 
          </button> 
        </div> 
      </div> 
      <AnimatePresence> 
        {isOpen && ( 
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            transition={{ duration: 0.4 }} 
            className="md:hidden bg-slate-900/95 backdrop-blur-md overflow-hidden" 
          > 
            <ul className="flex flex-col items-center py-6 space-y-6"> 
              {navLinks.map((link) => { 
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.li key={link.label} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} > 
                    <a 
                      href={link.href} 
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className={`text-lg ${
                        isActive ? 'text-purple-400' : 'text-slate-200'
                      } hover:text-purple-400 transition-colors`} 
                    > 
                      {link.label} 
                    </a> 
                  </motion.li>
                );
              })} 
            </ul> 
          </motion.div> 
        )} 
      </AnimatePresence> 
    </motion.nav> 
  ); 
}; 

export default Navbar;