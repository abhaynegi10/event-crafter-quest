import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Amazing{' '}
            <span className="text-primary">Events</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find and register for exciting events happening around you. 
            Connect with like-minded people and create unforgettable memories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/events">
              <Button size="lg" className="w-full sm:w-auto">
                Explore Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            {!user && (
              <Link to="/auth">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Sign Up Free
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Event Explorer?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Easy Discovery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Browse through hundreds of events with our intuitive interface. 
                  Filter by category, date, and location to find exactly what you're looking for.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Simple Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Register for events with just one click. Keep track of all your 
                  registered events in your personal dashboard.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Local & Global</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Discover both local community events and global online experiences. 
                  From workshops to conferences, we have it all.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of event enthusiasts and start your journey today.
          </p>
          <Link to="/events">
            <Button size="lg">
              Browse Events Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
