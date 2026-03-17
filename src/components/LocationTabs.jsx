import { ChevronDown } from 'lucide-react';

const LocationTabs = ({ activeLocation, onChange }) => {
  const locations = ['All', 'Ulaanbaatar', 'Chicago', 'Dubai', 'London', 'Venice'];

  return (
    <div style={{ position: 'relative', marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}>
      <div 
        style={{ 
          display: 'flex', 
          gap: '0.75rem', 
          overflowX: 'auto', 
          padding: '0.5rem 0 1.5rem',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          maskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent 100%)'
        }} 
        className="no-scrollbar"
      >
        {locations.map(loc => {
          const isActive = activeLocation === loc;
          return (
            <button 
              key={loc}
              onClick={() => onChange(loc)}
              style={{ 
                whiteSpace: 'nowrap',
                padding: '0.65rem 1.5rem', 
                borderRadius: '100px', 
                border: '1px solid',
                borderColor: isActive ? 'var(--primary)' : 'rgba(15, 23, 42, 0.08)',
                background: isActive ? 'var(--primary)' : 'white',
                color: isActive ? 'white' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isActive ? '0 10px 20px -5px rgba(239, 68, 68, 0.3)' : 'none',
                transform: isActive ? 'translateY(-1px)' : 'none'
              }}
            >
              {loc}
            </button>
          );
        })}
      </div>
      
      {/* Scroll Indicator / Gradient subtle */}
      <div style={{ 
        position: 'absolute', 
        right: 0, 
        top: 0, 
        bottom: 0, 
        width: '40px', 
        background: 'linear-gradient(to right, transparent, white)', 
        pointerEvents: 'none',
        zIndex: 5
      }} />
    </div>
  );
};

export default LocationTabs;
