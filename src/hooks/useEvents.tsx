import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Event {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  brand: string;
  createdAt: string;
  price: number;
}

export interface RegisteredEvent {
  id: string;
  event_id: string;
  event_title: string;
  event_description: string;
  event_image: string;
  registered_at: string;
}

// Fetch events from the API
export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: async (): Promise<Event[]> => {
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      
      // Transform products to events
      return data.products.map((product: any) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        thumbnail: product.thumbnail,
        category: product.category,
        brand: product.brand || 'Event Organizer',
        createdAt: new Date().toISOString(), // Mock date
        price: product.price,
      }));
    },
  });
}

// Fetch single event by ID
export function useEvent(id: string) {
  return useQuery({
    queryKey: ['event', id],
    queryFn: async (): Promise<Event> => {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch event');
      }
      const product = await response.json();
      
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        thumbnail: product.thumbnail,
        category: product.category,
        brand: product.brand || 'Event Organizer',
        createdAt: new Date().toISOString(),
        price: product.price,
      };
    },
    enabled: !!id,
  });
}

// Register for an event
export function useRegisterEvent() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (event: Event) => {
      if (!user) throw new Error('Must be logged in to register');

      const { error } = await supabase
        .from('registered_events')
        .insert({
          user_id: user.id,
          event_id: event.id.toString(),
          event_title: event.title,
          event_description: event.description,
          event_image: event.thumbnail,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registeredEvents'] });
    },
  });
}

// Get registered events for current user
export function useRegisteredEvents() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['registeredEvents', user?.id],
    queryFn: async (): Promise<RegisteredEvent[]> => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('registered_events')
        .select('*')
        .eq('user_id', user.id)
        .order('registered_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}

// Check if user is registered for an event
export function useIsRegistered(eventId: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['isRegistered', eventId, user?.id],
    queryFn: async (): Promise<boolean> => {
      if (!user) return false;

      const { data, error } = await supabase
        .from('registered_events')
        .select('id')
        .eq('user_id', user.id)
        .eq('event_id', eventId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return !!data;
    },
    enabled: !!user && !!eventId,
  });
}