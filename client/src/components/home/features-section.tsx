import { 
  Atom, 
  Calculator, 
  LineChart, 
  DollarSign,
  ArrowRight
} from "lucide-react";
import { Link } from "wouter";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgClass: string;
  link: string;
}

function FeatureCard({ icon, title, description, iconBgClass, link }: FeatureProps) {
  return (
    <Link href={link}>
      <div className="bg-white dark:bg-[#3d0f45] rounded-xl shadow-md hover:shadow-xl p-6 sm:p-7 transition-all duration-300 hover:scale-[1.02] cursor-pointer group border border-transparent hover:border-[#ffa3fd]/30 dark:hover:border-[#700b7e]/50">
        <div className={`${iconBgClass} rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-5 transform group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <h3 className="font-heading text-xl font-bold text-[#700b7e] dark:text-[#eb4ff3] mb-3 flex items-center">
          {title}
          <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#e100ff] dark:text-[#f677f8]" />
        </h3>
        <p className="text-neutral-600 dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: <Atom className="h-6 w-6 sm:h-7 sm:w-7 text-[#e100ff] dark:text-[#eb4ff3]" />,
      title: "Physics Formulas",
      description: "Access hundreds of engineering physics formulas with step-by-step solutions.",
      iconBgClass: "bg-[#ffe6fe] dark:bg-[#520e5b]/50",
      link: "/physics"
    },
    {
      icon: <Calculator className="h-6 w-6 sm:h-7 sm:w-7 text-[#e100ff] dark:text-[#eb4ff3]" />,
      title: "Scientific Calculator",
      description: "Professional-grade scientific calculator inspired by Casio fx-991+.",
      iconBgClass: "bg-[#ffe6fe] dark:bg-[#520e5b]/50",
      link: "/scientific"
    },
    {
      icon: <LineChart className="h-6 w-6 sm:h-7 sm:w-7 text-[#e100ff] dark:text-[#eb4ff3]" />,
      title: "Graph Calculator",
      description: "Plot functions and visualize data with our interactive graphing tool.",
      iconBgClass: "bg-[#ffe6fe] dark:bg-[#520e5b]/50",
      link: "/graph"
    },
    {
      icon: <DollarSign className="h-6 w-6 sm:h-7 sm:w-7 text-[#e100ff] dark:text-[#eb4ff3]" />,
      title: "Financial Tools",
      description: "Calculate investments, loans, and other financial metrics with ease.",
      iconBgClass: "bg-[#ffe6fe] dark:bg-[#520e5b]/50",
      link: "/financial"
    },
  ];

  return (
    <section id="calculators" className="py-16 md:py-24 bg-white dark:bg-[#27112c]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#9200b3] to-[#e100ff] dark:from-[#d727e8] dark:to-[#eb4ff3] bg-clip-text text-transparent mb-4">
            Powerful Tools for Every Calculation
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-600 dark:text-neutral-300 text-lg">
            From basic arithmetic to complex physics formulas, our suite of calculators helps you solve any problem accurately and efficiently.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
      
      {/* Add a divider */}
      <div className="container mx-auto px-4 mt-20">
        <div className="h-px bg-gradient-to-r from-transparent via-[#ffa3fd]/30 dark:via-[#700b7e]/50 to-transparent"></div>
      </div>
    </section>
  );
}
