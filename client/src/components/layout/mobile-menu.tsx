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
          <a className="block py-2 text-primary-700 dark:text-primary-100 font-medium">Home</a>
        </Link>
        <Link href="/#calculators" onClick={onClose}>
          <a className="block py-2 text-neutral-600 dark:text-neutral-300 font-medium">Calculators</a>
        </Link>
        <a href="#" className="block py-2 text-neutral-600 dark:text-neutral-300 font-medium">Formulas</a>
        <a href="#" className="block py-2 text-neutral-600 dark:text-neutral-300 font-medium">About</a>
        
        <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700">
          {user ? (
            <>
              <Link href="/profile" onClick={onClose}>
                <a className="block py-2 text-primary-500 font-medium">My Profile</a>
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
                <a className="block py-2 text-primary-500 font-medium">Log in</a>
              </Link>
              <Link href="/auth" onClick={onClose}>
                <a className="block py-2 mt-2 bg-primary-500 text-white font-medium text-center rounded-lg shadow-md">Sign up</a>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
