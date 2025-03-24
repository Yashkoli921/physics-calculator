import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculatePhysicsFormula } from "@/lib/calculator-utils";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest } from "@/lib/queryClient";

interface PhysicsFormula {
  id: string;
  category: string;
  name: string;
  formula: string;
  description: string;
  variables: {
    id: string;
    name: string;
    symbol: string;
    unit: string;
  }[];
}

const MECHANICS_FORMULAS: PhysicsFormula[] = [
  {
    id: "displacement",
    category: "Mechanics",
    name: "Kinematics - Displacement",
    formula: "s = ut + ½at²",
    description: "Calculate the displacement of an object undergoing constant acceleration.",
    variables: [
      { id: "u", name: "Initial Velocity", symbol: "u", unit: "m/s" },
      { id: "t", name: "Time", symbol: "t", unit: "s" },
      { id: "a", name: "Acceleration", symbol: "a", unit: "m/s²" }
    ]
  },
  {
    id: "newton2",
    category: "Mechanics",
    name: "Newton's 2nd Law",
    formula: "F = ma",
    description: "Calculate the force acting on an object with mass m and acceleration a.",
    variables: [
      { id: "m", name: "Mass", symbol: "m", unit: "kg" },
      { id: "a", name: "Acceleration", symbol: "a", unit: "m/s²" }
    ]
  },
  {
    id: "gravitational",
    category: "Mechanics",
    name: "Gravitational Force",
    formula: "F = G(m₁m₂/r²)",
    description: "Calculate the gravitational force between two masses.",
    variables: [
      { id: "m1", name: "Mass 1", symbol: "m₁", unit: "kg" },
      { id: "m2", name: "Mass 2", symbol: "m₂", unit: "kg" },
      { id: "r", name: "Distance", symbol: "r", unit: "m" }
    ]
  },
  {
    id: "kinetic",
    category: "Mechanics",
    name: "Kinetic Energy",
    formula: "KE = ½mv²",
    description: "Calculate the kinetic energy of a moving object.",
    variables: [
      { id: "m", name: "Mass", symbol: "m", unit: "kg" },
      { id: "v", name: "Velocity", symbol: "v", unit: "m/s" }
    ]
  }
];

// Add more categories as needed
const FORMULA_CATEGORIES = [
  "Mechanics",
  "Electricity & Magnetism",
  "Thermodynamics",
  "Waves & Optics",
  "Quantum Physics"
];

export function PhysicsCalculator() {
  const [selectedCategory, setSelectedCategory] = useState("Mechanics");
  const [selectedFormula, setSelectedFormula] = useState<PhysicsFormula | null>(MECHANICS_FORMULAS[0]);
  const [calculationResult, setCalculationResult] = useState<{ value: number; steps: string[] } | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { toast } = useToast();
  const { user } = useAuth();

  // Reset form when formula changes
  useEffect(() => {
    if (selectedFormula) {
      reset();
      setCalculationResult(null);
    }
  }, [selectedFormula, reset]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    // In a full application, we'd filter formulas by category
    // For now, we'll just stay with Mechanics formulas
    setSelectedFormula(MECHANICS_FORMULAS[0]);
  };

  const handleFormulaSelect = (formula: PhysicsFormula) => {
    setSelectedFormula(formula);
  };

  const onSubmit = async (data: Record<string, any>) => {
    try {
      if (!selectedFormula) return;
      
      // Convert string inputs to numbers
      const numericInputs: Record<string, number> = {};
      selectedFormula.variables.forEach(variable => {
        numericInputs[variable.id] = parseFloat(data[variable.id]);
      });
      
      // Calculate using the formula
      const result = calculatePhysicsFormula(selectedFormula.id, numericInputs);
      setCalculationResult(result);
      
      // If user is logged in, save calculation to history
      if (user) {
        try {
          await apiRequest("POST", "/api/calculations", {
            calculationType: "physics",
            inputData: JSON.stringify(numericInputs),
            result: JSON.stringify(result)
          });
        } catch (error) {
          console.error("Failed to save calculation:", error);
        }
      }
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: error instanceof Error ? error.message : "An error occurred during calculation",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Formula Selection Panel */}
        <div className="md:col-span-1 bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4">
          <h3 className="font-heading text-lg font-medium text-neutral-800 dark:text-neutral-100 mb-4">
            Physics Formulas
          </h3>
          
          <div className="space-y-2">
            <div className="mb-4">
              <Label htmlFor="formula-category" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Category
              </Label>
              <Select 
                value={selectedCategory}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {FORMULA_CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
              {MECHANICS_FORMULAS.map(formula => (
                <div 
                  key={formula.id}
                  onClick={() => handleFormulaSelect(formula)}
                  className={`${
                    selectedFormula?.id === formula.id 
                      ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800' 
                      : 'bg-neutral-50 dark:bg-neutral-900 hover:bg-primary-50 dark:hover:bg-primary-900/20 border-neutral-200 dark:border-neutral-700'
                  } p-3 rounded-md cursor-pointer transition border`}
                >
                  <p className="font-medium text-neutral-800 dark:text-neutral-200">{formula.name}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">{formula.formula}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Calculator Panel */}
        {selectedFormula && (
          <div className="md:col-span-2 bg-white dark:bg-neutral-800 rounded-lg shadow-md">
            {/* Formula Display */}
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
              <h4 className="font-heading text-lg font-medium text-neutral-800 dark:text-neutral-100">
                {selectedFormula.name}
              </h4>
              <div className="flex items-center justify-center h-12 my-2 bg-neutral-50 dark:bg-neutral-900 rounded-md">
                <p className="font-mono text-lg text-primary-700 dark:text-primary-300">{selectedFormula.formula}</p>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {selectedFormula.description}
              </p>
            </div>
            
            {/* Input Fields */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {selectedFormula.variables.map(variable => (
                    <div key={variable.id}>
                      <Label htmlFor={variable.id} className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        {variable.name} ({variable.symbol}) [{variable.unit}]
                      </Label>
                      <Input
                        id={variable.id}
                        type="number"
                        step="any"
                        {...register(variable.id, { 
                          required: "This field is required",
                          valueAsNumber: true,
                        })}
                        className="w-full"
                      />
                      {errors[variable.id] && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors[variable.id]?.message as string}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                
                <Button type="submit" className="w-full">
                  Calculate
                </Button>
                
                {/* Results */}
                {calculationResult && (
                  <div className="mt-6 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                    <h5 className="font-heading text-md font-medium text-neutral-800 dark:text-neutral-200 mb-2">
                      Result:
                    </h5>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">
                          {selectedFormula.id === "displacement" ? "Displacement (s):" :
                           selectedFormula.id === "newton2" ? "Force (F):" :
                           selectedFormula.id === "gravitational" ? "Force (F):" :
                           selectedFormula.id === "kinetic" ? "Kinetic Energy (KE):" : "Result:"}
                        </span>
                        <span className="font-mono font-medium text-primary-700 dark:text-primary-300">
                          {calculationResult.value.toFixed(2)} {
                            selectedFormula.id === "displacement" ? "m" :
                            selectedFormula.id === "newton2" ? "N" :
                            selectedFormula.id === "gravitational" ? "N" :
                            selectedFormula.id === "kinetic" ? "J" : ""
                          }
                        </span>
                      </div>
                      <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          Step-by-step solution:
                        </p>
                        <ol className="list-decimal list-inside text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                          {calculationResult.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
