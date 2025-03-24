import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useAuth } from "@/hooks/use-auth";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { 
  UserCalculation,
  CalculationType 
} from "@/types/calculator";
import { Loader2, User, History, CalculatorIcon } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Link } from "wouter";

export default function ProfilePage() {
  const { user } = useAuth();
  
  const { data: calculations, isLoading } = useQuery<UserCalculation[]>({
    queryKey: ["/api/calculations"],
  });
  
  if (!user) {
    return null; // Protected route will handle redirection
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-10 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-heading font-bold text-neutral-900 dark:text-neutral-100 mb-8">
            My Profile
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary-100 dark:bg-primary-900/50 h-16 w-16 rounded-full flex items-center justify-center text-primary-700 dark:text-primary-300">
                      <User size={28} />
                    </div>
                    <div>
                      <CardTitle>{user.displayName || user.username}</CardTitle>
                      <CardDescription className="mt-1">{user.email}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    <p className="flex justify-between py-2 border-b border-neutral-200 dark:border-neutral-700">
                      <span>Username:</span>
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">{user.username}</span>
                    </p>
                    <p className="flex justify-between py-2 border-b border-neutral-200 dark:border-neutral-700">
                      <span>Member since:</span>
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">
                        {format(new Date(user.createdAt), 'MMM d, yyyy')}
                      </span>
                    </p>
                    <p className="flex justify-between py-2">
                      <span>Calculations:</span>
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">
                        {isLoading ? "Loading..." : calculations?.length || 0}
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-6">
                <Link href="/#calculators">
                  <Button className="w-full">
                    <CalculatorIcon className="mr-2 h-4 w-4" />
                    Go to Calculators
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="history" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="history">
                    <History className="mr-2 h-4 w-4" />
                    Calculation History
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="history">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Calculations</CardTitle>
                      <CardDescription>
                        Your saved calculations from all calculator types
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isLoading ? (
                        <div className="flex justify-center items-center py-8">
                          <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
                        </div>
                      ) : calculations && calculations.length > 0 ? (
                        <CalculationHistoryTable calculations={calculations} />
                      ) : (
                        <div className="text-center py-8 text-neutral-600 dark:text-neutral-400">
                          <CalculatorIcon className="h-12 w-12 mx-auto mb-4 text-neutral-400 dark:text-neutral-600" />
                          <p>You haven't saved any calculations yet.</p>
                          <p className="mt-2">Use the calculators to solve problems and save your results.</p>
                          <Link href="/#calculators">
                            <Button variant="outline" className="mt-4">
                              Go to Calculators
                            </Button>
                          </Link>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

interface CalculationHistoryTableProps {
  calculations: UserCalculation[];
}

function CalculationHistoryTable({ calculations }: CalculationHistoryTableProps) {
  const [sortedCalculations, setSortedCalculations] = useState<UserCalculation[]>([]);
  
  useEffect(() => {
    // Sort by most recent first
    const sorted = [...calculations].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setSortedCalculations(sorted);
  }, [calculations]);
  
  function getCalculationTypeBadge(type: CalculationType) {
    const colors: Record<CalculationType, string> = {
      physics: "bg-primary-100 text-primary-800 dark:bg-primary-900/40 dark:text-primary-300",
      scientific: "bg-secondary-100 text-secondary-800 dark:bg-secondary-900/40 dark:text-secondary-300",
      graph: "bg-accent-100 text-accent-800 dark:bg-accent-900/40 dark:text-accent-300",
      financial: "bg-success/10 text-success dark:bg-success/20 dark:text-success/90"
    };
    
    return (
      <Badge variant="outline" className={`${colors[type]} border-0`}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  }
  
  function formatCalculationResult(calculation: UserCalculation): string {
    try {
      const result = JSON.parse(calculation.result);
      if (calculation.calculationType === "physics") {
        return `${result.value.toFixed(2)} ${getPhysicsUnit(calculation.inputData)}`;
      } else if (calculation.calculationType === "financial") {
        return `$${result.finalAmount.toFixed(2)}`;
      } else {
        return result.toString();
      }
    } catch (error) {
      return calculation.result;
    }
  }
  
  function getPhysicsUnit(inputData: string): string {
    try {
      const parsedData = JSON.parse(inputData);
      if (parsedData.formulaId === "displacement") {
        return "m";
      } else if (parsedData.formulaId === "newton2") {
        return "N";
      } else if (parsedData.formulaId === "gravitational") {
        return "N";
      } else if (parsedData.formulaId === "kinetic") {
        return "J";
      } else {
        return "";
      }
    } catch {
      return "";
    }
  }
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Input</TableHead>
            <TableHead>Result</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCalculations.map((calculation) => (
            <TableRow key={calculation.id}>
              <TableCell>
                {getCalculationTypeBadge(calculation.calculationType as CalculationType)}
              </TableCell>
              <TableCell className="font-mono text-sm">
                {calculation.inputData.length > 30 
                  ? calculation.inputData.substring(0, 30) + "..." 
                  : calculation.inputData}
              </TableCell>
              <TableCell className="font-mono">
                {formatCalculationResult(calculation)}
              </TableCell>
              <TableCell className="text-right text-sm text-neutral-600 dark:text-neutral-400">
                {format(new Date(calculation.createdAt), 'MMM d, yyyy h:mm a')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
