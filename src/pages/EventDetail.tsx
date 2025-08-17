import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useEvent, useRegisterEvent, useIsRegistered } from '@/hooks/useEvents';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Calendar, MapPin, DollarSign, ArrowLeft, User, Check } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const { data: event, isLoading, error } = useEvent(id || '');
  const { data: isRegistered, isLoading: isRegisteredLoading } = useIsRegistered(id || '');
  const registerMutation = useRegisterEvent();

  const handleRegister = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to register for events.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    if (!event) return;

    try {
      await registerMutation.mutateAsync(event);
      toast({
        title: "Successfully Registered!",
        description: `You have registered for ${event.title}`,
      });
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to register for event",
        variant: "destructive",
      });
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">Event Not Found</h1>
          <p className="text-muted-foreground mb-4">The event you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/events')} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton className="h-64 w-full mb-6" />
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-1/2 mb-6" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!event) return null;

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="aspect-video overflow-hidden rounded-lg mb-6">
            <img
              src={event.thumbnail}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">{event.category}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4 mr-1" />
                  ${event.price}
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date().toLocaleDateString()} {/* Mock date */}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.brand}
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Event Organizer
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-semibold mb-3">About This Event</h2>
              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-semibold mb-3">Event Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-1">Category</h3>
                  <p className="text-muted-foreground">{event.category}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Organizer</h3>
                  <p className="text-muted-foreground">{event.brand}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Price</h3>
                  <p className="text-muted-foreground">${event.price}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Event ID</h3>
                  <p className="text-muted-foreground">#{event.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Register for Event</CardTitle>
              <CardDescription>
                Join this amazing event and connect with like-minded people
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!user ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Sign in to register for this event
                  </p>
                  <Button 
                    onClick={() => navigate('/auth')} 
                    className="w-full"
                  >
                    Sign In to Register
                  </Button>
                </div>
              ) : isRegisteredLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : isRegistered ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <Check className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-green-600 font-medium">Already Registered!</span>
                  </div>
                  <Button 
                    onClick={() => navigate('/profile')} 
                    variant="outline" 
                    className="w-full"
                  >
                    View My Events
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleRegister} 
                  disabled={registerMutation.isPending}
                  className="w-full"
                >
                  {registerMutation.isPending ? 'Registering...' : 'Register Now'}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}