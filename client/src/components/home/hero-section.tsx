import { Link } from "wouter";
import { useRef, useEffect } from "react";
import { setupPendulumScene } from "@/lib/three-utils";

export function HeroSection() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (canvasContainerRef.current) {
      const cleanup = setupPendulumScene(canvasContainerRef.current);
      return cleanup;
    }
  }, []);
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 dark:text-primary-100 leading-tight mb-4">
              Advanced Engineering <span className="text-secondary-700 dark:text-secondary-300">Physics</span> Calculations
            </h1>
            <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 mb-8">
              Your comprehensive platform for physics and engineering calculations with scientific, graphing, and financial tools.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="#calculators">
                <a className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg shadow-md text-center transition">
                  Get Started
                </a>
              </Link>
              <Link href="#calculators">
                <a className="px-6 py-3 bg-white dark:bg-neutral-800 text-primary-500 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-100 font-medium rounded-lg shadow-md border border-primary-100 dark:border-neutral-700 text-center transition">
                  Learn More
                </a>
              </Link>
            </div>
          </div>
          
          {/* 3D Model Container */}
          <div className="w-full md:w-1/2" ref={canvasContainerRef} id="canvas-container">
            {/* Three.js will render here */}
          </div>
        </div>
      </div>
      
      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" className="w-full h-12 md:h-20">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 0L60 10C120 20 240 40 360 50C480 60 600 60 720 55C840 50 960 40 1080 40C1200 40 1320 50 1380 55L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="currentColor" className="text-neutral-50 dark:text-neutral-900" />
        </svg>
      </div>
    </section>
  );
}
