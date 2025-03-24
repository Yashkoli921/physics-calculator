import { CalculatorIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary-500 text-white p-1 rounded">
                <CalculatorIcon className="h-4 w-4" />
              </div>
              <h3 className="font-heading font-bold text-white">
                Physics Calculator
              </h3>
            </div>
            <p className="text-sm mb-4">
              Your comprehensive platform for physics and engineering calculations with powerful tools.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition">
                <span className="material-icons">facebook</span>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition">
                <span className="material-icons">theater_comedy</span>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition">
                <span className="material-icons">auto_awesome</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-white mb-4">Calculators</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Physics Calculator</a></li>
              <li><a href="#" className="hover:text-white transition">Scientific Calculator</a></li>
              <li><a href="#" className="hover:text-white transition">Graph Calculator</a></li>
              <li><a href="#" className="hover:text-white transition">Financial Calculator</a></li>
              <li><a href="#" className="hover:text-white transition">Basic Calculator</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Physics Formulas</a></li>
              <li><a href="#" className="hover:text-white transition">Tutorials</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">API Documentation</a></li>
              <li><a href="#" className="hover:text-white transition">Mobile App</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Physics Calculator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
