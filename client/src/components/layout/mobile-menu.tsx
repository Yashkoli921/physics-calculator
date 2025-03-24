import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";

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
    <div className="md:hidden bg-white dark:bg-neutral-800 shadow-lg">
      <div className="container mx-auto px-4 py-3 space-y-3">
        <Link href="/" onClick={onClose}>
          <span className="block py-2 text-primary-700 dark:text-primary-100 font-medium cursor-pointer">Home</span>
        </Link>
        <Link href="/physics" onClick={onClose}>
          <span className="block py-2 text-neutral-600 dark:text-neutral-300 font-medium cursor-pointer">Physics</span>
        </Link>
        <Link href="/scientific" onClick={onClose}>
          <span className="block py-2 text-neutral-600 dark:text-neutral-300 font-medium cursor-pointer">Scientific</span>
        </Link>
        <Link href="/graph" onClick={onClose}>
          <span className="block py-2 text-neutral-600 dark:text-neutral-300 font-medium cursor-pointer">Graph</span>
        </Link>
        <Link href="/financial" onClick={onClose}>
          <span className="block py-2 text-neutral-600 dark:text-neutral-300 font-medium cursor-pointer">Financial</span>
        </Link>
        
        <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700">
          {user ? (
            <>
              <Link href="/profile" onClick={onClose}>
                <span className="block py-2 text-primary-500 font-medium cursor-pointer">My Profile</span>
              </Link>
              <button 
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="block w-full py-2 mt-2 bg-primary-500 text-white font-medium text-center rounded-lg shadow-md"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth" onClick={onClose}>
                <span className="block py-2 text-primary-500 font-medium cursor-pointer">Log in</span>
              </Link>
              <Link href="/auth" onClick={onClose}>
                <span className="block py-2 mt-2 bg-primary-500 text-white font-medium text-center rounded-lg shadow-md cursor-pointer">Sign up</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
