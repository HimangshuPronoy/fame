import { Filter } from 'lucide-react';

const FilterSidebar = ({ selectedCats, setSelectedCats, priceRange, setPriceRange, radius, setRadius, onReset }) => {
  const categories = ['Restaurants', 'Nightlife', 'Fitness', 'Wellness', 'Shopping'];
  const prices = [
    { label: '$', min: 0, max: 50 },
    { label: '$$', min: 51, max: 150 },
    { label: '$$$', min: 151, max: 300 },
    { label: '$$$$', min: 301, max: 1000 }
  ];

  const toggleCat = (cat) => {
    const target = cat === 'Restaurants' ? 'Restaurant' : cat;
    if (selectedCats.includes(target)) {
      setSelectedCats(prev => prev.filter(c => c !== target));
    } else {
      setSelectedCats(prev => [...prev, target]);
    }
  };

  return (
    <aside style={{ width: '100%', maxWidth: '300px' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '32px', border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }} className="sidebar-header">
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#FFF5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Filter size={18} color="var(--primary)" />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Refine Discovery</h2>
        </div>

        {/* Categories */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', fontWeight: '800' }}>Niche</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <label 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.8rem', 
                cursor: 'pointer',
                opacity: selectedCats.length === 0 ? 1 : 0.6 
              }}
              onClick={() => setSelectedCats([])}
            >
              <div style={{ 
                width: '18px', 
                height: '18px', 
                border: '2px solid' + (selectedCats.length === 0 ? ' var(--primary)' : ' #CBD5E1'), 
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {selectedCats.length === 0 && <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '1px' }}></div>}
              </div>
              <span style={{ fontWeight: selectedCats.length === 0 ? '700' : '500', fontSize: '0.95rem' }}>All Spots</span>
            </label>
            
            {categories.map(cat => {
              const isActive = selectedCats.includes(cat) || (cat === 'Restaurants' && selectedCats.includes('Restaurant'));
              return (
                <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }} onClick={() => toggleCat(cat)}>
                  <input 
                    type="checkbox" 
                    readOnly
                    checked={isActive}
                    style={{ 
                        width: '18px', 
                        height: '18px', 
                        accentColor: 'var(--primary)',
                        cursor: 'pointer'
                    }}
                  />
                  <span style={{ fontWeight: isActive ? '700' : '500', color: isActive ? 'var(--text-main)' : 'var(--text-secondary)', fontSize: '0.95rem' }}>{cat}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Price Point */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', fontWeight: '800' }}>Price Point</h3>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            {prices.map(p => {
              const isActive = priceRange?.label === p.label;
              return (
                <button 
                  key={p.label}
                  onClick={() => setPriceRange(isActive ? null : p)}
                  style={{ 
                    flex: 1, 
                    height: '44px', 
                    borderRadius: '12px', 
                    border: '1.5px solid',
                    borderColor: isActive ? 'var(--primary)' : 'var(--border-light)',
                    background: isActive ? 'var(--primary)' : 'white',
                    color: isActive ? 'white' : 'var(--text-secondary)',
                    fontWeight: '800',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Discovery Radius */}
        <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '800' }}>Discovery Radius</h3>
                <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--primary)' }}>{radius} km</span>
            </div>
            <input 
                type="range" 
                min="1" 
                max="25" 
                value={radius} 
                onChange={(e) => setRadius(parseInt(e.target.value))}
                style={{ 
                    width: '100%', 
                    accentColor: 'var(--primary)',
                    cursor: 'pointer',
                    height: '6px'
                }} 
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>
                <span>1 KM</span>
                <span>25 KM</span>
            </div>
        </div>

        {/* CTA */}
        <button 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem', borderRadius: '16px', fontWeight: '800' }}
            onClick={onReset}
        >
            Reset All Filters
        </button>
      </div>

      <style>{`
        input[type="range"] {
          -webkit-appearance: none;
          background: #F1F5F9;
          border-radius: 10px;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          background: white;
          border: 4px solid var(--primary);
          border-radius: 50%;
          box-shadow: 0 4px 12px var(--primary-glow);
          cursor: pointer;
        }
        @media (max-width: 1024px) {
            .sidebar-header { display: none; }
        }
      `}</style>
    </aside>
  );
};

export default FilterSidebar;
