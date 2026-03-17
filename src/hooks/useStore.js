import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

let globalListings = [];
let globalRequests = [];
let listeners = [];

const notify = () => listeners.forEach(l => l());

export const useStore = () => {
  const [listings, setListings] = useState(globalListings);
  const [requests, setRequests] = useState(globalRequests);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchListings = async () => {
    setLoading(true);
    // Dynamic Mock Data for Lifestyle Discovery
    const mockLifestyleData = [
      {
        id: '1',
        name: 'Iron Temple Gym',
        category: 'Fitness',
        description: 'Elite training facility with Olympic-grade equipment and expert coaching.',
        location: 'Downtown District',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
        price: '80',
        rating: 4.9,
        reviews: 128,
        isFeatured: true
      },
      {
        id: '2',
        name: 'Sage & Salt Bistro',
        category: 'Restaurant',
        description: 'Artisanal seasonal flavors served in an intimate, nature-inspired setting.',
        location: 'Harbor Square',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
        price: '120',
        rating: 4.8,
        reviews: 256,
        isFeatured: false
      },
      {
        id: '3',
        name: 'The Velvet Lounge',
        category: 'Nightlife',
        description: 'Exclusive cocktails and deep house rhythms in a hidden underground vault.',
        location: 'Metro Center',
        image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80',
        price: '150',
        rating: 4.7,
        reviews: 89,
        isFeatured: true
      },
      {
        id: '4',
        name: 'Elysian Wellness Spa',
        category: 'Wellness',
        description: 'Holistic rejuvenation with thermal pools and therapeutic mud treatments.',
        location: 'West Hills',
        image: 'https://images.unsplash.com/photo-1544161515-4af6b1d462c2?auto=format&fit=crop&w=800&q=80',
        price: '200',
        rating: 5.0,
        reviews: 412,
        isFeatured: false
      },
      {
        id: '5',
        name: 'Loom & Thread Boutique',
        category: 'Shopping',
        description: 'Curated sustainable fashion and hand-numbered artisanal leather goods.',
        location: 'Arts District',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
        price: '45',
        rating: 4.6,
        reviews: 74,
        isFeatured: false
      },
      {
        id: '6',
        name: 'Horizon Yoga Studio',
        category: 'Fitness',
        description: 'Panoramic views and meditative flow sessions for every skill level.',
        location: 'Skyline Plaza',
        image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=800&q=80',
        price: '30',
        rating: 4.9,
        reviews: 156,
        isFeatured: true
      }
    ];

    globalListings = mockLifestyleData;
    setListings([...globalListings]);
    setLoading(false);
  };

  useEffect(() => {
    // Initial fetch if empty
    if (globalListings.length === 0) {
      fetchListings();
    }
  }, []);

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
    
    // Fallback to local if table doesn't exist yet, but ideally we'd have a 'requests' table
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
