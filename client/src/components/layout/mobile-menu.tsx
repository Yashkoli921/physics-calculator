import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Home, Calculator, LineChart, PieChart, DollarSign, UserCircle, LogOut } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { user, logoutMutation } = useAuth();
  
  if (!isOpen) return null;
  
  const handleLogout = () => {
    logoutMutation.mutate();
    onClose();
  };
  
  return (
    <div className="md:hidden fixed top-0 inset-x-0 z-50 h-screen bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md px-6 py-8 overflow-y-auto">
      <div className="flex justify-end">
        <button 
          onClick={onClose}
          className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="flex flex-col mt-10 space-y-5">
        <Link href="/" onClick={onClose}>
          <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors">
            <Home className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <span className="text-lg font-medium text-primary-700 dark:text-primary-200">Home</span>
          </div>
        </Link>
        <Link href="/physics" onClick={onClose}>
          <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors">
            <Calculator className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <span className="text-lg font-medium text-neutral-700 dark:text-neutral-200">Physics</span>
          </div>
        </Link>
        <Link href="/scientific" onClick={onClose}>
          <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors">
            <Calculator className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <span className="text-lg font-medium text-neutral-700 dark:text-neutral-200">Scientific</span>
          </div>
        </Link>
        <Link href="/graph" onClick={onClose}>
          <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors">
            <LineChart className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <span className="text-lg font-medium text-neutral-700 dark:text-neutral-200">Graph</span>
          </div>
        </Link>
        <Link href="/financial" onClick={onClose}>
          <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors">
            <DollarSign className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <span className="text-lg font-medium text-neutral-700 dark:text-neutral-200">Financial</span>
          </div>
        </Link>
        
        <div className="pt-8 w-full border-t border-neutral-200 dark:border-neutral-800 mt-6">
          {user ? (
            <div className="flex flex-col space-y-4 mt-6">
              <Link href="/profile" onClick={onClose}>
                <div className="flex items-center space-x-3 p-3 rounded-xl border border-primary-200 dark:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-900/50 transition-colors">
                  <UserCircle className="h-5 w-5 text-primary-500 dark:text-primary-400" />
                  <span className="text-lg font-medium text-primary-600 dark:text-primary-300">My Profile</span>
                </div>
              </Link>
              <button 
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="flex items-center justify-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 dark:from-primary-500 dark:to-primary-400 dark:hover:from-primary-400 dark:hover:to-primary-300 text-white font-medium shadow-md transition-all duration-300"
              >
                <LogOut className="h-5 w-5" />
                <span className="text-lg">Log out</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-4 mt-6">
              <Link href="/auth" onClick={onClose}>
                <div className="flex items-center justify-center p-3 rounded-xl border border-primary-200 dark:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-900/50 transition-colors">
                  <span className="text-lg font-medium text-primary-600 dark:text-primary-300">Log in</span>
                </div>
              </Link>
              <Link href="/auth" onClick={onClose}>
                <div className="flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 dark:from-primary-500 dark:to-primary-400 dark:hover:from-primary-400 dark:hover:to-primary-300 text-white font-medium shadow-md transition-all duration-300">
                  <span className="text-lg">Sign up</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
