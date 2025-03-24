import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Home, Calculator, LineChart, PieChart, DollarSign, UserCircle, LogOut, ArrowRight } from "lucide-react";

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
    <div className="md:hidden fixed top-0 inset-x-0 z-50 h-screen bg-white/95 dark:bg-[#27112c]/95 backdrop-blur-md px-6 py-8 overflow-y-auto">
      <div className="flex justify-end">
        <button 
          onClick={onClose}
          className="text-[#9200b3] hover:text-[#e100ff] dark:text-[#eb4ff3] dark:hover:text-[#f677f8] p-2 hover:bg-[#ffe6fe]/60 dark:hover:bg-[#520e5b]/60 rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="flex flex-col mt-10 space-y-5">
        <Link href="/" onClick={onClose}>
          <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-[#ffe6fe]/60 dark:hover:bg-[#520e5b]/40 transition-colors">
            <Home className="h-5 w-5 text-[#e100ff] dark:text-[#eb4ff3]" />
            <span className="text-lg font-medium text-[#9200b3] dark:text-[#eb4ff3]">Home</span>
          </div>
        </Link>
        <Link href="/physics" onClick={onClose}>
          <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-[#ffe6fe]/60 dark:hover:bg-[#520e5b]/40 transition-colors">
            <Calculator className="h-5 w-5 text-[#e100ff] dark:text-[#eb4ff3]" />
            <span className="text-lg font-medium text-neutral-700 dark:text-neutral-200">Physics</span>
          </div>
        </Link>
        <Link href="/scientific" onClick={onClose}>
          <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-[#ffe6fe]/60 dark:hover:bg-[#520e5b]/40 transition-colors">
            <Calculator className="h-5 w-5 text-[#e100ff] dark:text-[#eb4ff3]" />
            <span className="text-lg font-medium text-neutral-700 dark:text-neutral-200">Scientific</span>
          </div>
        </Link>
        <Link href="/graph" onClick={onClose}>
          <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-[#ffe6fe]/60 dark:hover:bg-[#520e5b]/40 transition-colors">
            <LineChart className="h-5 w-5 text-[#e100ff] dark:text-[#eb4ff3]" />
            <span className="text-lg font-medium text-neutral-700 dark:text-neutral-200">Graph</span>
          </div>
        </Link>
        <Link href="/financial" onClick={onClose}>
          <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-[#ffe6fe]/60 dark:hover:bg-[#520e5b]/40 transition-colors">
            <DollarSign className="h-5 w-5 text-[#e100ff] dark:text-[#eb4ff3]" />
            <span className="text-lg font-medium text-neutral-700 dark:text-neutral-200">Financial</span>
          </div>
        </Link>
        
        <div className="pt-8 w-full border-t border-[#ffa3fd]/30 dark:border-[#520e5b] mt-6">
          {user ? (
            <div className="flex flex-col space-y-4 mt-6">
              <Link href="/profile" onClick={onClose}>
                <div className="flex items-center space-x-3 p-3.5 rounded-xl border border-[#fd7aff]/30 dark:border-[#700b7e]/80 hover:bg-[#ffe6fe]/60 dark:hover:bg-[#520e5b]/40 transition-colors group">
                  <UserCircle className="h-5 w-5 text-[#e100ff] dark:text-[#d727e8]" />
                  <span className="text-lg font-medium text-[#9200b3] dark:text-[#eb4ff3]">My Profile</span>
                  <ArrowRight className="h-5 w-5 ml-auto text-[#e100ff]/0 dark:text-[#eb4ff3]/0 group-hover:text-[#e100ff] dark:group-hover:text-[#eb4ff3] transition-all duration-300" />
                </div>
              </Link>
              <button 
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="flex items-center justify-center space-x-3 p-3.5 rounded-xl bg-gradient-to-r from-[#e100ff] to-[#b800d9] hover:from-[#ed29ff] hover:to-[#9200b3] dark:from-[#c203dc] dark:to-[#9907ad] dark:hover:from-[#d727e8] dark:hover:to-[#700b7e] text-white font-medium shadow-md hover:shadow-[#fd7aff]/30 dark:hover:shadow-[#d727e8]/30 transition-all duration-300 group"
              >
                <LogOut className="h-5 w-5" />
                <span className="text-lg">Log out</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-4 mt-6">
              <Link href="/auth" onClick={onClose}>
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#fd7aff]/30 dark:border-[#700b7e]/80 hover:bg-[#ffe6fe]/60 dark:hover:bg-[#520e5b]/40 transition-colors group">
                  <span className="text-lg font-medium text-[#9200b3] dark:text-[#eb4ff3]">Log in</span>
                  <ArrowRight className="h-5 w-5 text-[#e100ff]/0 dark:text-[#eb4ff3]/0 group-hover:text-[#e100ff] dark:group-hover:text-[#eb4ff3] transition-all duration-300" />
                </div>
              </Link>
              <Link href="/auth" onClick={onClose}>
                <div className="flex items-center justify-center space-x-2 p-3.5 rounded-xl bg-gradient-to-r from-[#e100ff] to-[#b800d9] hover:from-[#ed29ff] hover:to-[#9200b3] dark:from-[#c203dc] dark:to-[#9907ad] dark:hover:from-[#d727e8] dark:hover:to-[#700b7e] text-white font-medium shadow-md hover:shadow-[#fd7aff]/30 dark:hover:shadow-[#d727e8]/30 transition-all duration-300 group">
                  <span className="text-lg">Sign up</span>
                  <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
