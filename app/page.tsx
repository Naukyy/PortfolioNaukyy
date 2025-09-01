import Image from "next/image";
import Lanyard from "./components/Lanyard/Lanyard";
import PixelBlast from "./components/PixelBlast/PixelBlast";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
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
          <div className="col-span-6"></div>
          <div className="col-span-6">
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
          </div>
        </div>
      </div>
    </div>
  );
}
