import { useState, useMemo } from 'react';
import { useStore } from '../hooks/useStore';
import FilterSidebar from '../components/FilterSidebar';
import LocationTabs from '../components/LocationTabs';
import ListingCard from '../components/ListingCard';
import { X, SlidersHorizontal, Search as SearchIcon } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const ListingPage = () => {
  const { listings } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get('cat');
  
  // States for filtering
  const [selectedCats, setSelectedCats] = useState(catParam ? [catParam] : []);
  const [selectedLocation, setSelectedLocation] = useState('All');
  
  // Update selectedCats when URL param changes
  useState(() => {
    if (catParam && !selectedCats.includes(catParam)) {
      setSelectedCats([catParam]);
    }
  }, [catParam]);
  const [priceRange, setPriceRange] = useState(null);
  const [radius, setRadius] = useState(25);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const searchQuery = searchParams.get('q') || '';

  // Data to display (use store data or fallback)
  const allData = useMemo(() => {
    if (listings.length > 0) return listings;
    return [
      { id: 'm1', name: 'Luxe Sky Lounge', category: 'Nightlife', price: '45', reviews: 120, location: 'Downtown', image: 'https://images.unsplash.com/photo-1574091678382-728b7f8842e4?auto=format&fit=crop&w=800&q=80' },
      { id: 'm2', name: 'Urban Green Gym', category: 'Fitness', price: '12', reviews: 85, location: 'East Side', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' },
      { id: 'm3', name: 'Artisan Bowl', category: 'Restaurant', price: '22', reviews: 210, location: 'North District', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80' },
      { id: 'm4', name: 'Silk Road Spa', category: 'Wellness', price: '85', reviews: 45, location: 'West End', image: 'https://images.unsplash.com/photo-1544161515-4af6b1d462c2?auto=format&fit=crop&w=800&q=80' },
      { id: 'm5', name: 'Neon Arcade', category: 'Nightlife', price: '15', reviews: 67, location: 'Metro Mall', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80' },
      { id: 'm6', name: 'Copper & Oak', category: 'Restaurant', price: '35', reviews: 156, location: 'History District', image: 'https://images.unsplash.com/photo-1550966841-3ee5ad443542?auto=format&fit=crop&w=800&q=80' }
    ];
  }, [listings]);

  // Filtering Logic
  const filteredListings = useMemo(() => {
    return allData.filter(item => {
      // Category Match
      const matchCat = selectedCats.length === 0 || 
                       selectedCats.includes(item.category) || 
                       (selectedCats.includes('Restaurant') && item.category === 'Restaurants') ||
                       (selectedCats.includes('Restaurants') && item.category === 'Restaurant');

      // Location Match
      const matchLoc = selectedLocation === 'All' || 
                       item.location.toLowerCase().includes(selectedLocation.toLowerCase()) || 
                       selectedLocation.toLowerCase().includes(item.location.toLowerCase());

      // Price Match
      const itemPrice = parseInt(item.price);
      const matchPrice = !priceRange || (itemPrice >= priceRange.min && itemPrice <= priceRange.max);

      // Search Match
      const matchSearch = !searchQuery || 
                          item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Radius Match (Mock logic: higher frequency IDs are more "local" for demo)
      const mockDistance = (parseInt(item.id) % 25) || 5;
      const matchRadius = mockDistance <= radius;

      return matchCat && matchLoc && matchPrice && matchSearch && matchRadius;
    });
  }, [allData, selectedCats, selectedLocation, priceRange, searchQuery, radius]);

  const removeCat = (cat) => setSelectedCats(prev => prev.filter(c => c !== cat));
  const removeSearch = () => {
    searchParams.delete('q');
    setSearchParams(searchParams);
  };

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', paddingTop: 'var(--nav-height)' }}>
      <div className="container" style={{ padding: 'clamp(2rem, 5vw, 4rem) 5% 8rem' }}>
        <div style={{ textAlign: 'left', marginBottom: 'clamp(2rem, 4vw, 4rem)' }}>
            <span style={{ color: '#EF4444', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Discover Locally</span>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginTop: '0.5rem', color: '#0F172A', lineHeight: '1.1' }}>Explore <br className="mobile-only" /> Lifestyle Spots</h1>
        </div>

        <div className="listing-page-layout">
          <div className={`filter-sidebar-wrapper ${showMobileFilters ? 'active' : ''}`}>
             <div className="mobile-filter-header">
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Filters</h3>
                <X onClick={() => setShowMobileFilters(false)} style={{ cursor: 'pointer' }} />
             </div>
             <FilterSidebar 
               selectedCats={selectedCats} 
               setSelectedCats={setSelectedCats}
               priceRange={priceRange}
               setPriceRange={setPriceRange}
               radius={radius}
               setRadius={setRadius}
               onReset={() => {
                 setSelectedCats([]);
                 setPriceRange(null);
                 setRadius(25);
               }}
             />
          </div>
          {showMobileFilters && <div className="filter-overlay" onClick={() => setShowMobileFilters(false)}></div>}

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ flex: '1 0 100%', marginBottom: '0.5rem' }} className="mobile-only"></div>
                <div style={{ flex: 1 }}>
                   <h3 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.75rem)', fontWeight: '800', lineHeight: '1.2' }}>{filteredListings.length} <span style={{ color: '#64748B', fontWeight: '500' }}>Handpicked Spots Found</span></h3>
                </div>
                
                {/* Active Pills */}
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {searchQuery && (
                        <div className="filter-pill" onClick={removeSearch}>
                             Search: {searchQuery} <X size={14} />
                        </div>
                    )}
                    {selectedCats.map(cat => (
                        <div key={cat} className="filter-pill" onClick={() => removeCat(cat)}>
                            {cat} <X size={14} />
                        </div>
                    ))}
                    {selectedLocation !== 'All' && (
                        <div className="filter-pill" onClick={() => setSelectedLocation('All')}>
                            {selectedLocation} <X size={14} />
                        </div>
                    )}
                    {priceRange && (
                        <div className="filter-pill" onClick={() => setPriceRange(null)}>
                            Price: ${priceRange.min}-${priceRange.max} <X size={14} />
                        </div>
                    )}
                    {radius < 25 && (
                        <div className="filter-pill" onClick={() => setRadius(25)}>
                            Radius: {radius}km <X size={14} />
                        </div>
                    )}
                    <button 
                        onClick={() => setShowMobileFilters(true)}
                        style={{ background: '#0F172A', color: 'white', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem' }}
                    >
                        <SlidersHorizontal size={16} /> Advanced
                    </button>
                </div>
            </div>

            <LocationTabs activeLocation={selectedLocation} onChange={setSelectedLocation} />

            <div className="listing-grid">
              {filteredListings.length > 0 ? (
                filteredListings.map(item => (
                  <ListingCard key={item.id} item={item} />
                ))
              ) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '10rem 0' }}>
                  <SearchIcon size={64} color="#CBD5E1" style={{ marginBottom: '1.5rem' }} />
                  <h3 style={{ color: '#64748B' }}>No spots match your filters</h3>
                  <button 
                    onClick={() => { setSelectedCats([]); setSelectedLocation('All'); setPriceRange(null); removeSearch(); }}
                    className="btn btn-primary" 
                    style={{ marginTop: '2rem' }}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .listing-page-layout {
            display: flex;
            gap: 3.5rem;
            align-items: flex-start;
        }

        @media (max-width: 1024px) {
            .listing-page-layout {
                flex-direction: column;
                gap: 2rem;
            }
        }

        .filter-pill {
            background: white; 
            border: 1px solid #E2E8F0; 
            color: #475569; 
            padding: 0.5rem 1rem; 
            border-radius: 12px; 
            font-size: 0.75rem; 
            font-weight: 700; 
            display: flex; 
            align-items: center; 
            gap: 0.5rem; 
            cursor: pointer;
            transition: all 0.2s;
            white-space: nowrap;
        }
        .filter-pill:hover {
            border-color: #EF4444;
            color: #EF4444;
            background: #FFF5F5;
        }

        .filter-sidebar-wrapper {
            transition: all 0.4s var(--ease-premium);
        }

        .mobile-filter-header {
            display: none;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem 2rem;
            border-bottom: 1px solid var(--border-light);
        }

        @media (max-width: 1024px) {
            .filter-sidebar-wrapper {
                position: fixed;
                top: 0;
                left: -100%;
                width: 320px;
                height: 100vh;
                background: white;
                z-index: 1000;
                overflow-y: auto;
                box-shadow: 20px 0 60px rgba(0,0,0,0.1);
            }
            .filter-sidebar-wrapper.active {
                left: 0;
            }
            .filter-overlay {
                position: fixed;
                inset: 0;
                background: rgba(0,0,0,0.4);
                backdrop-filter: blur(4px);
                z-index: 999;
            }
            .mobile-filter-header {
                display: flex;
            }
        }
      `}</style>
    </div>
  );
};

export default ListingPage;
