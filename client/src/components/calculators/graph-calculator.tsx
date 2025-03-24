import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setupGraphPlot } from "@/lib/chart-utils";
import { ZoomIn, ZoomOut, RefreshCw } from "lucide-react";

interface FunctionData {
  id: number;
  expression: string;
  color: string;
  isActive: boolean;
}

export function GraphCalculator() {
  const [functions, setFunctions] = useState<FunctionData[]>([
    { id: 1, expression: "x^2", color: "#3F51B5", isActive: true },
    { id: 2, expression: "sin(x)", color: "#00BCD4", isActive: true },
    { id: 3, expression: "", color: "#FF4081", isActive: false }
  ]);
  
  const [xRange, setXRange] = useState({ min: -10, max: 10 });
  const [yRange, setYRange] = useState({ min: -10, max: 10 });
  
  const chartContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (chartContainerRef.current) {
      const activeFunctions = functions.filter(f => f.isActive && f.expression.trim() !== "");
      const cleanup = setupGraphPlot(
        chartContainerRef.current, 
        activeFunctions, 
        xRange,
        yRange
      );
      
      return cleanup;
    }
  }, [functions, xRange, yRange]);
  
  const handleFunctionChange = (id: number, expression: string) => {
    setFunctions(prev => 
      prev.map(f => f.id === id 
        ? { ...f, expression, isActive: expression.trim() !== "" } 
        : f
      )
    );
  };
  
  const handleRangeChange = (axis: 'x' | 'y', bound: 'min' | 'max', value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;
    
    if (axis === 'x') {
      setXRange(prev => ({ ...prev, [bound]: numValue }));
    } else {
      setYRange(prev => ({ ...prev, [bound]: numValue }));
    }
  };
  
  const handleZoomIn = () => {
    setXRange(prev => ({ min: prev.min * 0.8, max: prev.max * 0.8 }));
    setYRange(prev => ({ min: prev.min * 0.8, max: prev.max * 0.8 }));
  };
  
  const handleZoomOut = () => {
    setXRange(prev => ({ min: prev.min * 1.2, max: prev.max * 1.2 }));
    setYRange(prev => ({ min: prev.min * 1.2, max: prev.max * 1.2 }));
  };
  
  const handleResetView = () => {
    setXRange({ min: -10, max: 10 });
    setYRange({ min: -10, max: 10 });
  };
  
  const plotGraph = () => {
    // The graph will be updated via the useEffect hook
  };

  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-md p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Function Input Panel */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4">
          <h3 className="font-heading text-lg font-medium text-neutral-800 dark:text-neutral-100 mb-4">
            Graph Functions
          </h3>
          
          <div className="space-y-4 mb-6">
            {functions.map((func, index) => (
              <div key={func.id}>
                <Label className="flex items-center space-x-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  <span className="w-4 h-4 inline-block rounded-full" style={{ backgroundColor: func.color }}></span>
                  <span>Function {index + 1}</span>
                </Label>
                <Input
                  type="text"
                  value={func.expression}
                  onChange={(e) => handleFunctionChange(func.id, e.target.value)}
                  placeholder={`y = `}
                  className="w-full"
                />
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  X Min
                </Label>
                <Input
                  type="number"
                  value={xRange.min}
                  onChange={(e) => handleRangeChange('x', 'min', e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  X Max
                </Label>
                <Input
                  type="number"
                  value={xRange.max}
                  onChange={(e) => handleRangeChange('x', 'max', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Y Min
                </Label>
                <Input
                  type="number"
                  value={yRange.min}
                  onChange={(e) => handleRangeChange('y', 'min', e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Y Max
                </Label>
                <Input
                  type="number"
                  value={yRange.max}
                  onChange={(e) => handleRangeChange('y', 'max', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
            
            <Button onClick={plotGraph} className="w-full">
              Plot Graph
            </Button>
          </div>
        </div>
        
        {/* Graph Display */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 h-full flex flex-col">
            <div ref={chartContainerRef} className="bg-neutral-50 dark:bg-neutral-900 rounded-lg flex-grow flex items-center justify-center min-h-[300px]">
              {/* Chart.js will render here */}
            </div>
            
            <div className="mt-4 flex justify-between">
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomIn}
                  className="px-3 py-1 text-sm font-medium"
                >
                  <ZoomIn className="h-4 w-4 mr-1" />
                  Zoom In
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomOut}
                  className="px-3 py-1 text-sm font-medium"
                >
                  <ZoomOut className="h-4 w-4 mr-1" />
                  Zoom Out
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetView}
                className="px-3 py-1 text-sm font-medium text-primary-700 dark:text-primary-300"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Reset View
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
