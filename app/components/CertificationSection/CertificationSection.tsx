'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  description?: string;
  credentialUrl?: string;
}

export interface Badge {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  achievementDate: string;
}

interface CertificatesSectionProps {
  certificates: Certificate[];
  badges: Badge[];
}

// Konstanta dari MagicBento
const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '168, 85, 247';
const MOBILE_BREAKPOINT = 768;

// Komponen TextType untuk animasi judul
interface TextTypeProps {
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string | React.ReactNode;
  cursorBlinkDuration?: number;
  cursorClassName?: string;
  text: string | string[];
  as?: React.ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
}

const TextType: React.FC<TextTypeProps & React.HTMLAttributes<HTMLElement>> = ({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  const textArray = React.useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return '#ffffff';
    return textColors[currentTextIndex % textColors.length];
  };

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (!isVisible) return;

    let timeout: NodeJS.Timeout;

    const currentText = textArray[currentTextIndex];
    const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText;

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === '') {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) {
            return;
          }

          if (onSentenceComplete) {
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
          }

          setCurrentTextIndex(prev => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
          timeout = setTimeout(() => {}, pauseDuration);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText(prev => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < processedText.length) {
          timeout = setTimeout(
            () => {
              setDisplayedText(prev => prev + processedText[currentCharIndex]);
              setCurrentCharIndex(prev => prev + 1);
            },
            variableSpeed ? getRandomSpeed() : typingSpeed
          );
        } else if (textArray.length > 1) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => clearTimeout(timeout);
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete,
    getRandomSpeed
  ]);

  const shouldHideCursor =
    hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

  return React.createElement(
    Component,
    {
      ref: containerRef,
      className: `inline-block whitespace-pre-wrap tracking-tight ${className}`,
      ...props
    },
    <span className="inline" style={{ color: getCurrentTextColor() }}>
      {displayedText}
    </span>,
    showCursor && (
      <span
        ref={cursorRef}
        className={`ml-1 inline-block opacity-100 ${shouldHideCursor ? 'hidden' : ''} ${cursorClassName}`}
      >
        {cursorCharacter}
      </span>
    )
  );
};

// Fungsi-fungsi dari MagicBento
const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

// Komponen ParticleCard dari MagicBento
const ParticleCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  onClick?: () => void;
}> = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
  onClick,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (onClick) {
        onClick();
      }

      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        }
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor, onClick]);

  return (
    <div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
      {...props}
    >
      {children}
    </div>
  );
};

// Komponen GlobalSpotlight dari MagicBento
const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}> = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR
}) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest('.certificates-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      isInsideSection.current = mouseInside || false;
      const cards = gridRef.current.querySelectorAll('.certificate-card, .badge-item');

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        cards.forEach(card => {
          (card as HTMLElement).style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach(card => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll('.certificate-card, .badge-item').forEach(card => {
        (card as HTMLElement).style.setProperty('--glow-intensity', '0');
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

// Komponen utama CertificatesSection
const CertificatesSection: React.FC<CertificatesSectionProps> = ({ certificates, badges }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>(certificates);
  const modalRef = useRef<HTMLDivElement>(null);
  const badgeModalRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Kategorisasi sertifikat
  const categorizeCertificates = (certs: Certificate[]) => {
    const categories = {
      'Front End': [] as Certificate[],
      'Back End': [] as Certificate[],
      'Artificial Intelligence': [] as Certificate[],
      'Other': [] as Certificate[]
    };

    certs.forEach(cert => {
      const title = cert.title.toLowerCase();
      const issuer = cert.issuer.toLowerCase();

      if (
        title.includes('front end') ||
        title.includes('javascript') ||
        title.includes('responsive web design') ||
        title.includes('html') ||
        title.includes('css') ||
        issuer.includes('freecodecamp')
      ) {
        categories['Front End'].push(cert);
      } else if (
        title.includes('back end') ||
        title.includes('sql') ||
        title.includes('database') ||
        title.includes('node') ||
        title.includes('express') ||
        title.includes('django') ||
        title.includes('laravel') ||
        title.includes('php') ||
        title.includes('spring') ||
        cert.title.toLowerCase() === 'programming fundamentals for software development'
      ) {
        categories['Back End'].push(cert);
      } else if (
        title.includes('ai') ||
        title.includes('artificial intelligence') ||
        title.includes('generative') ||
        title.includes('granite') ||
        title.includes('prompting') ||
        title.includes('machine learning') ||
        title.includes('deep learning') ||
        cert.title.toLowerCase() === 'code generations and optimization'
      ) {
        categories['Artificial Intelligence'].push(cert);
      } else {
        categories['Other'].push(cert);
      }
    });

    return categories;
  };

  const categorizedCertificates = categorizeCertificates(filteredCertificates);
  
  // Refs untuk animasi judul
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const titleControls = useAnimation();
  
  // Handle scroll animations untuk judul
  useEffect(() => {
    if (titleInView) {
      titleControls.start("visible");
    }
  }, [titleInView, titleControls]);
  
  // GSAP effect untuk neon title animation
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

  // Filter certificates based on search term
  useEffect(() => {
    const filtered = certificates.filter(cert =>
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCertificates(filtered);
  }, [searchTerm, certificates]);

  // Handle certificate click
  const handleCertificateClick = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
  };

  // Handle badge click
  const handleBadgeClick = (badge: Badge) => {
    setSelectedBadge(badge);
  };

  // Close modals
  const closeModal = () => {
    setSelectedCertificate(null);
  };

  const closeBadgeModal = () => {
    setSelectedBadge(null);
  };

  // Animation for modal appearance
  useEffect(() => {
    if (selectedCertificate && modalRef.current) {
      gsap.fromTo(modalRef.current, 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3 }
      );
    }
  }, [selectedCertificate]);

  useEffect(() => {
    if (selectedBadge && badgeModalRef.current) {
      gsap.fromTo(badgeModalRef.current, 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3 }
      );
    }
  }, [selectedBadge]);

  return (
    <section className="certificates-section py-12 px-4 min-h-screen relative">
      <style>
        {`
          .certificates-section {
            --neon-primary: #a855f7;
            --neon-secondary: #ec4899;
            --neon-accent: #06b6d4;
            --glow-color: 168, 85, 247;
            --background-dark: #060010;
            --border-color: #392e4e;
            --white: hsl(0, 0%, 100%);
            --purple-primary: rgba(168, 85, 247, 1);
            --purple-glow: rgba(168, 85, 247, 0.2);
            --purple-border: rgba(168, 85, 247, 0.8);
          }
          
          .certificate-card, .badge-item {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 200px;
          }
          
          .certificate-card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 2px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(var(--glow-color), calc(var(--glow-intensity) * 0.8)) 0%,
                rgba(var(--glow-color), calc(var(--glow-intensity) * 0.4)) 30%,
                transparent 60%);
            border-radius: inherit;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: subtract;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 1;
          }
          
          .certificate-card--border-glow:hover::after {
            opacity: 1;
          }
          
          .badge-border {
            border: 1px solid rgba(var(--glow-color), 0.3);
            border-radius: 0.5rem;
          }
          
          .badge-border:hover {
            border: 1px solid rgba(var(--glow-color), 0.8);
            box-shadow: 0 0 10px rgba(var(--glow-color), 0.5),
              0 0 15px rgba(var(--glow-color), 0.3),
              inset 0 0 5px rgba(var(--glow-color), 0.2);
          }
          
          .neon-text {
            color: #fff;
            text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px var(--neon-primary),
              0 0 20px var(--neon-primary), 0 0 25px var(--neon-primary);
          }
          
          .search-input {
            background: rgba(6, 0, 16, 0.8);
            border: 1px solid rgba(var(--glow-color), 0.5);
            color: white;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            width: 100%;
            max-width: 300px;
          }
          
          .search-input:focus {
            outline: none;
            box-shadow: 0 0 10px rgba(var(--glow-color), 0.5),
              inset 0 0 5px rgba(var(--glow-color), 0.3);
          }
          
          .search-input::placeholder {
            color: rgba(255, 255, 255, 0.6);
          }
          
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }
          
          .certificate-modal {
            background: var(--background-dark);
            border: 2px solid rgba(var(--glow-color), 0.8);
            border-radius: 1rem;
            padding: 2rem;
            max-width: 90vw;
            max-height: 90vh;
            overflow: auto;
            position: relative;
            box-shadow: 0 0 20px rgba(var(--glow-color), 0.5),
              inset 0 0 10px rgba(var(--glow-color), 0.2);
          }
          
          .badge-modal {
            background: var(--background-dark);
            border: 2px solid rgba(var(--glow-color), 0.8);
            border-radius: 1rem;
            padding: 1.5rem;
            max-width: 500px;
            max-height: 90vh;
            overflow: auto;
            position: relative;
            box-shadow: 0 0 20px rgba(var(--glow-color), 0.5),
              inset 0 0 10px rgba(var(--glow-color), 0.2);
          }
          
          .close-btn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: transparent;
            border: 1px solid rgba(var(--glow-color), 0.5);
            color: white;
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .close-btn:hover {
            background: rgba(var(--glow-color), 0.2);
            border-color: rgba(var(--glow-color), 0.8);
            box-shadow: 0 0 10px rgba(var(--glow-color), 0.5);
          }
          
          .view-btn {
            background: rgba(var(--glow-color), 0.2);
            border: 1px solid rgba(var(--glow-color), 1);
            color: black;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .view-btn:hover {
            background: rgba(var(--glow-color), 0.4);
            border-color: rgba(var(--glow-color), 4);
            box-shadow: 0 0 10px rgba(var(--glow-color), 1);
          }
          
          .details-btn {
            background: transparent;
            border: 1px solid rgba(var(--glow-color), 0.5);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            margin-top: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .details-btn:hover {
            background: rgba(var(--glow-color), 0.2);
            border-color: rgba(var(--glow-color), 0.8);
            box-shadow: 0 0 10px rgba(var(--glow-color), 0.5);
          }
          
          .certificate-image {
            max-width: 100%;
            max-height: 60vh;
            border-radius: 0.5rem;
          }
          
          .badge-image {
            width: 100px;
            height: 100px;
            object-fit: contain;
          }
          
          .particle::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: rgba(var(--glow-color), 0.2);
            border-radius: 50%;
            z-index: -1;
          }
          
          .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            flex-wrap: wrap;
          }
          
          .search-container {
            display: flex;
            justify-content: flex-end;
            width: 100%;
            margin-top: 1rem;
          }
          
          .certificate-grid {
            min-height: 300px;
          }
          
          @media (max-width: 768px) {
            .certificate-grid {
              grid-template-columns: repeat(2, 1fr);
            }
            
            .badges-grid {
              grid-template-columns: repeat(3, 1fr);
            }
            
            .section-header {
              flex-direction: column;
              align-items: flex-start;
              gap: 1rem;
            }
            
            .search-input {
              max-width: 100%;
            }
            
            .search-container {
              justify-content: flex-start;
            }
          }
          
          @media (max-width: 480px) {
            .certificate-grid {
              grid-template-columns: 1fr;
            }
            
            .badges-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
        `}
      </style>

      {/* Global Spotlight */}
      <GlobalSpotlight
        gridRef={gridRef}
        enabled={true}
        spotlightRadius={DEFAULT_SPOTLIGHT_RADIUS}
        glowColor={DEFAULT_GLOW_COLOR}
      />

      {/* Header dengan judul dan search */}
      <motion.div 
        ref={titleRef}
        className="text-center mb-16"
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
          text={["My Certificates", "Achievements", "Credentials"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
          className="text-4xl md:text-5xl font-bold text-center font-orbitron"
        />
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Cari sertifikat..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Categorized Certificates Sections */}
      {Object.entries(categorizedCertificates).map(([category, certs]) => (
        <div key={category} className="mb-16">
          <div className="text-center mb-8">
            <TextType
              text={[category, `${category} Certificates`, `${category} Skills`]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              className="text-2xl md:text-3xl font-bold"
            />
          </div>

          <div className="certificate-grid grid grid-cols-4 gap-4" ref={category === 'Front End' ? gridRef : null}>
            {certs.length > 0 ? (
              certs.map((cert) => (
                <ParticleCard
                  key={`cert-${cert.id}`}
                  className="certificate-card certificate-card--border-glow rounded-lg overflow-hidden relative group"
                  particleCount={DEFAULT_PARTICLE_COUNT}
                  glowColor={DEFAULT_GLOW_COLOR}
                  enableTilt={true}
                  clickEffect={true}
                  enableMagnetism={true}
                >
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="text-white font-semibold text-sm truncate">{cert.title}</h3>
                    <p className="text-gray-400 text-xs">{cert.issuer}</p>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      className="view-btn"
                      onClick={() => handleCertificateClick(cert)}
                    >
                      View
                    </button>
                  </div>
                </ParticleCard>
              ))
            ) : (
              <div className="col-span-4 text-center py-8">
                <p className="text-white text-lg">
                  No {category.toLowerCase()} certificates found{searchTerm ? ` for "${searchTerm}"` : ''}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Badges Section - Tetap di posisinya meski tidak ada hasil pencarian */}
      <div className="mt-12">
        <div className="text-center items-center mb-6">
          <TextType 
            text={["Achievement Badges", "My Badges", "Recognition"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            className="text-3xl font-bold"
          />
        </div>
        
        <div className="badges-grid grid grid-cols-6 gap-4">
          {badges.map((badge) => (
            <ParticleCard
              key={`badge-${badge.id}`}
              className="badge-item p-4 flex flex-col items-center transition-all duration-300 ease-in-out badge-border"
              particleCount={8}
              glowColor={DEFAULT_GLOW_COLOR}
              enableTilt={true}
              clickEffect={true}
              enableMagnetism={true}
              onClick={() => handleBadgeClick(badge)}
            >
              <img 
                src={badge.imageUrl} 
                alt={badge.title}
                className="badge-image mb-2"
              />
              <p className="text-white text-xs text-center truncate w-full">{badge.title}</p>
            </ParticleCard>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div className="modal-overlay" onClick={closeModal}>
          <div 
            className="certificate-modal" 
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={closeModal}>×</button>
            <img 
              src={selectedCertificate.imageUrl} 
              alt={selectedCertificate.title}
              className="certificate-image mb-4"
            />
            <h2 className="text-xl font-bold text-white mb-2">{selectedCertificate.title}</h2>
            <p className="text-gray-300 mb-2">Issued by: {selectedCertificate.issuer}</p>
            <p className="text-gray-400 mb-4">Date: {selectedCertificate.date}</p>
            {selectedCertificate.description && (
              <p className="text-gray-300 mb-4">{selectedCertificate.description}</p>
            )}
            {selectedCertificate.credentialUrl && (
              <a 
                href={selectedCertificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="details-btn inline-block"
              >
                View Details
              </a>
            )}
          </div>
        </div>
      )}

      {/* Badge Modal */}
      {selectedBadge && (
        <div className="modal-overlay" onClick={closeBadgeModal}>
          <div 
            className="badge-modal" 
            ref={badgeModalRef}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={closeBadgeModal}>×</button>
            <div className="flex flex-col items-center">
              <img 
                src={selectedBadge.imageUrl} 
                alt={selectedBadge.title}
                className="w-32 h-32 object-contain mb-4"
              />
              <h2 className="text-lg font-bold text-white mb-2 text-center">{selectedBadge.title}</h2>
              <p className="text-gray-300 mb-2 text-center">{selectedBadge.description}</p>
              <p className="text-gray-400">Dicapai: {selectedBadge.achievementDate}</p>
              <button className="details-btn mt-4">View</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificatesSection;