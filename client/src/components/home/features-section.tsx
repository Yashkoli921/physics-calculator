import { 
  Atom, 
  Calculator, 
  LineChart, 
  DollarSign 
} from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgClass: string;
}

function FeatureCard({ icon, title, description, iconBgClass }: FeatureProps) {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 formula-card transition-all">
      <div className={`${iconBgClass} rounded-full w-14 h-14 flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="font-heading text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
        {title}
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
    </div>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: <Atom className="h-6 w-6 text-primary-500 dark:text-primary-300" />,
      title: "Physics Formulas",
      description: "Access hundreds of engineering physics formulas with step-by-step solutions.",
      iconBgClass: "bg-primary-50 dark:bg-primary-900/30"
    },
    {
      icon: <Calculator className="h-6 w-6 text-secondary-500 dark:text-secondary-300" />,
      title: "Scientific Calculator",
      description: "Professional-grade scientific calculator inspired by Casio fx-991+.",
      iconBgClass: "bg-secondary-50 dark:bg-secondary-900/30"
    },
    {
      icon: <LineChart className="h-6 w-6 text-accent-500 dark:text-accent-300" />,
      title: "Graph Calculator",
      description: "Plot functions and visualize data with our interactive graphing tool.",
      iconBgClass: "bg-accent-50 dark:bg-accent-900/30"
    },
    {
      icon: <DollarSign className="h-6 w-6 text-success" />,
      title: "Financial Tools",
      description: "Calculate investments, loans, and other financial metrics with ease.",
      iconBgClass: "bg-success/10 dark:bg-success/20"
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-700 dark:text-primary-100 mb-4">
            Powerful Tools for Every Calculation
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400">
            From basic arithmetic to complex physics formulas, our suite of calculators helps you solve any problem accurately and efficiently.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
