import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { evaluateExpression } from "@/lib/calculator-utils";

interface CalculatorKeyProps {
  value: string;
  label?: string;
  onClick: (value: string) => void;
  className?: string;
}

function CalculatorKey({ value, label, onClick, className = "" }: CalculatorKeyProps) {
  return (
    <Button 
      type="button"
      onClick={() => onClick(value)}
      className={`calculator-key scientific-key ${className} font-mono py-3 rounded text-center h-12`}
      variant="outline"
    >
      {label || value}
    </Button>
  );
}

export function ScientificCalculator() {
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [memory, setMemory] = useState<number | null>(null);
  const [isShiftMode, setIsShiftMode] = useState(false);
  const [isAlphaMode, setIsAlphaMode] = useState(false);
  
  const handleKeyPress = (key: string) => {
    switch (key) {
      case "=":
        calculateResult();
        break;
      case "C":
      case "ON/C":
        clearAll();
        break;
      case "DEL":
        deleteLast();
        break;
      case "SHIFT":
        setIsShiftMode(!isShiftMode);
        break;
      case "ALPHA":
        setIsAlphaMode(!isAlphaMode);
        break;
      case "M+":
        addToMemory();
        break;
      case "M-":
        subtractFromMemory();
        break;
      case "MR":
        recallMemory();
        break;
      case "MC":
        clearMemory();
        break;
      case "sin":
        appendFunction("sin(");
        break;
      case "cos":
        appendFunction("cos(");
        break;
      case "tan":
        appendFunction("tan(");
        break;
      case "π":
        appendValue("π");
        break;
      case "e":
        appendValue("e");
        break;
      case "log":
        appendFunction("log(");
        break;
      case "ln":
        appendFunction("ln(");
        break;
      case "√":
        appendFunction("sqrt(");
        break;
      case "x²":
        appendFunction("^2");
        break;
      case "(−)":
        toggleSign();
        break;
      default:
        appendValue(key);
    }
  };
  
  const appendValue = (value: string) => {
    setDisplay(prev => prev + value);
  };
  
  const appendFunction = (func: string) => {
    setDisplay(prev => prev + func);
  };
  
  const calculateResult = () => {
    try {
      if (!display) return;
      
      const calculatedResult = evaluateExpression(display);
      setResult(calculatedResult.toString());
    } catch (error) {
      setResult("Error");
    }
  };
  
  const clearAll = () => {
    setDisplay("");
    setResult(null);
  };
  
  const deleteLast = () => {
    setDisplay(prev => prev.slice(0, -1));
  };
  
  const toggleSign = () => {
    if (display.startsWith("-")) {
      setDisplay(display.substring(1));
    } else {
      setDisplay("-" + display);
    }
  };
  
  const addToMemory = () => {
    if (result) {
      const newMemValue = (memory || 0) + parseFloat(result);
      setMemory(newMemValue);
    }
  };
  
  const subtractFromMemory = () => {
    if (result) {
      const newMemValue = (memory || 0) - parseFloat(result);
      setMemory(newMemValue);
    }
  };
  
  const recallMemory = () => {
    if (memory !== null) {
      setDisplay(prev => prev + memory.toString());
    }
  };
  
  const clearMemory = () => {
    setMemory(null);
  };

  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-md p-4 md:p-6">
      <div className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md">
        {/* Calculator Display */}
        <div className="calc-display p-4 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
          <div className="text-right">
            <div className="text-sm text-neutral-500 dark:text-neutral-400">{display || "0"}</div>
            <div className="font-mono text-2xl font-medium text-neutral-900 dark:text-neutral-100">{result || "0"}</div>
          </div>
        </div>
        
        {/* Calculator Keypad */}
        <div className="grid grid-cols-5 gap-1 p-2">
          {/* Row 1 */}
          <CalculatorKey
            value="SHIFT"
            onClick={handleKeyPress}
            className={`bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 ${isShiftMode ? 'ring-2 ring-primary-500' : ''}`}
          />
          <CalculatorKey
            value="ALPHA"
            onClick={handleKeyPress}
            className={`bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 ${isAlphaMode ? 'ring-2 ring-primary-500' : ''}`}
          />
          <CalculatorKey
            value="MODE"
            onClick={handleKeyPress}
            className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          />
          <CalculatorKey
            value="ON/C"
            onClick={handleKeyPress}
            className="bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/30 text-red-500"
          />
          <CalculatorKey
            value="DEL"
            onClick={handleKeyPress}
            className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          />
          
          {/* Row 2 */}
          <CalculatorKey
            value="x²"
            onClick={handleKeyPress}
            className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          />
          <CalculatorKey
            value="√"
            onClick={handleKeyPress}
            className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          />
          <CalculatorKey
            value="log"
            onClick={handleKeyPress}
            className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          />
          <CalculatorKey
            value="ln"
            onClick={handleKeyPress}
            className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          />
          <CalculatorKey
            value="(−)"
            onClick={handleKeyPress}
            className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          />
          
          {/* Row 3 */}
          <CalculatorKey
            value="sin"
            onClick={handleKeyPress}
            className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          />
          <CalculatorKey
            value="cos"
            onClick={handleKeyPress}
            className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          />
          <CalculatorKey
            value="tan"
            onClick={handleKeyPress}
            className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          />
          <CalculatorKey
            value="π"
            onClick={handleKeyPress}
            className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          />
          <CalculatorKey
            value="e"
            onClick={handleKeyPress}
            className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          />
          
          {/* Row 4 */}
          <CalculatorKey
            value="("
            onClick={handleKeyPress}
            className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          />
          <CalculatorKey
            value=")"
            onClick={handleKeyPress}
            className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          />
          <CalculatorKey
            value="MR"
            onClick={handleKeyPress}
            className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          />
          <CalculatorKey
            value="M+"
            onClick={handleKeyPress}
            className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          />
          <CalculatorKey
            value="M-"
            onClick={handleKeyPress}
            className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          />
          
          {/* Row 5 */}
          <CalculatorKey
            value="7"
            onClick={handleKeyPress}
            className="bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          />
          <CalculatorKey
            value="8"
            onClick={handleKeyPress}
            className="bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          />
          <CalculatorKey
            value="9"
            onClick={handleKeyPress}
            className="bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          />
          <CalculatorKey
            value="DEL"
            onClick={handleKeyPress}
            className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          />
          <CalculatorKey
            value="C"
            onClick={handleKeyPress}
            className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          />
          
          {/* Row 6 */}
          <CalculatorKey
            value="4"
            onClick={handleKeyPress}
            className="bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          />
          <CalculatorKey
            value="5"
            onClick={handleKeyPress}
            className="bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          />
          <CalculatorKey
            value="6"
            onClick={handleKeyPress}
            className="bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          />
          <CalculatorKey
            value="×"
            onClick={handleKeyPress}
            className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          />
          <CalculatorKey
            value="÷"
            onClick={handleKeyPress}
            className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          />
          
          {/* Row 7 */}
          <CalculatorKey
            value="1"
            onClick={handleKeyPress}
            className="bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          />
          <CalculatorKey
            value="2"
            onClick={handleKeyPress}
            className="bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          />
          <CalculatorKey
            value="3"
            onClick={handleKeyPress}
            className="bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          />
          <CalculatorKey
            value="+"
            onClick={handleKeyPress}
            className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          />
          <CalculatorKey
            value="-"
            onClick={handleKeyPress}
            className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          />
          
          {/* Row 8 */}
          <CalculatorKey
            value="0"
            onClick={handleKeyPress}
            className="bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          />
          <CalculatorKey
            value="."
            onClick={handleKeyPress}
            className="bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          />
          <CalculatorKey
            value="EXP"
            label="×10ˣ"
            onClick={handleKeyPress}
            className="bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          />
          <CalculatorKey
            value="Ans"
            onClick={handleKeyPress}
            className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          />
          <CalculatorKey
            value="="
            onClick={handleKeyPress}
            className="bg-primary-500 hover:bg-primary-600 text-white"
          />
        </div>
      </div>
    </div>
  );
}
