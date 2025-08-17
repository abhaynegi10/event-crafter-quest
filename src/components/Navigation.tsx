import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, User, Home, LogIn } from 'lucide-react';

export default function Navigation() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Event Explorer</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/events">
              <Button 
                variant={location.pathname === '/events' ? 'default' : 'ghost'}
                size="sm"
              >
                <Home className="h-4 w-4 mr-2" />
                Events
              </Button>
            </Link>

            {user ? (
              <Link to="/profile">
                <Button 
                  variant={location.pathname === '/profile' ? 'default' : 'ghost'}
                  size="sm"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button 
                  variant={location.pathname === '/auth' ? 'default' : 'ghost'}
                  size="sm"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}