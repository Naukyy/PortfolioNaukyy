import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import AnimatedTitle from './AnimatedTitle';

export interface ProjectItem {
  image: string;
  title: string;
  description: string;
  technologies?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
}

export interface ProjectSectionProps {
  projects?: ProjectItem[];
  className?: string;
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
  sectionTitle?: string | string[];
}

const ProjectSection: React.FC<ProjectSectionProps> = ({
  projects,
  className = '',
  radius = 300,
  damping = 0.45,
  fadeOut = 0.5,
  ease = 'power3.out',
  sectionTitle = ["My Projects", "Creating next level digital products", "My Work", "Recent Projects", "Let's collaborate!"]
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<ReturnType<typeof gsap.quickSetter> | null>(null);
  const setY = useRef<ReturnType<typeof gsap.quickSetter> | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  // Warna berbeda untuk setiap kartu proyek
  const colorSchemes = [
    { border: '#3B82F6', gradient: 'linear-gradient(145deg, rgba(59, 130, 246, 0.15), rgba(0, 0, 0, 0.8))' },
    { border: '#8B5CF6', gradient: 'linear-gradient(210deg, rgba(139, 92, 246, 0.15), rgba(0, 0, 0, 0.8))' },
    { border: '#EC4899', gradient: 'linear-gradient(165deg, rgba(236, 72, 153, 0.15), rgba(0, 0, 0, 0.8))' },
    { border: '#10B981', gradient: 'linear-gradient(195deg, rgba(16, 185, 129, 0.15), rgba(0, 0, 0, 0.8))' },
    { border: '#F59E0B', gradient: 'linear-gradient(225deg, rgba(245, 158, 11, 0.15), rgba(0, 0, 0, 0.8))' },
    { border: '#EF4444', gradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(0, 0, 0, 0.8))' }
  ];

  const demoProjects: ProjectItem[] = [
    {
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      title: 'E-Commerce Platform',
      description: 'A full-featured online shopping platform with payment integration and inventory management.',
      technologies: 'React, Node.js, MongoDB',
      borderColor: colorSchemes[0].border,
      gradient: colorSchemes[0].gradient,
      url: 'https://github.com/'
    },
    {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      title: 'Task Management App',
      description: 'Productivity application for team collaboration and task tracking.',
      technologies: 'Vue.js, Firebase, Tailwind CSS',
      borderColor: colorSchemes[1].border,
      gradient: colorSchemes[1].gradient,
      url: 'https://github.com/'
    },
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      title: 'Financial Dashboard',
      description: 'Interactive dashboard for visualizing financial data and analytics.',
      technologies: 'React, D3.js, Express',
      borderColor: colorSchemes[2].border,
      gradient: colorSchemes[2].gradient,
      url: 'https://github.com/'
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      title: 'Health Tracking App',
      description: 'Mobile application for tracking fitness activities and health metrics.',
      technologies: 'React Native, GraphQL, AWS',
      borderColor: colorSchemes[3].border,
      gradient: colorSchemes[3].gradient,
      url: 'https://github.com/'
    },
    {
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      title: 'Social Media Platform',
      description: 'A community platform for sharing content and connecting with others.',
      technologies: 'Next.js, PostgreSQL, Redis',
      borderColor: colorSchemes[4].border,
      gradient: colorSchemes[4].gradient,
      url: 'https://github.com/'
    },
    {
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      title: 'Real Estate Listing',
      description: 'Platform for browsing and listing properties with advanced filtering.',
      technologies: 'Angular, NestJS, MySQL',
      borderColor: colorSchemes[5].border,
      gradient: colorSchemes[5].gradient,
      url: 'https://github.com/'
    }
  ];

  const projectData = projects?.length ? projects : demoProjects;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    
    // Inisialisasi posisi kursor di tengah container
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    
    // Setup fungsi untuk mengubah posisi kursor dengan tipe yang benar
    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');
    
    // Set posisi awal kursor
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    if (!setX.current || !setY.current) return;
    
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = (e: React.PointerEvent) => {
    if (!rootRef.current) return;
    
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    
    // Sembunyikan efek fade saat kursor bergerak
    if (fadeRef.current) {
      gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
    }
  };

  const handleLeave = () => {
    // Kembalikan efek fade saat kursor meninggalkan area
    if (fadeRef.current) {
      gsap.to(fadeRef.current, {
        opacity: 1,
        duration: fadeOut,
        overwrite: true
      });
    }
  };

  const handleCardClick = (url?: string) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCardMove: React.MouseEventHandler<HTMLElement> = e => {
    const c = e.currentTarget as HTMLElement;
    const rect = c.getBoundingClientRect();
    c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section className="py-16 relative overflow-hidden" style={{ 
      background: ''
    }}>
      {/* Neon Glow Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Animated Title Section dengan efek neon putih ungu */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <AnimatedTitle 
              text={sectionTitle} 
              as="span"
              typingSpeed={80}
              pauseDuration={3000}
              textColors={['#ffffff']}
              className="font-bold neon-text-purple"
              cursorClassName="text-white"
            />
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Explore my latest projects and creative works. Each project represents a unique challenge and solution.
          </p>
        </div>

        {/* Projects Grid dengan layout 3x2 */}
        <div
          ref={rootRef}
          onPointerMove={handleMove}
          onPointerLeave={handleLeave}
          className={`relative w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 ${className}`}
          style={
            {
              '--r': `${radius}px`,
              '--x': '50%',
              '--y': '50%'
            } as React.CSSProperties
          }
        >
          {projectData.map((project, i) => (
            <article
              key={i}
              onMouseMove={handleCardMove}
              className="group relative flex flex-col w-full h-[450px] rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl backdrop-blur-sm"
              style={{
                borderColor: project.borderColor || 'transparent',
                background: project.gradient,
                boxShadow: `0 0 15px ${project.borderColor}40`,
                '--spotlight-color': 'rgba(255,255,255,0.3)'
              } as React.CSSProperties}
            >
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
                style={{
                  background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)'
                }}
              />
              
              <div className="relative z-10 flex-1 p-5 box-border">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  loading="lazy" 
                  className="w-full h-52 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
              
              <div className="relative z-10 p-6 text-white flex flex-col flex-1">
                <h3 className="m-0 text-xl font-bold mb-3 text-white">{project.title}</h3>
                <p className="m-0 text-sm opacity-85 mb-4 flex-1 text-gray-300">{project.description}</p>
                
                {project.technologies && (
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <span className="text-xs opacity-70 font-medium text-gray-400">Technologies:</span>
                      <p className="m-0 text-sm opacity-85 text-gray-300">{project.technologies}</p>
                    </div>
                    
                    {project.url && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(project.url);
                        }}
                        className="ml-4 py-2 px-4 text-black text-xs font-semibold rounded-lg transition-all duration-300 hover: active:scale-95 shadow-lg hover:shadow-white/40 min-w-[100px]"
                        style={{ 
                          background: project.borderColor,
                          color: 'white',
                          boxShadow: `0 0 10px ${project.borderColor}`
                        }}
                      >
                        View
                      </button>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
          
          {/* Efek spotlight yang mengikuti kursor */}
          <div
            className="absolute inset-0 pointer-events-none z-30"
            style={{
              backdropFilter: 'grayscale(1) brightness(0.78)',
              WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',
              background: 'rgba(0,0,0,0.001)',
              maskImage: 'radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 15%, rgba(0,0,0,0.10) 30%, rgba(0,0,0,0.22) 45%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.50) 75%, rgba(0,0,0,0.68) 88%, white 100%)',
              WebkitMaskImage: 'radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 15%, rgba(0,0,0,0.10) 30%, rgba(0,0,0,0.22) 45%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.50) 75%, rgba(0,0,0,0.68) 88%, white 100%)'
            }}
          />
          
          {/* Efek fade yang muncul saat kursor tidak bergerak */}
          <div
            ref={fadeRef}
            className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"
            style={{
              backdropFilter: 'grayscale(1) brightness(0.78)',
              WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',
              background: 'rgba(0,0,0,0.001)',
              maskImage: 'radial-gradient(circle var(--r) at var(--x) var(--y), white 0%, white 15%, rgba(255,255,255,0.90) 30%, rgba(255,255,255,0.78) 45%, rgba(255,255,255,0.65) 60%, rgba(255,255,255,0.50) 75%, rgba(255,255,255,0.32) 88%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(circle var(--r) at var(--x) var(--y), white 0%, white 15%, rgba(255,255,255,0.90) 30%, rgba(255,255,255,0.78) 45%, rgba(255,255,255,0.65) 60%, rgba(255,255,255,0.50) 75%, rgba(255,255,255,0.32) 88%, transparent 100%)',
              opacity: 1
            }}
          />
        </div>
      </div>

      {/* CSS untuk efek neon */}
      <style jsx>{`
        .neon-text-purple {
          color: #fff;
          text-shadow: 
            0 0 5px #fff,
            0 0 10px #fff,
            0 0 15px #fff,
            0 0 20px #3B82F6,
            0 0 35px #3B82F6,
            0 0 40px #3B82F6,
            0 0 50px #3B82F6,
            0 0 75px #3B82F6;
          animation: pulsate 2s infinite alternate;
        }
        
        @keyframes pulsate {
          100% {
            text-shadow: 
              0 0 5px #fff,
              0 0 10px #fff,
              0 0 15px #fff,
              0 0 20px #3B82F6,
              0 0 35px #3B82F6,
              0 0 40px #3B82F6,
              0 0 50px #3B82F6,
              0 0 75px #3B82F6;
          }
          0% {
            text-shadow: 
              0 0 2px #fff,
              0 0 5px #fff,
              0 0 10px #fff,
              0 0 15px #3B82F6,
              0 0 25px #3B82F6,
              0 0 30px #3B82F6,
              0 0 40px #3B82F6,
              0 0 55px #3B82F6;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectSection;