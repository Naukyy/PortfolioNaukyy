'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLink {
  href: string;
  label: string;
}

interface GooeyNavProps {
  items: NavLink[];
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  initialActiveIndex?: number;
  animationTime?: number;
  timeVariance?: number;
  colors?: number[];
}

const GooeyNav: React.FC<GooeyNavProps> = ({ 
  items, 
  particleCount = 15, 
  particleDistances = [90, 10], 
  particleR = 100, 
  initialActiveIndex = 0, 
  animationTime = 600, 
  timeVariance = 300, 
  colors = [1, 2, 3, 1, 2, 3, 1, 4] 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);
  const [activeSection, setActiveSection] = useState('home');

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i: number, t: number, d: [number, number], r: number) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  };

  const makeParticles = (element: HTMLElement) => {
    const d: [number, number] = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);
    
    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove('active');
      
      setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.classList.add('particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        particle.style.setProperty('--color', '#92bbf4');
        particle.style.setProperty('--rotate', `${p.rotate}deg`);
        
        point.classList.add('point');
        particle.appendChild(point);
        element.appendChild(particle);
        
        requestAnimationFrame(() => {
          element.classList.add('active');
        });
        
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {}
        }, t);
      }, 30);
    }
  };

  const updateEffectPosition = (element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`
    };
    
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number, href: string) => {
    e.preventDefault();
    const liEl = e.currentTarget.parentElement as HTMLElement;
    if (activeIndex === index) return;
    
    setActiveIndex(index);
    setActiveSection(href.substring(1));
    updateEffectPosition(liEl);
    
    // Scroll to section
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
    
    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll('.particle');
      particles.forEach(p => filterRef.current!.removeChild(p));
    }
    
    if (textRef.current) {
      textRef.current.classList.remove('active');
      void textRef.current.offsetWidth;
      textRef.current.classList.add('active');
    }
    
    if (filterRef.current) {
      makeParticles(filterRef.current);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, index: number, href: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const liEl = e.currentTarget.parentElement;
      if (liEl) {
        handleClick({ currentTarget: liEl } as unknown as React.MouseEvent<HTMLAnchorElement>, index, href);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Deteksi section yang aktif
      const sections = items.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            setActiveIndex(items.findIndex(item => item.href.substring(1) === section));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    
    // Set active index based on active section
    const activeItemIndex = items.findIndex(item => item.href.substring(1) === activeSection);
    if (activeItemIndex !== -1 && activeItemIndex !== activeIndex) {
      setActiveIndex(activeItemIndex);
      
      const activeLi = navRef.current.querySelectorAll('li')[activeItemIndex] as HTMLElement;
      if (activeLi) {
        updateEffectPosition(activeLi);
        textRef.current?.classList.add('active');
      }
    }
    
    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex] as HTMLElement;
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi);
      }
    });
    
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeSection, items, activeIndex]);

  return (
    <>
      <style>
        {`
          :root {
            --linear-ease: linear(0, 0.068, 0.19 2.7%, 0.804 8.1%, 1.037, 1.199 13.2%, 1.245, 1.27 15.8%, 1.274, 1.272 17.4%, 1.249 19.1%, 0.996 28%, 0.949, 0.928 33.3%, 0.926, 0.933 36.8%, 1.001 45.6%, 1.013, 1.019 50.8%, 1.018 54.4%, 1 63.1%, 0.995 68%, 1.001 85%, 1);
          }
          
          .effect {
            position: absolute;
            opacity: 1;
            pointer-events: none;
            display: grid;
            place-items: center;
            z-index: 1;
          }
          
          .effect.text {
            color: black;
            transition: color 0.3s ease;
            font-weight: 500;
          }
          
          .effect.text.active {
            color: black;
          }
          
          .effect.filter {
            filter: blur(7px) contrast(100) blur(0);
            mix-blend-mode: lighten;
            background: transparent;
            overflow: visible !important;
          }
          
          .effect.filter::before {
            content: "";
            position: absolute;
            inset: -75px;
            z-index: -2;
            background: transparent;
          }
          
          .effect.filter::after {
            content: "";
            position: absolute;
            inset: 0;
            background: white;
            transform: scale(0);
            opacity: 0;
            z-index: -1;
            border-radius: 9999px;
          }
          
          .effect.active::after {
            animation: pill 0.3s ease both;
          }
          
          @keyframes pill {
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          
          .particle, .point {
            display: block;
            opacity: 0;
            width: 20px;
            height: 20px;
            border-radius: 9999px;
            transform-origin: center;
          }
          
          .particle {
            --time: 5s;
            position: absolute;
            top: calc(50% - 8px);
            left: calc(50% - 8px);
            animation: particle calc(var(--time)) ease 1 -350ms;
          }
          
          .point {
            background: var(--color, #92bbf4);
            opacity: 1;
            animation: point calc(var(--time)) ease 1 -350ms;
          }
          
          @keyframes particle {
            0% {
              transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
              opacity: 1;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            70% {
              transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
              opacity: 1;
            }
            100% {
              transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
              opacity: 1;
            }
          }
          
          @keyframes point {
            0% {
              transform: scale(0);
              opacity: 0;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            25% {
              transform: scale(calc(var(--scale) * 0.25));
            }
            38% {
              opacity: 1;
            }
            65% {
              transform: scale(var(--scale));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: scale(var(--scale));
              opacity: 1;
            }
            100% {
              transform: scale(0);
              opacity: 0;
            }
          }
          
          li.active {
            color: black;
            text-shadow: none;
          }
          
          li.active::after {
            opacity: 1;
            transform: scale(1);
          }
          
          li::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 8px;
            background: white;
            opacity: 0;
            transform: scale(0);
            transition: all 0.3s ease;
            z-index: -1;
          }

          .nav-item {
            position: relative;
            z-index: 2;
          }

          /* Fix untuk mencegah clipping */
          .gooey-container {
            position: relative;
            overflow: visible !important;
            height: auto;
            min-height: 60px;
            display: flex;
            align-items: center;
          }

          .gooey-nav {
            position: relative;
            overflow: visible !important;
            transform: none;
            height: auto;
          }

          .gooey-list {
            position: relative;
            overflow: visible !important;
            z-index: 100;
          }
        `}
      </style>
      
      <div className="gooey-container" ref={containerRef}>
        <nav className="gooey-nav">
          <ul 
            ref={navRef} 
            className="gooey-list flex gap-8 list-none p-0 px-4 m-0" 
            style={{ color: 'white', textShadow: '0 1px 1px hsl(205deg 30% 10% / 0.2)' }}
          >
            {items.map((item, index) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <li 
                  key={index} 
                  className={`nav-item rounded-full relative cursor-pointer transition-[background-color_color_box-shadow] duration-300 ease shadow-[0_0_0.5px_1.5px_transparent] text-white ${
                    isActive ? 'active' : ''
                  }`}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleClick(e, index, item.href)}
                    onKeyDown={(e) => handleKeyDown(e, index, item.href)}
                    className="outline-none py-[0.6em] px-[1em] inline-block"
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <span className="effect filter" ref={filterRef} />
        <span className="effect text" ref={textRef} />
      </div>
    </>
  );
};

const Navbar: React.FC<GooeyNavProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Cek jika sudah scroll lebih dari 10px
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 70 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        hasScrolled ? 'backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
      style={{ height: '80px', minHeight: '80px', overflow: 'visible' }}
    >
      <div className="container mx-auto px-6 py-4 flex justify-center items-center h-full">
        {/* Desktop Navigation with Gooey Effect */}
        <div className="hidden md:block relative z-50 h-full flex items-center">
          <GooeyNav {...props} />
        </div>
        
        {/* Mobile Navigation Button */}
        <div className="md:hidden absolute right-6 z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col space-y-1.5 focus:outline-none"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-slate-900/95 backdrop-blur-md overflow-hidden fixed top-16 left-0 w-full z-40"
          >
            <ul className="flex flex-col items-center py-6 space-y-6">
              {props.items.map((link) => {
                const isActive = window.location.hash === link.href;
                return (
                  <motion.li
                    key={link.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        const targetId = link.href.substring(1);
                        const targetElement = document.getElementById(targetId);
                        if (targetElement) {
                          window.scrollTo({
                            top: targetElement.offsetTop,
                            behavior: 'smooth'
                          });
                          setIsOpen(false);
                        }
                      }}
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