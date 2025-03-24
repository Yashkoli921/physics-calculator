// Calculator types definition

// All calculator types supported by the application
export type CalculationType = 'physics' | 'scientific' | 'graph' | 'financial';

// Physics formula types
export interface PhysicsFormula {
  id: string;
  category: string;
  name: string;
  formula: string;
  description: string;
  variables: PhysicsVariable[];
}

export interface PhysicsVariable {
  id: string;
  name: string;
  symbol: string;
  unit: string;
}

// Physics calculation result types
export interface PhysicsCalculationResult {
  value: number;
  steps: string[];
}

// Financial calculation types
export interface FinancialCalculationResult {
  finalAmount: number;
  totalInterest: number;
  annualBreakdown: {
    year: number;
    balance: number;
    interest: number;
  }[];
}

// Graph function types
export interface GraphFunction {
  id: number;
  expression: string;
  color: string;
  isActive: boolean;
}

// User calculation history type
export interface UserCalculation {
  id: number;
  userId: number;
  calculationType: string;
  inputData: string;
  result: string;
  createdAt: string;
}

// Calculator input types for each calculator
export interface PhysicsCalculatorInput {
  formulaId: string;
  [key: string]: number | string;
}

export interface ScientificCalculatorInput {
  expression: string;
}

export interface GraphCalculatorInput {
  functions: GraphFunction[];
  xRange: { min: number, max: number };
  yRange: { min: number, max: number };
}

export interface FinancialCalculatorInput {
  calculatorType: string;
  principal: number;
  interestRate: number;
  timePeriod: number;
  compoundFrequency: string;
}
