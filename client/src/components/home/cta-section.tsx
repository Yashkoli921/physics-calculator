import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";

export function CTASection() {
  const { user } = useAuth();
  
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-primary-900 to-secondary-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
          Ready to Master Physics Calculations?
        </h2>
        <p className="max-w-2xl mx-auto text-lg opacity-90 mb-8">
          {user 
            ? "Save your calculations, access advanced features, and take your physics knowledge to the next level."
            : "Create an account to save your calculations, access advanced features, and take your physics knowledge to the next level."
          }
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          {user ? (
            <Link href="/profile">
              <span className="px-8 py-3 bg-white text-primary-700 hover:bg-neutral-100 font-medium rounded-lg shadow-lg transition cursor-pointer inline-block">
                My Profile
              </span>
            </Link>
          ) : (
            <Link href="/auth">
              <span className="px-8 py-3 bg-white text-primary-700 hover:bg-neutral-100 font-medium rounded-lg shadow-lg transition cursor-pointer inline-block">
                Sign Up Free
              </span>
            </Link>
          )}
          <Link href="#calculators">
            <span className="px-8 py-3 bg-transparent hover:bg-primary-800/50 border border-white font-medium rounded-lg transition cursor-pointer inline-block">
              Learn More
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
