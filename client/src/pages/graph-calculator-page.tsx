import { GraphCalculator } from "@/components/calculators/graph-calculator";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function GraphCalculatorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Page Title */}
        <section className="bg-gradient-to-b from-primary-50 to-white dark:from-neutral-900 dark:to-neutral-800 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-700 dark:text-primary-200 mb-4">
                Graph Calculator
              </h1>
              <p className="text-neutral-600 dark:text-neutral-300">
                Visualize mathematical functions with our interactive graph calculator. 
                Plot multiple functions, adjust ranges, and analyze relationships between variables.
              </p>
            </div>
          </div>
        </section>
        
        {/* Calculator */}
        <section className="py-8 md:py-12 bg-white dark:bg-neutral-800">
          <div className="container mx-auto px-4">
            <GraphCalculator />
            
            {/* Usage Tips */}
            <div className="mt-12 max-w-3xl mx-auto">
              <h2 className="font-heading text-2xl font-bold text-primary-700 dark:text-primary-200 mb-4 text-center">
                Usage Tips
              </h2>
              <div className="bg-primary-50 dark:bg-neutral-700 p-6 rounded-lg shadow-md">
                <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-200">
                  <li>Use <code className="bg-white dark:bg-neutral-600 px-1 rounded">x</code> as the variable in your expressions (e.g., <code className="bg-white dark:bg-neutral-600 px-1 rounded">x^2 + 3*x + 1</code>)</li>
                  <li>Add multiple functions to compare graphs</li>
                  <li>Adjust the X and Y ranges to zoom in or out</li>
                  <li>Toggle functions on/off using the visibility controls</li>
                  <li>Use different colors to distinguish between functions</li>
                </ul>
              </div>
            </div>
            
            {/* Function Examples */}
            <div className="mt-12 max-w-3xl mx-auto">
              <h2 className="font-heading text-2xl font-bold text-primary-700 dark:text-primary-200 mb-4 text-center">
                Common Function Examples
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-md">
                  <h3 className="font-bold text-lg mb-2 text-primary-600 dark:text-primary-300">Polynomial Functions</h3>
                  <div className="space-y-2">
                    <p className="font-mono bg-primary-50 dark:bg-neutral-600 p-2 rounded">x^2 - 4</p>
                    <p className="font-mono bg-primary-50 dark:bg-neutral-600 p-2 rounded">x^3 - 2*x^2 + 3</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-md">
                  <h3 className="font-bold text-lg mb-2 text-primary-600 dark:text-primary-300">Trigonometric Functions</h3>
                  <div className="space-y-2">
                    <p className="font-mono bg-primary-50 dark:bg-neutral-600 p-2 rounded">sin(x)</p>
                    <p className="font-mono bg-primary-50 dark:bg-neutral-600 p-2 rounded">2 * cos(x/2) + 1</p>
                  </div>
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