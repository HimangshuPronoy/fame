import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

let globalListings = [];
let globalRequests = [];
let listeners = [];

const notify = () => listeners.forEach(l => l());

export const useStore = () => {
  const [listings, setListings] = useState(globalListings);
  const [requests] = useState(globalRequests);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(data);
      } else {
        setProfile(null);
      }
      notify();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchListings = useCallback(async () => {
    setLoading((currentLoading) => {
      if (currentLoading) return currentLoading;
      
      (async () => {
        try {
          const { data, error } = await supabase
            .from('listings')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) throw error;

          if (data && data.length > 0) {
            globalListings = data;
            setListings([...globalListings]);
          } else {
            // Seed mock data if DB is empty
            const seedData = [
              {
                name: 'Iron Temple Gym',
                category: 'Fitness',
                description: 'Elite training facility with Olympic-grade equipment.',
                location: 'Downtown District',
                image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
                price: '80',
                rating: 4.9,
                reviews: 128,
                is_featured: true
              },
              {
                name: 'Sage & Salt Bistro',
                category: 'Restaurant',
                description: 'Artisanal seasonal flavors in a nature-inspired setting.',
                location: 'Harbor Square',
                image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
                price: '120',
                rating: 4.8,
                reviews: 256,
                is_featured: false
              }
            ];
            
            // In a real app, we might not auto-seed, but for demonstration:
            // await supabase.from('listings').insert(seedData);
            globalListings = seedData;
            setListings([...globalListings]);
          }
        } catch (err) {
          console.error('Error fetching listings:', err);
        } finally {
          setLoading(false);
          notify();
        }
      })();

      return true;
    });
  }, []);

  useEffect(() => {
    // Initial fetch if empty
    if (globalListings.length === 0) {
      // Defer to avoid synchronous setState in effect warning
      const timer = setTimeout(() => {
        fetchListings();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [fetchListings]);

  const getCategories = () => {
    return Array.from(new Set(globalListings.map(l => l.category)));
  };

  const addListing = async (listing) => {
    const { data, error } = await supabase
      .from('listings')
      .insert([{ ...listing }])
      .select();

    if (!error && data) {
      globalListings = [data[0], ...globalListings];
      setListings([...globalListings]);
      notify();
    } else {
      console.error('Error adding listing:', error);
    }
  };

  const deleteListing = async (id) => {
    const { error } = await supabase
      .from('listings')
      .delete()
      .eq('id', id);

    if (!error) {
      globalListings = globalListings.filter(l => l.id !== id);
      setListings([...globalListings]);
      notify();
    } else {
      console.error('Error deleting listing:', error);
    }
  };

  const addRequest = async (request) => {
    const newRequest = { 
      ...request, 
      status: 'Pending', 
      date: new Date().toISOString().split('T')[0] 
    };
    
    globalRequests = [newRequest, ...globalRequests];
    notify();
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const signUp = async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return { 
    listings, 
    requests, 
    user, 
    profile, 
    loading, 
    addListing, 
    deleteListing, 
    addRequest, 
    getCategories, 
    fetchListings,
    signIn,
    signUp,
    signOut
  };
};
