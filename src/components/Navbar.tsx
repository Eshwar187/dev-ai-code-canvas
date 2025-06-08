
import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Github, LogOut } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface NavbarProps {
  isAuthenticated?: boolean;
  onLogin?: () => void;
  onSignup?: () => void;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isAuthenticated = false,
  onLogin,
  onSignup,
  onLogout
}) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-electric-blue to-emerald-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-electric-blue to-emerald-green bg-clip-text text-transparent">
              AI Code Analyzer
            </span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 h-9 p-0 hover:bg-accent/50 smooth-transition"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 electric-blue" />
              ) : (
                <Moon className="h-4 w-4 electric-blue" />
              )}
            </Button>

            {/* Authentication Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="text-muted-foreground hover:text-foreground smooth-transition"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogin}
                  className="text-muted-foreground hover:text-foreground smooth-transition"
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={onSignup}
                  className="bg-gradient-to-r from-electric-blue to-emerald-green hover:opacity-90 smooth-transition shadow-lg hover:shadow-xl"
                >
                  <Github className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
