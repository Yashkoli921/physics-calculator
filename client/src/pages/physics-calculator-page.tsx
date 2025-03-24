import { PhysicsCalculator } from "@/components/calculators/physics-calculator";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useEffect, useRef } from "react";
import { setupPendulumScene } from "@/lib/three-utils";

export default function PhysicsCalculatorPage() {
  const canvasRef = useRef<HTMLDivElement>(null);
  
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
        <section className="bg-gradient-to-b from-primary-50 to-white dark:from-neutral-900 dark:to-neutral-800 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 mb-6 md:mb-0">
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-700 dark:text-primary-200 mb-4">
                  Physics Calculator
                </h1>
                <p className="text-neutral-600 dark:text-neutral-300 max-w-lg">
                  Solve complex physics problems with precision. This calculator provides formulas and solutions for mechanics, thermodynamics, electromagnetism, and more.
                </p>
              </div>
              
              {/* 3D Model */}
              <div className="w-full md:w-1/2 h-64" ref={canvasRef}>
                {/* Three.js will render here */}
              </div>
            </div>
          </div>
        </section>
        
        {/* Calculator */}
        <section className="py-8 md:py-12 bg-white dark:bg-neutral-800">
          <div className="container mx-auto px-4">
            <PhysicsCalculator />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}