import { useState } from "react";
import { PhysicsCalculator } from "./physics-calculator";
import { ScientificCalculator } from "./scientific-calculator";
import { GraphCalculator } from "./graph-calculator";
import { FinancialCalculator } from "./financial-calculator";

type CalculatorType = "physics" | "scientific" | "graph" | "financial";

export function CalculatorTabs() {
  const [activeTab, setActiveTab] = useState<CalculatorType>("physics");
  
  return (
    <section id="calculators" className="py-12 md:py-20 bg-white dark:bg-neutral-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-700 dark:text-primary-100 mb-4">
            Interactive Calculators
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400">
            Choose the calculator that fits your needs and start solving problems accurately.
          </p>
        </div>
        
        {/* Calculator Tabs */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="border-b border-neutral-200 dark:border-neutral-700">
            <nav className="flex flex-wrap -mb-px">
              <button 
                className={`inline-block p-4 font-medium text-sm ${
                  activeTab === "physics" 
                    ? "text-primary-600 dark:text-primary-300 border-b-2 border-primary-500" 
                    : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 border-b-2 border-transparent hover:border-neutral-300 dark:hover:border-neutral-600"
                }`}
                onClick={() => setActiveTab("physics")}
              >
                Physics Calculator
              </button>
              <button 
                className={`inline-block p-4 font-medium text-sm ${
                  activeTab === "scientific" 
                    ? "text-primary-600 dark:text-primary-300 border-b-2 border-primary-500" 
                    : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 border-b-2 border-transparent hover:border-neutral-300 dark:hover:border-neutral-600"
                }`}
                onClick={() => setActiveTab("scientific")}
              >
                Scientific Calculator
              </button>
              <button 
                className={`inline-block p-4 font-medium text-sm ${
                  activeTab === "graph" 
                    ? "text-primary-600 dark:text-primary-300 border-b-2 border-primary-500" 
                    : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 border-b-2 border-transparent hover:border-neutral-300 dark:hover:border-neutral-600"
                }`}
                onClick={() => setActiveTab("graph")}
              >
                Graph Calculator
              </button>
              <button 
                className={`inline-block p-4 font-medium text-sm ${
                  activeTab === "financial" 
                    ? "text-primary-600 dark:text-primary-300 border-b-2 border-primary-500" 
                    : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 border-b-2 border-transparent hover:border-neutral-300 dark:hover:border-neutral-600"
                }`}
                onClick={() => setActiveTab("financial")}
              >
                Financial Calculator
              </button>
            </nav>
          </div>
        </div>
        
        {/* Calculator Content */}
        <div className="calculator-container max-w-4xl mx-auto">
          {activeTab === "physics" && <PhysicsCalculator />}
          {activeTab === "scientific" && <ScientificCalculator />}
          {activeTab === "graph" && <GraphCalculator />}
          {activeTab === "financial" && <FinancialCalculator />}
        </div>
      </div>
    </section>
  );
}
