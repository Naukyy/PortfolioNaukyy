'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import Lanyard from "./components/Lanyard/Lanyard";
import PixelBlast from "./components/PixelBlast/PixelBlast";
import TextType from "./components/TextType/TextType";
import RotatingText from "./components/RotatingText/RotatingText";
import TextPressure from "./components/TextPressure/TextPressure";
import BlurText from "./components/BlurText/BlurText";
import Navbar from "./components/Navbar/Navbar";
import CountUp from "./components/CountUp/CountUp";
import CircularText from "./components/CircularText/CircularText";
import AnimatedContent from "./components/AnimatedContent/AnimatedContent";
import GradientText from "./components/GradientText/GradientText";
import LogoLoop from "./components/LogoLoop/LogoLoop";
import ScrollVelocity from "./components/ScrollVelocity/ScrollVelocity";
import ClickSpark from "./components/ClickSpark/ClickSpark";
import ProfileCard from "./components/ProfilCards/ProfileCard";
import ScrollFloat from "./components/ScrollFloat/ScrollFloat";
import ScrollReveal from "./components/ScrollReveal/ScrollReveal";
import About from "./components/AboutSection/about";
import CircularGallery from "./components/CircularGallery/CircularGallery";
import ProjectSection from "./components/ProjectSection/ProjectSection";
import FAQSection from "./components/FAQSection/FAQSection";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, 
  SiHtml5, SiCss3, SiBootstrap, SiSass, SiVuedotjs, SiAngular, SiNuxtdotjs, 
  SiJavascript, 
  SiNodedotjs, SiExpress, SiSpringboot, SiDjango, SiLaravel, SiPhp, 
  SiMysql, SiPostgresql, SiMongodb, SiSqlite, SiFirebase, 
  SiGit, SiGithub, SiFigma, SiJupyter, SiLinux 
} from "react-icons/si";

export default function Home() {

  const projects = [
    {
      image: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      title: "Portfolio Website",
      description: "A responsive portfolio website built with modern web technologies.",
      technologies: "React, TypeScript, Tailwind CSS",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, rgba(59, 130, 246, 0.15), rgba(0, 0, 0, 0.8))",
      url: "https://github.com/Naukyy"
    },
    {
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      title: "E-Learning Platform",
      description: "Online learning platform with video courses and progress tracking.",
      technologies: "Next.js, MongoDB, Stripe",
      borderColor: "#8B5CF6",
      gradient: "linear-gradient(180deg, rgba(139, 92, 246, 0.15), rgba(0, 0, 0, 0.8))",
      url: "https://github.com/yourusername/elearning-platform"
    },
    {
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      title: "AI Chatbot",
      description: "Intelligent chatbot with natural language processing capabilities.",
      technologies: "Python, TensorFlow, Django",
      borderColor: "#EC4899",
      gradient: "linear-gradient(165deg, rgba(236, 72, 153, 0.15), rgba(0, 0, 0, 0.8))",
      url: "https://github.com/yourusername/ai-chatbot"
    },
    {
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      title: "Health Tracking App",
      description: "Mobile application for tracking fitness activities and health metrics.",
      technologies: "React Native, GraphQL, AWS",
      borderColor: "#10B981",
      gradient: "linear-gradient(195deg, rgba(16, 185, 129, 0.15), rgba(0, 0, 0, 0.8))",
      url: "https://github.com/yourusername/health-app"
    },
    {
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      title: "Social Media Platform",
      description: "A community platform for sharing content and connecting with others.",
      technologies: "Next.js, PostgreSQL, Redis",
      borderColor: "#F59E0B",
      gradient: "linear-gradient(225deg, rgba(245, 158, 11, 0.15), rgba(0, 0, 0, 0.8))",
      url: "https://github.com/yourusername/social-platform"
    },
    {
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      title: "Real Estate Listing",
      description: "Platform for browsing and listing properties with advanced filtering.",
      technologies: "Angular, NestJS, MySQL",
      borderColor: "#EF4444",
      gradient: "linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(0, 0, 0, 0.8))",
      url: "https://github.com/yourusername/real-estate-app"
    }
  ];

  const [loading, setLoading] = useState(true);
  const [countDone, setCountDone] = useState(false);

  useEffect(() => {
    if (countDone) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [countDone]);
  
  // Definisikan items untuk Navbar
  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#certificates', label: 'Certificates' },
    { href: '#contact', label: 'Contact' },
  ];

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#020617] flex items-center justify-center z-50">
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#B19EEF"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <CircularText
            text="WELCOME☆TO☆MY☆PORTFOLIO☆"
            onHover="speedUp"
            spinDuration={20}
            className="absolute w-64 h-64"
          />
          <CountUp
            from={0}
            to={102}
            separator=","
            duration={4}
            className="absolute text-4xl font-bold text-white"
            onEnd={() => setCountDone(true)}
          />
        </div>
      </div>
    );
  }

  const techLogos = [
    // === Frontend ===
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiHtml5 />, title: "HTML5", href: "https://developer.mozilla.org/docs/Web/HTML" },
    { node: <SiCss3 />, title: "CSS3", href: "https://developer.mozilla.org/docs/Web/CSS" },
    { node: <SiBootstrap />, title: "Bootstrap", href: "https://getbootstrap.com" },
    { node: <SiSass />, title: "Sass", href: "https://sass-lang.com" },
    { node: <SiVuedotjs />, title: "Vue.js", href: "https://vuejs.org" },
    { node: <SiAngular />, title: "Angular", href: "https://angular.io" },
    { node: <SiNuxtdotjs />, title: "Nuxt.js", href: "https://nuxt.com" },
    { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },

    // === Backend ===
    { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiExpress />, title: "Express.js", href: "https://expressjs.com" },
    { node: <SiSpringboot />, title: "Spring Boot", href: "https://spring.io/projects/spring-boot" },
    { node: <SiDjango />, title: "Django", href: "https://www.djangoproject.com" },
    { node: <SiLaravel />, title: "Laravel", href: "https://laravel.com" },
    { node: <SiPhp />, title: "PHP", href: "https://www.php.net" },

    // === Database ===
    { node: <SiMysql />, title: "MySQL", href: "https://www.mysql.com" },
    { node: <SiPostgresql />, title: "PostgreSQL", href: "https://www.postgresql.org" },
    { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com" },
    { node: <SiSqlite />, title: "SQLite", href: "https://www.sqlite.org" },
    { node: <SiFirebase />, title: "Firebase", href: "https://firebase.google.com" },

    // === Tools ===
    { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
    { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
    { node: <SiFigma />, title: "Figma", href: "https://figma.com" },
    { node: <SiJupyter />, title: "Jupyter Notebook", href: "https://jupyter.org" },
    { node: <SiLinux />, title: "Linux", href: "https://www.linux.org" },
  ];

  return (
    <main className="bg-[#020617] text-white">
      <ClickSpark
        sparkColor='#B19EEF'
        sparkSize={10}
        sparkRadius={35}
        sparkCount={10}
        duration={400}
      >
      {/* Navbar dengan props yang diminta */}
      <Navbar
        items={navItems}
        particleCount={15}
        particleDistances={[90, 10]}
        particleR={100}
        initialActiveIndex={0}
        animationTime={600}
        timeVariance={300}
        colors={[1, 2, 3, 1, 2, 3, 1, 4]}
      />

      <section id="home" className="relative min-h-screen overflow-x-hidden">
        <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full">
          <PixelBlast
            variant="circle"
            pixelSize={6}
            color="#B19EEF"
            patternScale={3}
            patternDensity={1.2}
            pixelSizeJitter={0.5}
            enableRipples
            rippleSpeed={0.4}
            rippleThickness={0.12}
            rippleIntensityScale={1.5}
            speed={0.6}
            edgeFade={0.25}
            transparent
          />
        </div>

        <div className="container mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-6">
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <AnimatedContent
                distance={100}
                direction="horizontal"
                reverse={false}
                duration={0.8}
                ease="power.out"
                initialOpacity={0}
                animateOpacity
                scale={1}
                threshold={0.1}
                delay={0.5}
              >
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-white font-bold">
                    I'm Ready For Job
                  </h1>
                  <RotatingText
                    texts={['Web Design', 'Design UI/UX', 'AI Enthusiast', 'Software Development']}
                    mainClassName="px-2 sm:px-2 md:px-3 bg-[#a0b1f9] text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg text-2xl font-bold inline-flex transition-all"
                    staggerFrom={"last"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                  />
                </div>

                <div className="item start">
                  <TextPressure
                    text="Naufal Zaky"
                    flex={true}
                    alpha={false}
                    stroke={false}
                    width={true}
                    weight={false}
                    italic={true}
                    textColor="#ededed"
                    strokeColor="#ff0000"
                    minFontSize={36}
                  />
                </div>

                <div>
                  <TextPressure
                    text="Ramadhan      "
                    flex={true}
                    alpha={false}
                    stroke={false}
                    width={true}
                    weight={false}
                    italic={true}
                    textColor="#92bbf4"
                    strokeColor="#ff0000"
                    minFontSize={36}
                  />
                </div>
              </AnimatedContent>

              <br />

              <div>
                <BlurText
                  text="✌︎︎ Hi, I'm a passionate Informatics student at Tanjungpura University with strong interest in UI/UX design, and artificial intelligence, eager to keep learning and growing every day."
                  delay={100}
                  animateBy="words"
                  direction="top"
                  className="text-2xl mb-8"
                />
              </div>
              <div>
                <AnimatedContent
                  distance={100}
                  direction="vertical"
                  reverse={false}
                  duration={2}
                  ease="power.out"
                  initialOpacity={0}
                  animateOpacity
                  scale={1}
                  threshold={0.1}
                  delay={0.5}
                >
                  <GradientText
                    colors={["#92bbf4", "#3f50e7ff", "#92bbf4", "#3f50e7ff", "#92bbf4"]}
                    animationSpeed={3}
                    showBorder={false}
                    className="px-5 py-4 rounded-lg text-xl font-semibold border"
                  >
                    <a href="#contact">Contact Me</a>
                  </GradientText>
                </AnimatedContent>
              </div>
            </div>

            <div className="col-span-6">
              <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="min-h-screen px-10 py-20 flex flex-col">
        <ScrollVelocity
          texts={[
            "Development ✧ Frontend ✧ Backend ✧ Design ✧",
            "Know me better ✧ Scroll Down ✧",
          ]}
          velocity={70}
          className="custom-scroll-text"
        />
        
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div className="mt-12 rounded-2xl border border-purple-500 bg-purple-950/30 shadow-[0_0_25px_rgba(168,85,247,0.8)] p-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
            <div className="w-full md:w-1/3 flex justify-center">
                <ProfileCard
                  name="Naufal Zaky R"
                  title="Full-Stack Developer"
                  handle="zakykyyy"
                  status="Online"
                  contactText="Contact Me"
                  avatarUrl="/assets/gambar2.jpg"
                  miniAvatarUrl="/assets/gambar3.jpg"
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={true}
                  onContactClick={() =>
                    window.open("https://www.instagram.com/zakykyyy/", "_blank")
                  }
                />
            </div>
            <div className="w-full md:w-2/3 flex flex-col space-y-8">
              <div>
                <ScrollFloat
                  animationDuration={1}
                  ease="back.inOut(2)"
                  scrollStart="center bottom+=50%"
                  scrollEnd="bottom bottom-=40%"
                  containerClassName="text-left"
                  textClassName="text-[#B19EEF]"
                  stagger={0.05}
                >
                  Let me introduce myself... 
                </ScrollFloat>
              </div>
              <div>
                <ScrollReveal
                  baseOpacity={0.1}
                  enableBlur={true}
                  baseRotation={0}
                  blurStrength={0}
                  containerClassName="text-left"
                  wordAnimationEnd="center center"
                >
                  Hello! I’m Naufal Zaky Ramadhan, a passionate Full-Stack Developer with a strong
                  interest in creating modern, interactive, and scalable web applications.
                  I enjoy exploring new technologies, designing seamless user experiences,
                  and building products that bring ideas to life.
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <About />
        <div style={{ height: '600px', position: 'relative' }}>
          <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02}/>
        </div>
      </section>


      <br></br>
      <br></br>
      <br></br>
      
      <section id="projects" className="min-h-screen px-4 py-16 md:px-10 md:py-20 bg-slate-950">
        {/* LogoLoop sebagai pembatas section */}
        <div className="mb-16">
          <div style={{ height: '100px', position: 'relative', overflow: 'hidden' }}>
            <LogoLoop
              logos={[
                // === Frontend ===
                { node: <SiReact />, title: "React", href: "https://react.dev" },
                { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
                { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
                { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
                { node: <SiHtml5 />, title: "HTML5", href: "https://developer.mozilla.org/docs/Web/HTML" },
                { node: <SiCss3 />, title: "CSS3", href: "https://developer.mozilla.org/docs/Web/CSS" },
                { node: <SiBootstrap />, title: "Bootstrap", href: "https://getbootstrap.com" },
                { node: <SiSass />, title: "Sass", href: "https://sass-lang.com" },
                { node: <SiVuedotjs />, title: "Vue.js", href: "https://vuejs.org" },
                { node: <SiAngular />, title: "Angular", href: "https://angular.io" },
                { node: <SiNuxtdotjs />, title: "Nuxt.js", href: "https://nuxt.com" },
                { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },

                // === Backend ===
                { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
                { node: <SiExpress />, title: "Express.js", href: "https://expressjs.com" },
                { node: <SiSpringboot />, title: "Spring Boot", href: "https://spring.io/projects/spring-boot" },
                { node: <SiDjango />, title: "Django", href: "https://www.djangoproject.com" },
                { node: <SiLaravel />, title: "Laravel", href: "https://laravel.com" },
                { node: <SiPhp />, title: "PHP", href: "https://www.php.net" },

                // === Database ===
                { node: <SiMysql />, title: "MySQL", href: "https://www.mysql.com" },
                { node: <SiPostgresql />, title: "PostgreSQL", href: "https://www.postgresql.org" },
                { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com" },
                { node: <SiSqlite />, title: "SQLite", href: "https://www.sqlite.org" },
                { node: <SiFirebase />, title: "Firebase", href: "https://firebase.google.com" },

                // === Tools ===
                { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
                { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
                { node: <SiFigma />, title: "Figma", href: "https://figma.com" },
                { node: <SiJupyter />, title: "Jupyter Notebook", href: "https://jupyter.org" },
                { node: <SiLinux />, title: "Linux", href: "https://www.linux.org" },
              ]}
              speed={70}
              direction="left"
              logoHeight={50}
              gap={50}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#020617"
              ariaLabel="Technology partners"
            />
          </div>
        </div>

        {/* Project Section */}
        <div className="container mx-auto">
          <ProjectSection 
            projects={projects}
            radius={350}
            damping={0.4}
            fadeOut={0.5}
            ease="power3.out"
          /> 
        </div>
        <div>
          <FAQSection></FAQSection>
        </div>
      </section>

      
      <section id="certificates" className="h-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold">Certificates Section</h2>
      </section>

      <section id="contact" className="h-screen flex items-center justify-center bg-slate-900">
        <h2 className="text-4xl font-bold">Contact</h2>
      </section>
      </ClickSpark>
    </main>
  );
}