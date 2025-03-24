import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { ArrowRight, Sparkles, UserPlus, User, Lightbulb, Star, Save, HeartHandshake } from "lucide-react";

export function CTASection() {
  const { user } = useAuth();
  
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background with gradient and blur effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e100ff] via-[#b800d9] to-[#6e008c] dark:from-[#c203dc] dark:via-[#9907ad] dark:to-[#520e5b] z-0">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#ffa3fd] dark:bg-[#f677f8] rounded-full filter blur-3xl opacity-10 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-64 sm:w-80 h-64 sm:h-80 bg-[#fd7aff] dark:bg-[#eb4ff3] rounded-full filter blur-3xl opacity-10 animate-float" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 left-1/3 transform -translate-y-1/2 w-56 sm:w-64 h-56 sm:h-64 bg-[#f652ff] dark:bg-[#d727e8] rounded-full filter blur-3xl opacity-15 animate-float" style={{animationDelay: '0.7s'}}></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="inline-flex items-center px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
          <Sparkles className="h-4 w-4 mr-2 text-[#ffa3fd] dark:text-[#f677f8]" />
          <span className="text-sm font-medium text-white">Premium Features Available</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-6 text-white max-w-4xl mx-auto leading-tight">
          Ready to <span className="bg-gradient-to-r from-white to-[#ffa3fd] dark:from-white dark:to-[#f677f8] bg-clip-text text-transparent">Unlock Advanced</span> Features?
        </h2>
        
        <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-white/90 leading-relaxed">
          {user 
            ? "Save your calculations, access advanced features, and take your physics knowledge to the next level. Sync your data across devices and get premium support."
            : "Create an account to save your calculations, access advanced features, and take your physics knowledge to the next level. Join our community of engineers and scientists today!"
          }
        </p>
        
        {/* Feature highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:border-[#fd7aff]/40 dark:hover:border-[#eb4ff3]/40 group hover:scale-[1.02]">
            <div className="bg-gradient-to-br from-[#f652ff]/80 to-[#b800d9]/80 dark:from-[#d727e8]/80 dark:to-[#9907ad]/80 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#f652ff]/20 dark:shadow-[#d727e8]/20 group-hover:shadow-[#f652ff]/30 dark:group-hover:shadow-[#d727e8]/30 transition-all duration-300">
              <Star className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Advanced Formulas</h3>
            <p className="text-white/80">Access complex formulas and specialized calculations for all your engineering needs</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:border-[#fd7aff]/40 dark:hover:border-[#eb4ff3]/40 group hover:scale-[1.02]">
            <div className="bg-gradient-to-br from-[#f652ff]/80 to-[#b800d9]/80 dark:from-[#d727e8]/80 dark:to-[#9907ad]/80 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#f652ff]/20 dark:shadow-[#d727e8]/20 group-hover:shadow-[#f652ff]/30 dark:group-hover:shadow-[#d727e8]/30 transition-all duration-300">
              <Save className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Save Progress</h3>
            <p className="text-white/80">Store your calculations and access them anytime, anywhere with cloud synchronization</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:border-[#fd7aff]/40 dark:hover:border-[#eb4ff3]/40 group hover:scale-[1.02]">
            <div className="bg-gradient-to-br from-[#f652ff]/80 to-[#b800d9]/80 dark:from-[#d727e8]/80 dark:to-[#9907ad]/80 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#f652ff]/20 dark:shadow-[#d727e8]/20 group-hover:shadow-[#f652ff]/30 dark:group-hover:shadow-[#d727e8]/30 transition-all duration-300">
              <HeartHandshake className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Premium Support</h3>
            <p className="text-white/80">Get prioritized help from our team of physics experts whenever you need it</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          {user ? (
            <Link href="/profile">
              <span className="group w-full sm:w-auto px-6 sm:px-8 py-4 bg-white hover:bg-[#ffe6fe] text-[#9200b3] dark:text-[#c203dc] font-medium rounded-full shadow-xl hover:shadow-[#fd7aff]/30 dark:hover:shadow-[#eb4ff3]/30 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer inline-flex items-center justify-center">
                <User className="mr-2 h-5 w-5" />
                <span>My Profile</span>
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ) : (
            <Link href="/auth">
              <span className="group w-full sm:w-auto px-6 sm:px-8 py-4 bg-white hover:bg-[#ffe6fe] text-[#9200b3] dark:text-[#c203dc] font-medium rounded-full shadow-xl hover:shadow-[#fd7aff]/30 dark:hover:shadow-[#eb4ff3]/30 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer inline-flex items-center justify-center">
                <UserPlus className="mr-2 h-5 w-5" />
                <span>Sign Up Free</span>
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          )}
          <Link href="#calculators">
            <span className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-transparent hover:bg-white/10 border border-white/50 hover:border-white font-medium rounded-full transition-all duration-300 cursor-pointer inline-flex items-center justify-center group">
              <Lightbulb className="mr-2 h-5 w-5 text-[#ffa3fd] dark:text-[#f677f8]" />
              <span className="text-white">Learn More</span>
              <ArrowRight className="ml-2 h-5 w-5 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-white" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
