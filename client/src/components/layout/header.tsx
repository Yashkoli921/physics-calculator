import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useState } from "react";
import { CalculatorIcon, UserCircle, LogOut } from "lucide-react";
import { Link } from "wouter";
import { MobileMenu } from "./mobile-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logoutMutation } = useAuth();
  
  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-neutral-900/95 backdrop-blur-md shadow-lg border-b border-primary-100 dark:border-primary-900">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className="bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600 text-white p-2.5 rounded-xl shadow-md group-hover:shadow-primary-300/30 dark:group-hover:shadow-primary-600/30 transition-all duration-300 group-hover:scale-105">
              <CalculatorIcon className="h-5 w-5" />
            </div>
            <h1 className="font-heading font-bold text-xl md:text-2xl bg-gradient-to-r from-primary-700 to-primary-500 dark:from-primary-300 dark:to-primary-500 bg-clip-text text-transparent group-hover:from-primary-600 group-hover:to-primary-400 dark:group-hover:from-primary-200 dark:group-hover:to-primary-400 transition-all duration-300">
              Physics Calculator
            </h1>
          </div>
        </Link>
        
        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-10">
          <Link href="/">
            <span className="font-medium text-primary-700 dark:text-primary-200 cursor-pointer hover:text-primary-500 dark:hover:text-primary-300 transition">Home</span>
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
        <div className="flex items-center">
          {/* Dark Mode Toggle */}
          <div className="mr-6">
            <ThemeToggle />
          </div>
          
          {/* Login/Signup or User Menu */}
          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/profile">
                <Button variant="outline" className="font-medium rounded-full pl-3 pr-4 py-2 flex items-center space-x-2 hover:bg-primary-50 dark:hover:bg-primary-900 border-primary-200 dark:border-primary-800">
                  <UserCircle className="h-5 w-5 text-primary-500 dark:text-primary-400" />
                  <span>Profile</span>
                </Button>
              </Link>
              <Button 
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                className="font-medium rounded-full pl-3 pr-4 py-2 flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-500"
              >
                <LogOut className="h-5 w-5" />
                <span>Log out</span>
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/auth">
                <span className="px-5 py-2 font-medium text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-100 transition cursor-pointer border border-transparent hover:border-primary-200 dark:hover:border-primary-800 rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/50">
                  Log in
                </span>
              </Link>
              <Link href="/auth">
                <span className="px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 dark:from-primary-500 dark:to-primary-400 dark:hover:from-primary-400 dark:hover:to-primary-300 text-white font-medium rounded-full shadow-md hover:shadow-lg hover:shadow-primary-400/20 dark:hover:shadow-primary-700/30 transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5">
                  Sign up
                </span>
              </Link>
            </div>
          )}
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden ml-4 text-neutral-700 dark:text-neutral-200 p-1 rounded-md hover:bg-primary-100 dark:hover:bg-primary-900 transition"
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
