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

export default function Home() {
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

  return (
    <main className="bg-[#020617] text-white">
      <Navbar />

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
                  text="A passionate Informatics student at Tanjungpura University with strong interest in UI/UX design, and artificial intelligence, eager to keep learning and growing every day."
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

      <section id="about" className="h-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold">About Section</h2>
      </section>

      <section id="projects" className="h-screen flex items-center justify-center bg-slate-900">
        <h2 className="text-4xl font-bold">Projects Section</h2>
      </section>

      <section id="certificates" className="h-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold">Certificates Section</h2>
      </section>

      <section id="contact" className="h-screen flex items-center justify-center bg-slate-900">
        <h2 className="text-4xl font-bold">Contact</h2>
      </section>
    </main>
  );
}
