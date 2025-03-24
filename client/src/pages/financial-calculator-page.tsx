import { FinancialCalculator } from "@/components/calculators/financial-calculator";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function FinancialCalculatorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Page Title */}
        <section className="bg-gradient-to-b from-primary-50 to-white dark:from-neutral-900 dark:to-neutral-800 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-700 dark:text-primary-200 mb-4">
                Financial Calculator
              </h1>
              <p className="text-neutral-600 dark:text-neutral-300">
                Plan your financial future with precision. Calculate compound interest, 
                loan payments, retirement goals, and more with our comprehensive financial tools.
              </p>
            </div>
          </div>
        </section>
        
        {/* Calculator */}
        <section className="py-8 md:py-12 bg-white dark:bg-neutral-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <FinancialCalculator />
            </div>
            
            {/* Financial Concepts */}
            <div className="mt-12 max-w-4xl mx-auto">
              <h2 className="font-heading text-2xl font-bold text-primary-700 dark:text-primary-200 mb-6 text-center">
                Understanding Financial Concepts
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-md">
                  <h3 className="font-bold text-xl mb-3 text-primary-600 dark:text-primary-300">Compound Interest</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                    Compound interest is when the interest you earn on an investment is added to the principal, 
                    so that the interest in the next period is calculated on a larger amount.
                  </p>
                  <h4 className="font-semibold text-primary-500 dark:text-primary-300 mb-2">Formula:</h4>
                  <div className="bg-primary-50 dark:bg-neutral-600 p-3 rounded font-mono text-sm">
                    A = P(1 + r/n)^(nt)
                  </div>
                  <div className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                    Where:
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>A = Final amount</li>
                      <li>P = Principal (initial investment)</li>
                      <li>r = Annual interest rate (decimal)</li>
                      <li>n = Compounding frequency per year</li>
                      <li>t = Time in years</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-md">
                  <h3 className="font-bold text-xl mb-3 text-primary-600 dark:text-primary-300">Loan Payments</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                    Calculate monthly payments for loans, mortgages, or any fixed-term borrowing. 
                    See how interest rates and loan terms affect your total payment amount.
                  </p>
                  <h4 className="font-semibold text-primary-500 dark:text-primary-300 mb-2">Formula:</h4>
                  <div className="bg-primary-50 dark:bg-neutral-600 p-3 rounded font-mono text-sm">
                    PMT = P(r(1+r)^n)/((1+r)^n-1)
                  </div>
                  <div className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                    Where:
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>PMT = Monthly payment</li>
                      <li>P = Principal (loan amount)</li>
                      <li>r = Monthly interest rate (annual rate / 12)</li>
                      <li>n = Total number of payments (years × 12)</li>
                    </ul>
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