import { Link } from "wouter";
import { useRef, useEffect } from "react";
import { setupPendulumScene } from "@/lib/three-utils";
import { ArrowRight, Sparkles, Zap, Calculator, ChevronRight } from "lucide-react";

export function HeroSection() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (canvasContainerRef.current) {
      const cleanup = setupPendulumScene(canvasContainerRef.current);
      return cleanup;
    }
  }, []);
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50/50 dark:from-primary-950 dark:via-neutral-900 dark:to-primary-950/80">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary-200 dark:bg-primary-800 rounded-full filter blur-3xl opacity-30 animate-float" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-primary-300 dark:bg-primary-700 rounded-full filter blur-3xl opacity-20 animate-float" style={{animationDelay: '0.7s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-12 md:mb-0 relative z-10">
            <div className="inline-flex items-center px-4 py-2 mb-6 bg-primary-100/80 dark:bg-primary-900/60 backdrop-blur-sm rounded-full border border-primary-200 dark:border-primary-700/40">
              <Sparkles className="h-4 w-4 mr-2 text-primary-500 dark:text-primary-400" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">Advanced Tools for Engineers</span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-primary-800 to-primary-600 dark:from-primary-300 dark:to-primary-500 bg-clip-text text-transparent">Advanced Engineering</span>
              <br />
              <span className="text-primary-900 dark:text-white">Physics Calculator</span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 mb-8 max-w-xl leading-relaxed">
              Your comprehensive platform for physics and engineering calculations with immersive scientific, graphing, and financial tools with 3D visualizations.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5">
              <Link href="#calculators">
                <span className="group px-6 py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 dark:from-primary-500 dark:to-primary-400 dark:hover:from-primary-400 dark:hover:to-primary-300 text-white font-medium rounded-full shadow-lg hover:shadow-primary-500/30 dark:hover:shadow-primary-700/30 text-center transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer inline-flex items-center justify-center">
                  <Calculator className="mr-2 h-5 w-5" />
                  <span>Get Started</span>
                  <ChevronRight className="ml-1 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
              <Link href="#calculators">
                <span className="px-6 py-3.5 bg-white/80 dark:bg-neutral-800/60 backdrop-blur-sm hover:bg-white dark:hover:bg-neutral-800 text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200 font-medium rounded-full shadow-md border border-primary-100 dark:border-primary-800/50 text-center transition-all duration-300 cursor-pointer inline-flex items-center justify-center group">
                  <span>Learn More</span>
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </div>
            
            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 mt-10">
              <div className="inline-flex items-center px-3 py-1.5 bg-white/70 dark:bg-neutral-800/50 backdrop-blur-sm rounded-full border border-primary-100 dark:border-neutral-700/30">
                <span className="text-xs font-medium text-primary-700 dark:text-primary-300">Scientific</span>
              </div>
              <div className="inline-flex items-center px-3 py-1.5 bg-white/70 dark:bg-neutral-800/50 backdrop-blur-sm rounded-full border border-primary-100 dark:border-neutral-700/30">
                <span className="text-xs font-medium text-primary-700 dark:text-primary-300">Physics</span>
              </div>
              <div className="inline-flex items-center px-3 py-1.5 bg-white/70 dark:bg-neutral-800/50 backdrop-blur-sm rounded-full border border-primary-100 dark:border-neutral-700/30">
                <span className="text-xs font-medium text-primary-700 dark:text-primary-300">Graphing</span>
              </div>
              <div className="inline-flex items-center px-3 py-1.5 bg-white/70 dark:bg-neutral-800/50 backdrop-blur-sm rounded-full border border-primary-100 dark:border-neutral-700/30">
                <span className="text-xs font-medium text-primary-700 dark:text-primary-300">Financial</span>
              </div>
            </div>
          </div>
          
          {/* 3D Model Container with styling */}
          <div className="w-full md:w-1/2 h-[400px] md:h-[500px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-100/50 to-transparent dark:from-primary-900/30 dark:to-transparent rounded-2xl backdrop-blur-sm z-0"></div>
            <div className="absolute inset-4 bg-white/60 dark:bg-neutral-900/70 rounded-xl shadow-xl z-10 overflow-hidden border border-primary-200/50 dark:border-primary-800/30">
              <div 
                ref={canvasContainerRef} 
                id="canvas-container" 
                className="w-full h-full relative z-20"
              >
                {/* Three.js will render here */}
              </div>
            </div>
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
