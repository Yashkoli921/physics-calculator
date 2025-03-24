import { PhysicsCalculator } from "@/components/calculators/physics-calculator";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useState, useEffect, useRef } from "react";
import { setupPendulumScene } from "@/lib/three-utils";
import { Info, Clock } from "lucide-react";

export default function PhysicsCalculatorPage() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [showInfo, setShowInfo] = useState(false);
  
  useEffect(() => {
    if (canvasRef.current) {
      const cleanup = setupPendulumScene(canvasRef.current);
      return cleanup;
    }
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Page Title */}
        <section className="bg-gradient-to-br from-[#ffe6fe]/80 to-white dark:from-[#27112c] dark:to-[#27112c]/80 py-10 md:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <h1 className="font-heading text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#9200b3] to-[#e100ff] dark:from-[#d727e8] dark:to-[#eb4ff3] bg-clip-text text-transparent mb-4">
                  Physics Calculator
                </h1>
                <p className="text-neutral-700 dark:text-neutral-200 max-w-lg text-lg">
                  Solve complex physics problems with precision. This calculator provides formulas and solutions for mechanics, thermodynamics, electromagnetism, and more.
                </p>
                
                <div className="mt-6 inline-flex items-center px-4 py-2 bg-[#ffe6fe]/90 dark:bg-[#520e5b]/70 backdrop-blur-sm rounded-full border border-[#ffa3fd]/50 dark:border-[#700b7e]/50">
                  <Clock className="h-4 w-4 mr-2 text-[#e100ff] dark:text-[#eb4ff3]" />
                  <span className="text-sm font-medium text-[#9200b3] dark:text-[#eb4ff3]">Interactive Pendulum Model</span>
                </div>
              </div>
              
              {/* 3D Model */}
              <div className="w-full md:w-1/2 h-[300px] relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#ffe6fe]/50 to-transparent dark:from-[#520e5b]/30 dark:to-transparent rounded-2xl backdrop-blur-sm z-0"></div>
                <div className="absolute inset-0 bg-white/70 dark:bg-[#27112c]/80 rounded-xl shadow-xl z-10 overflow-hidden border border-[#ffa3fd]/40 dark:border-[#700b7e]/40">
                  <div 
                    ref={canvasRef} 
                    className="w-full h-full relative z-20"
                  >
                    {/* Three.js will render here */}
                    <div className="absolute bottom-4 right-4 bg-[#ffe6fe]/80 dark:bg-[#520e5b]/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-[#9200b3] dark:text-[#eb4ff3] border border-[#ffa3fd]/30 dark:border-[#700b7e]/50 hidden sm:block transition-all duration-200 hover:bg-[#ffa3fd]/50 dark:hover:bg-[#700b7e]/60 cursor-pointer inline-flex items-center space-x-1.5" onClick={() => setShowInfo(!showInfo)}>
                      <Clock className="h-3.5 w-3.5" />
                      <span>Pendulum Physics</span>
                    </div>
                    
                    {/* Info popup */}
                    {showInfo && (
                      <div className="absolute bottom-16 right-4 bg-white dark:bg-[#3d0f45] p-4 rounded-xl shadow-lg max-w-xs border border-[#ffa3fd]/50 dark:border-[#700b7e]/60 text-sm text-neutral-700 dark:text-neutral-200 z-30 animate-fadeIn">
                        <div className="flex items-start mb-2">
                          <Info className="h-5 w-5 mr-2 text-[#e100ff] dark:text-[#eb4ff3] flex-shrink-0" />
                          <span className="font-medium">Pendulum Physics</span>
                        </div>
                        <p className="mb-2">This simulation demonstrates simple harmonic motion with damping - a fundamental concept in physics.</p>
                        <p>The pendulum follows precise mathematical equations that relate time, position, and gravitational forces.</p>
                        <button 
                          onClick={() => setShowInfo(false)}
                          className="mt-3 w-full px-3 py-1.5 bg-[#ffa3fd]/20 dark:bg-[#700b7e]/30 hover:bg-[#ffa3fd]/30 dark:hover:bg-[#700b7e]/50 text-[#9200b3] dark:text-[#eb4ff3] rounded-lg text-center font-medium text-sm transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Calculator */}
        <section className="py-12 md:py-16 bg-white dark:bg-[#27112c]">
          <div className="container mx-auto px-4 sm:px-6">
            <PhysicsCalculator />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}