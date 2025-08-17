import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useRegisteredEvents } from '@/hooks/useEvents';
import { useToast } from '@/hooks/use-toast';
import { Calendar, MapPin, User, LogOut, ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';

export default function Profile() {
  const { user, signOut, loading: authLoading } = useAuth();
  const { data: registeredEvents, isLoading } = useRegisteredEvents();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
          </Card>
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        onClick={() => navigate('/events')} 
        variant="ghost" 
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Events
      </Button>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle>My Profile</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
              </div>
              <Button onClick={handleSignOut} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Registered Events</CardTitle>
            <CardDescription>
              Events you have registered for
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <Skeleton className="h-16 w-16" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : registeredEvents && registeredEvents.length > 0 ? (
              <div className="space-y-4">
                {registeredEvents.map((event) => (
                  <Link 
                    key={event.id} 
                    to={`/event/${event.event_id}`}
                    className="block"
                  >
                    <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                      <img
                        src={event.event_image}
                        alt={event.event_title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{event.event_title}</h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {event.event_description}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            Registered on {new Date(event.registered_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">Registered</Badge>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Events Registered</h3>
                <p className="text-muted-foreground mb-4">
                  You haven't registered for any events yet.
                </p>
                <Button onClick={() => navigate('/events')}>
                  Discover Events
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}