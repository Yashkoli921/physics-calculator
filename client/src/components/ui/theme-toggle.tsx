import { useTheme } from "@/hooks/use-theme";
import { Switch } from "@/components/ui/switch";
import { Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="relative inline-flex items-center w-10 mr-2 align-middle select-none">
      <Switch 
        checked={theme === "dark"} 
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        id="theme-toggle" 
        className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
      />
      <Moon className="ml-12 w-5 h-5 dark:text-neutral-200" />
    </div>
  );
}
