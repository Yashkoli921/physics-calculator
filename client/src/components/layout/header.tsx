import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useState } from "react";
import { CalculatorIcon } from "lucide-react";
import { Link } from "wouter";
import { MobileMenu } from "./mobile-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logoutMutation } = useAuth();
  
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-neutral-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="bg-primary-500 text-white p-2 rounded-lg">
              <CalculatorIcon className="h-5 w-5" />
            </div>
            <h1 className="font-heading font-bold text-xl md:text-2xl text-primary-700 dark:text-primary-100">
              Physics Calculator
            </h1>
          </div>
        </Link>
        
        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/">
            <span className="font-medium text-primary-700 dark:text-primary-100 cursor-pointer">Home</span>
          </Link>
          <Link href="/physics">
            <span className="font-medium text-neutral-600 hover:text-primary-500 dark:text-neutral-300 dark:hover:text-primary-300 transition cursor-pointer">Physics</span>
          </Link>
          <Link href="/scientific">
            <span className="font-medium text-neutral-600 hover:text-primary-500 dark:text-neutral-300 dark:hover:text-primary-300 transition cursor-pointer">Scientific</span>
          </Link>
          <Link href="/graph">
            <span className="font-medium text-neutral-600 hover:text-primary-500 dark:text-neutral-300 dark:hover:text-primary-300 transition cursor-pointer">Graph</span>
          </Link>
          <Link href="/financial">
            <span className="font-medium text-neutral-600 hover:text-primary-500 dark:text-neutral-300 dark:hover:text-primary-300 transition cursor-pointer">Financial</span>
          </Link>
        </nav>
        
        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <ThemeToggle />
          
          {/* Login/Signup or User Menu */}
          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/profile">
                <Button variant="outline" className="font-medium">
                  My Profile
                </Button>
              </Link>
              <Button 
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                className="font-medium"
              >
                Log out
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/auth">
                <span className="px-4 py-2 font-medium text-primary-500 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-100 transition cursor-pointer">
                  Log in
                </span>
              </Link>
              <Link href="/auth">
                <span className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg shadow-md transition cursor-pointer">
                  Sign up
                </span>
              </Link>
            </div>
          )}
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-neutral-700 dark:text-neutral-200"
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
