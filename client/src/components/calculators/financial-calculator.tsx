import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { setupFinancialChart } from "@/lib/chart-utils";
import { calculateCompoundInterest, calculateLoanPayment } from "@/lib/calculator-utils";

const FINANCIAL_TOOLS = [
  "Compound Interest",
  "Loan Calculator",
  "Mortgage Calculator",
  "Investment Growth",
  "ROI Calculator"
];

const COMPOUND_FREQUENCIES = [
  "Annually",
  "Semi-annually",
  "Quarterly",
  "Monthly",
  "Daily"
];

interface FinancialFormData {
  principal: number;
  interestRate: number;
  timePeriod: number;
  compoundFrequency: string;
}

interface CalculationResult {
  finalAmount: number;
  totalInterest: number;
  annualBreakdown: {
    year: number;
    balance: number;
    interest: number;
  }[];
}

export function FinancialCalculator() {
  const [selectedTool, setSelectedTool] = useState("Compound Interest");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FinancialFormData>({
    defaultValues: {
      principal: 10000,
      interestRate: 5,
      timePeriod: 10,
      compoundFrequency: "Monthly"
    }
  });
  
  // Watch form values for chart preview
  const principal = watch("principal");
  const interestRate = watch("interestRate");
  const timePeriod = watch("timePeriod");
  const compoundFrequency = watch("compoundFrequency");
  
  // Update chart when form values change
  useEffect(() => {
    if (chartContainerRef.current && result) {
      const cleanup = setupFinancialChart(
        chartContainerRef.current,
        result.annualBreakdown
      );
      return cleanup;
    }
  }, [result]);
  
  const onSubmit = (data: FinancialFormData) => {
    try {
      if (selectedTool === "Compound Interest") {
        const result = calculateCompoundInterest(
          data.principal,
          data.interestRate / 100, // Convert percentage to decimal
          data.timePeriod,
          data.compoundFrequency
        );
        setResult(result);
      }
      // Add other calculator types here
    } catch (error) {
      console.error("Calculation error:", error);
    }
  };
  
  // For demo purposes, set a sample result when component mounts
  useEffect(() => {
    const sampleResult = calculateCompoundInterest(10000, 0.05, 10, "Monthly");
    setResult(sampleResult);
  }, []);

  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-md p-4 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Tools Selector */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4">
          <h3 className="font-heading text-lg font-medium text-neutral-800 dark:text-neutral-100 mb-4">
            Financial Tools
          </h3>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="mb-6">
              <Label htmlFor="financial-tool" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Select Calculator
              </Label>
              <Select 
                value={selectedTool}
                onValueChange={setSelectedTool}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select calculator type" />
                </SelectTrigger>
                <SelectContent>
                  {FINANCIAL_TOOLS.map(tool => (
                    <SelectItem key={tool} value={tool}>
                      {tool}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="principal" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Principal Amount ($)
              </Label>
              <Input
                id="principal"
                type="number"
                step="0.01"
                {...register("principal", { 
                  required: "Principal amount is required",
                  min: { value: 0, message: "Must be a positive number" }
                })}
              />
              {errors.principal && (
                <p className="text-sm text-red-500 mt-1">{errors.principal.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="interestRate" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Interest Rate (% per year)
              </Label>
              <Input
                id="interestRate"
                type="number"
                step="0.01"
                {...register("interestRate", { 
                  required: "Interest rate is required",
                  min: { value: 0, message: "Must be a positive number" }
                })}
              />
              {errors.interestRate && (
                <p className="text-sm text-red-500 mt-1">{errors.interestRate.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="timePeriod" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Time Period (years)
              </Label>
              <Input
                id="timePeriod"
                type="number"
                {...register("timePeriod", { 
                  required: "Time period is required",
                  min: { value: 1, message: "Minimum 1 year" }
                })}
              />
              {errors.timePeriod && (
                <p className="text-sm text-red-500 mt-1">{errors.timePeriod.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="compoundFrequency" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Compound Frequency
              </Label>
              <Select 
                value={compoundFrequency}
                onValueChange={(val) => register("compoundFrequency").onChange({ target: { value: val } })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {COMPOUND_FREQUENCIES.map(frequency => (
                    <SelectItem key={frequency} value={frequency}>
                      {frequency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" className="w-full">
              Calculate
            </Button>
          </form>
        </div>
        
        {/* Results Panel */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4">
          <h3 className="font-heading text-lg font-medium text-neutral-800 dark:text-neutral-100 mb-4">
            {selectedTool} Results
          </h3>
          
          {result && (
            <div className="space-y-4">
              <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      Principal Amount
                    </h4>
                    <p className="font-mono text-lg font-medium text-primary-700 dark:text-primary-300">
                      ${principal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      Final Amount
                    </h4>
                    <p className="font-mono text-lg font-medium text-success">
                      ${result.finalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    Total Interest Earned
                  </h4>
                  <p className="font-mono text-lg font-medium text-accent-500 dark:text-accent-300">
                    ${result.totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              
              {/* Chart Visualization */}
              <div ref={chartContainerRef} className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 h-48">
                {/* Chart will be rendered here */}
              </div>
              
              <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Annual Breakdown
                </h4>
                <div className="max-h-48 overflow-y-auto pr-2">
                  <table className="w-full text-sm">
                    <thead className="text-xs text-neutral-700 dark:text-neutral-300 border-b border-neutral-200 dark:border-neutral-700">
                      <tr>
                        <th className="py-2 text-left">Year</th>
                        <th className="py-2 text-right">Balance</th>
                        <th className="py-2 text-right">Interest</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.annualBreakdown.map((year) => (
                        <tr key={year.year} className="border-b border-neutral-200 dark:border-neutral-700">
                          <td className="py-2">{year.year}</td>
                          <td className="py-2 text-right font-mono">
                            ${year.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td className="py-2 text-right font-mono text-accent-500 dark:text-accent-300">
                            ${year.interest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
