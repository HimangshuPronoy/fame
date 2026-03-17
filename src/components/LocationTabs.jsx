import { ChevronDown } from 'lucide-react';

const LocationTabs = ({ activeLocation, onChange }) => {
  const locations = ['All', 'Ulaanbaatar', 'Chicago', 'Dubai', 'London', 'Venice'];

  return (
    <div style={{ display: 'flex', gap: '0.85rem', marginBottom: '3rem', overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none' }} className="no-scrollbar">
      {locations.map(loc => {
        const isActive = activeLocation === loc;
        return (
          <button 
            key={loc}
            onClick={() => onChange(loc)}
            style={{ 
              whiteSpace: 'nowrap',
              padding: '0.75rem 1.75rem', 
              borderRadius: '14px', 
              border: '1.5px solid',
              borderColor: isActive ? 'var(--primary)' : 'var(--border-light)',
              background: isActive ? '#FFF5F5' : 'white',
              color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
              fontSize: '0.9rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s var(--ease-premium)'
            }}
          >
            {loc}
          </button>
        );
      })}
      
      <button style={{ 
        flexShrink: 0,
        width: '48px', 
        height: '48px', 
        borderRadius: '14px', 
        border: '1px solid var(--border-light)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'white',
        cursor: 'pointer'
      }}>
        <ChevronDown size={20} color="var(--text-secondary)" />
      </button>
    </div>
  );
};

export default LocationTabs;
