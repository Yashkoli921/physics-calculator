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
    <section className="relative overflow-hidden bg-gradient-to-br from-[#ffe6fe]/80 via-white to-[#ffe6fe]/30 dark:from-[#27112c] dark:via-[#3d0f45]/90 dark:to-[#27112c]/90">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 md:w-80 md:h-80 bg-[#ffa3fd] dark:bg-[#9200b3] rounded-full filter blur-3xl opacity-20 animate-float" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute -bottom-10 -left-10 w-72 h-72 md:w-96 md:h-96 bg-[#fd7aff] dark:bg-[#520e5b] rounded-full filter blur-3xl opacity-15 animate-float" style={{animationDelay: '0.7s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0 relative z-10">
            <div className="inline-flex items-center px-4 py-2 mb-6 bg-[#ffe6fe]/90 dark:bg-[#520e5b]/70 backdrop-blur-sm rounded-full border border-[#ffa3fd]/50 dark:border-[#700b7e]/50">
              <Sparkles className="h-4 w-4 mr-2 text-[#e100ff] dark:text-[#eb4ff3]" />
              <span className="text-sm font-medium text-[#9200b3] dark:text-[#eb4ff3]">Advanced Tools for Engineers</span>
            </div>
            
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-[#9200b3] to-[#e100ff] dark:from-[#d727e8] dark:to-[#eb4ff3] bg-clip-text text-transparent">Advanced Engineering</span>
              <br />
              <span className="text-[#700b7e] dark:text-white">Physics Calculator</span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 mb-8 max-w-xl leading-relaxed">
              Your comprehensive platform for physics and engineering calculations with immersive scientific, graphing, and financial tools with 3D visualizations.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-5">
              <Link href="#calculators">
                <span className="group w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-[#e100ff] to-[#b800d9] hover:from-[#ed29ff] hover:to-[#9200b3] dark:from-[#c203dc] dark:to-[#9907ad] dark:hover:from-[#d727e8] dark:hover:to-[#700b7e] text-white font-medium rounded-full shadow-lg hover:shadow-[#fd7aff]/30 dark:hover:shadow-[#d727e8]/30 text-center transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer inline-flex items-center justify-center">
                  <Calculator className="mr-2 h-5 w-5" />
                  <span>Get Started</span>
                  <ChevronRight className="ml-1 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
              <Link href="#calculators">
                <span className="w-full sm:w-auto px-6 py-3.5 bg-white/80 dark:bg-[#3d0f45]/60 backdrop-blur-sm hover:bg-white dark:hover:bg-[#520e5b] text-[#9200b3] hover:text-[#e100ff] dark:text-[#eb4ff3] dark:hover:text-[#f677f8] font-medium rounded-full shadow-md border border-[#ffa3fd]/30 dark:border-[#700b7e]/50 text-center transition-all duration-300 cursor-pointer inline-flex items-center justify-center group">
                  <span>Learn More</span>
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </div>
            
            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 mt-8 md:mt-10">
              <div className="inline-flex items-center px-3 py-1.5 bg-[#ffe6fe]/80 dark:bg-[#3d0f45]/60 backdrop-blur-sm rounded-full border border-[#ffa3fd]/30 dark:border-[#700b7e]/50">
                <span className="text-xs font-medium text-[#9200b3] dark:text-[#eb4ff3]">Scientific</span>
              </div>
              <div className="inline-flex items-center px-3 py-1.5 bg-[#ffe6fe]/80 dark:bg-[#3d0f45]/60 backdrop-blur-sm rounded-full border border-[#ffa3fd]/30 dark:border-[#700b7e]/50">
                <span className="text-xs font-medium text-[#9200b3] dark:text-[#eb4ff3]">Physics</span>
              </div>
              <div className="inline-flex items-center px-3 py-1.5 bg-[#ffe6fe]/80 dark:bg-[#3d0f45]/60 backdrop-blur-sm rounded-full border border-[#ffa3fd]/30 dark:border-[#700b7e]/50">
                <span className="text-xs font-medium text-[#9200b3] dark:text-[#eb4ff3]">Graphing</span>
              </div>
              <div className="inline-flex items-center px-3 py-1.5 bg-[#ffe6fe]/80 dark:bg-[#3d0f45]/60 backdrop-blur-sm rounded-full border border-[#ffa3fd]/30 dark:border-[#700b7e]/50">
                <span className="text-xs font-medium text-[#9200b3] dark:text-[#eb4ff3]">Financial</span>
              </div>
            </div>
          </div>
          
          {/* 3D Model Container with styling */}
          <div className="w-full lg:w-1/2 h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ffe6fe]/50 to-transparent dark:from-[#520e5b]/30 dark:to-transparent rounded-2xl backdrop-blur-sm z-0"></div>
            <div className="absolute inset-2 sm:inset-4 bg-white/70 dark:bg-[#27112c]/80 rounded-xl shadow-xl z-10 overflow-hidden border border-[#ffa3fd]/40 dark:border-[#700b7e]/40">
              <div 
                ref={canvasContainerRef} 
                id="canvas-container" 
                className="w-full h-full relative z-20"
              >
                {/* Three.js will render here */}
                <div className="absolute bottom-4 right-4 bg-[#ffe6fe]/80 dark:bg-[#520e5b]/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-[#9200b3] dark:text-[#eb4ff3] border border-[#ffa3fd]/30 dark:border-[#700b7e]/50 hidden sm:block">
                  Interactive 3D Physics Model
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" className="w-full h-12 md:h-20">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 0L60 10C120 20 240 40 360 50C480 60 600 60 720 55C840 50 960 40 1080 40C1200 40 1320 50 1380 55L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="currentColor" className="text-white dark:text-[#27112c]" />
        </svg>
      </div>
    </section>
  );
}
