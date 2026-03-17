-- Listings Table
CREATE TABLE listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  location TEXT,
  image TEXT,
  price TEXT,
  rating DECIMAL DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for listings
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Policies for listings
CREATE POLICY "Listings are viewable by everyone" ON listings
  FOR SELECT USING (true);

-- Allow authenticated users to insert if they are the owner
CREATE POLICY "Users can create listings" ON listings
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update own listings" ON listings
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Owners can delete own listings" ON listings
  FOR DELETE USING (auth.uid() = owner_id);
