import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useState } from "react";
import { CalculatorIcon, UserCircle, LogOut, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { MobileMenu } from "./mobile-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logoutMutation } = useAuth();
  
  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#27112c]/95 backdrop-blur-md shadow-lg border-b border-[#ffa3fd]/20 dark:border-[#520e5b]/60">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className="bg-gradient-to-br from-[#f652ff] to-[#b800d9] dark:from-[#d727e8] dark:to-[#9907ad] text-white p-2.5 rounded-xl shadow-md group-hover:shadow-[#f652ff]/30 dark:group-hover:shadow-[#d727e8]/30 transition-all duration-300 group-hover:scale-105">
              <CalculatorIcon className="h-5 w-5" />
            </div>
            <h1 className="font-heading font-bold text-xl md:text-2xl bg-gradient-to-r from-[#9200b3] to-[#e100ff] dark:from-[#d727e8] dark:to-[#eb4ff3] bg-clip-text text-transparent group-hover:from-[#b800d9] group-hover:to-[#f652ff] dark:group-hover:from-[#eb4ff3] dark:group-hover:to-[#f677f8] transition-all duration-300">
              Physics Calculator
            </h1>
          </div>
        </Link>
        
        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-10">
          <Link href="/">
            <span className="font-medium text-[#9200b3] dark:text-[#eb4ff3] cursor-pointer hover:text-[#e100ff] dark:hover:text-[#f677f8] transition">Home</span>
          </Link>
          <Link href="/physics">
            <span className="font-medium text-neutral-600 hover:text-[#e100ff] dark:text-neutral-300 dark:hover:text-[#eb4ff3] transition cursor-pointer">Physics</span>
          </Link>
          <Link href="/scientific">
            <span className="font-medium text-neutral-600 hover:text-[#e100ff] dark:text-neutral-300 dark:hover:text-[#eb4ff3] transition cursor-pointer">Scientific</span>
          </Link>
          <Link href="/graph">
            <span className="font-medium text-neutral-600 hover:text-[#e100ff] dark:text-neutral-300 dark:hover:text-[#eb4ff3] transition cursor-pointer">Graph</span>
          </Link>
          <Link href="/financial">
            <span className="font-medium text-neutral-600 hover:text-[#e100ff] dark:text-neutral-300 dark:hover:text-[#eb4ff3] transition cursor-pointer">Financial</span>
          </Link>
        </nav>
        
        {/* User Actions */}
        <div className="flex items-center">
          {/* Dark Mode Toggle */}
          <div className="mr-8 border border-[#ffa3fd]/30 dark:border-[#520e5b] p-1.5 rounded-full bg-white/50 dark:bg-[#3d0f45]/30 shadow-sm">
            <ThemeToggle />
          </div>
          
          {/* Login/Signup or User Menu */}
          {user ? (
            <div className="hidden md:flex items-center space-x-5">
              <Link href="/profile">
                <Button variant="outline" className="font-medium rounded-full pl-3 pr-4 py-2 flex items-center space-x-2 hover:bg-[#ffe6fe] dark:hover:bg-[#3d0f45] border-[#fd7aff]/30 dark:border-[#700b7e]/80 text-[#9200b3] dark:text-[#eb4ff3]">
                  <UserCircle className="h-5 w-5 text-[#e100ff] dark:text-[#d727e8]" />
                  <span>Profile</span>
                </Button>
              </Link>
              <Button 
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                className="font-medium rounded-full pl-3 pr-4 py-2 flex items-center space-x-2 bg-gradient-to-r from-[#e100ff] to-[#b800d9] hover:from-[#ed29ff] hover:to-[#9200b3] dark:from-[#c203dc] dark:to-[#9907ad] dark:hover:from-[#d727e8] dark:hover:to-[#700b7e] shadow-md hover:shadow-[#fd7aff]/30 dark:hover:shadow-[#d727e8]/30"
              >
                <LogOut className="h-5 w-5" />
                <span>Log out</span>
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-5">
              <Link href="/auth">
                <span className="px-5 py-2.5 font-medium text-[#9200b3] hover:text-[#b800d9] dark:text-[#eb4ff3] dark:hover:text-[#f677f8] transition cursor-pointer border border-transparent hover:border-[#fd7aff]/40 dark:hover:border-[#d727e8]/40 rounded-full hover:bg-[#ffe6fe]/50 dark:hover:bg-[#520e5b]/30 group inline-flex items-center">
                  <span>Log in</span>
                  <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </span>
              </Link>
              <Link href="/auth">
                <span className="px-6 py-2.5 bg-gradient-to-r from-[#e100ff] to-[#b800d9] hover:from-[#ed29ff] hover:to-[#9200b3] dark:from-[#c203dc] dark:to-[#9907ad] dark:hover:from-[#d727e8] dark:hover:to-[#700b7e] text-white font-medium rounded-full shadow-md hover:shadow-lg hover:shadow-[#fd7aff]/30 dark:hover:shadow-[#d727e8]/30 transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 inline-flex items-center group">
                  <span>Sign up</span>
                  <ArrowRight className="ml-1.5 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          )}
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden ml-4 text-[#9200b3] dark:text-[#eb4ff3] p-2 rounded-full hover:bg-[#ffe6fe]/60 dark:hover:bg-[#520e5b]/60 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}
