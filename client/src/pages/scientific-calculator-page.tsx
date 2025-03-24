import { ScientificCalculator } from "@/components/calculators/scientific-calculator";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function ScientificCalculatorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Page Title */}
        <section className="bg-gradient-to-b from-primary-50 to-white dark:from-neutral-900 dark:to-neutral-800 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-700 dark:text-primary-200 mb-4">
                Scientific Calculator
              </h1>
              <p className="text-neutral-600 dark:text-neutral-300">
                A powerful scientific calculator inspired by the Casio fx-es 991+. 
                Perfect for solving complex mathematical expressions, trigonometric functions, 
                and statistical calculations.
              </p>
            </div>
          </div>
        </section>
        
        {/* Calculator */}
        <section className="py-8 md:py-12 bg-white dark:bg-neutral-800">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto">
              <ScientificCalculator />
            </div>
            
            {/* Additional Features */}
            <div className="mt-12 max-w-3xl mx-auto">
              <h2 className="font-heading text-2xl font-bold text-primary-700 dark:text-primary-200 mb-4 text-center">
                Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-md">
                  <h3 className="font-bold text-lg mb-2 text-primary-600 dark:text-primary-300">Basic Operations</h3>
                  <p className="text-neutral-600 dark:text-neutral-300">
                    Addition, subtraction, multiplication, division, and exponentiation.
                  </p>
                </div>
                <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-md">
                  <h3 className="font-bold text-lg mb-2 text-primary-600 dark:text-primary-300">Trigonometric Functions</h3>
                  <p className="text-neutral-600 dark:text-neutral-300">
                    Sine, cosine, tangent, and their inverses in degrees and radians.
                  </p>
                </div>
                <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-md">
                  <h3 className="font-bold text-lg mb-2 text-primary-600 dark:text-primary-300">Advanced Functions</h3>
                  <p className="text-neutral-600 dark:text-neutral-300">
                    Logarithms, roots, percentages, and memory storage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}