// Physics Calculation Functions
export function calculatePhysicsFormula(
  formulaId: string,
  inputs: Record<string, number>
): { value: number; steps: string[] } {
  switch (formulaId) {
    case "displacement":
      return calculateDisplacement(inputs.u, inputs.t, inputs.a);
    case "newton2":
      return calculateNewtonSecondLaw(inputs.m, inputs.a);
    case "gravitational":
      return calculateGravitationalForce(inputs.m1, inputs.m2, inputs.r);
    case "kinetic":
      return calculateKineticEnergy(inputs.m, inputs.v);
    default:
      throw new Error("Unknown formula ID");
  }
}

function calculateDisplacement(
  initialVelocity: number,
  time: number,
  acceleration: number
): { value: number; steps: string[] } {
  const displacement = initialVelocity * time + 0.5 * acceleration * Math.pow(time, 2);
  return {
    value: displacement,
    steps: [
      "s = ut + ½at²",
      `s = ${initialVelocity} × ${time} + ½ × ${acceleration} × ${time}²`,
      `s = ${initialVelocity * time} + ${0.5 * acceleration} × ${Math.pow(time, 2)}`,
      `s = ${initialVelocity * time} + ${0.5 * acceleration * Math.pow(time, 2)}`,
      `s = ${displacement}`
    ]
  };
}

function calculateNewtonSecondLaw(
  mass: number,
  acceleration: number
): { value: number; steps: string[] } {
  const force = mass * acceleration;
  return {
    value: force,
    steps: [
      "F = ma",
      `F = ${mass} × ${acceleration}`,
      `F = ${force}`
    ]
  };
}

function calculateGravitationalForce(
  mass1: number,
  mass2: number,
  distance: number
): { value: number; steps: string[] } {
  const G = 6.674e-11; // Gravitational constant
  const force = G * mass1 * mass2 / Math.pow(distance, 2);
  return {
    value: force,
    steps: [
      "F = G(m₁m₂/r²)",
      `F = ${G} × (${mass1} × ${mass2} / ${distance}²)`,
      `F = ${G} × (${mass1 * mass2} / ${Math.pow(distance, 2)})`,
      `F = ${G * mass1 * mass2 / Math.pow(distance, 2)}`
    ]
  };
}

function calculateKineticEnergy(
  mass: number,
  velocity: number
): { value: number; steps: string[] } {
  const energy = 0.5 * mass * Math.pow(velocity, 2);
  return {
    value: energy,
    steps: [
      "KE = ½mv²",
      `KE = ½ × ${mass} × ${velocity}²`,
      `KE = ${0.5 * mass} × ${Math.pow(velocity, 2)}`,
      `KE = ${energy}`
    ]
  };
}

// Scientific Calculator Functions
export function evaluateExpression(expression: string): number {
  // Replace mathematical constants and functions with their JavaScript equivalents
  const processedExpression = expression
    .replace(/π/g, 'Math.PI')
    .replace(/e/g, 'Math.E')
    .replace(/sin\(/g, 'Math.sin(')
    .replace(/cos\(/g, 'Math.cos(')
    .replace(/tan\(/g, 'Math.tan(')
    .replace(/log\(/g, 'Math.log10(')
    .replace(/ln\(/g, 'Math.log(')
    .replace(/sqrt\(/g, 'Math.sqrt(')
    .replace(/\^/g, '**');
  
  try {
    // Using Function constructor to evaluate the expression
    // eslint-disable-next-line no-new-func
    return Function(`'use strict'; return (${processedExpression})`)();
  } catch (error) {
    throw new Error("Invalid expression");
  }
}

// Financial Calculator Functions
export function calculateCompoundInterest(
  principal: number,
  rate: number,
  years: number,
  compoundFrequency: string
): {
  finalAmount: number;
  totalInterest: number;
  annualBreakdown: { year: number; balance: number; interest: number }[];
} {
  // Determine the number of times compounded per year
  let n = 1; // Default to annually
  switch (compoundFrequency) {
    case "Daily":
      n = 365;
      break;
    case "Monthly":
      n = 12;
      break;
    case "Quarterly":
      n = 4;
      break;
    case "Semi-annually":
      n = 2;
      break;
    case "Annually":
      n = 1;
      break;
  }
  
  const annualBreakdown: { year: number; balance: number; interest: number }[] = [];
  
  let currentBalance = principal;
  let totalInterest = 0;
  let yearlyInterest = 0;
  
  // Calculate compound interest for each year
  for (let year = 1; year <= years; year++) {
    const prevBalance = currentBalance;
    currentBalance = principal * Math.pow(1 + rate / n, n * year);
    yearlyInterest = currentBalance - prevBalance;
    totalInterest = currentBalance - principal;
    
    annualBreakdown.push({
      year,
      balance: currentBalance,
      interest: yearlyInterest
    });
  }
  
  return {
    finalAmount: currentBalance,
    totalInterest,
    annualBreakdown
  };
}

export function calculateLoanPayment(
  principal: number,
  rate: number,
  years: number
): {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  paymentSchedule: { month: number; balance: number; interest: number; principal: number }[];
} {
  const monthlyRate = rate / 12;
  const totalMonths = years * 12;
  
  // Calculate monthly payment
  const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                          (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  // Create payment schedule
  const paymentSchedule: { 
    month: number; 
    balance: number; 
    interest: number; 
    principal: number 
  }[] = [];
  
  let remainingBalance = principal;
  let totalInterest = 0;
  
  for (let month = 1; month <= totalMonths; month++) {
    const monthlyInterest = remainingBalance * monthlyRate;
    const principalPaid = monthlyPayment - monthlyInterest;
    
    remainingBalance -= principalPaid;
    totalInterest += monthlyInterest;
    
    paymentSchedule.push({
      month,
      balance: remainingBalance > 0 ? remainingBalance : 0,
      interest: monthlyInterest,
      principal: principalPaid
    });
  }
  
  return {
    monthlyPayment,
    totalPayment: monthlyPayment * totalMonths,
    totalInterest,
    paymentSchedule
  };
}
