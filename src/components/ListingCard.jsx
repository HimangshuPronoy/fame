import { Star, MapPin, Phone, Heart, Share2, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ListingCard = ({ item }) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  return (
    <div 
      className="premium-card reveal listing-card-premium"
      style={{ 
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        background: 'transparent',
      }}
      onClick={() => navigate('/listings')}
    >
      <div className="card-image-container" style={{ aspectRatio: '16/10', position: 'relative' }}>
        <img 
          src={item.image} 
          alt={item.name} 
          className="card-image"
        />
        
        {/* Top Overlay Actions */}
        <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', display: 'flex', gap: '0.5rem' }}>
          <div style={{ 
            background: 'rgba(10, 10, 10, 0.6)', 
            backdropFilter: 'blur(10px)',
            color: 'white', 
            fontSize: '0.65rem', 
            fontWeight: '600', 
            padding: '0.4rem 0.8rem', 
            borderRadius: '2px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            Open
          </div>
          {item.isFeatured && (
            <div style={{ 
              background: 'rgba(212, 175, 55, 0.8)', 
              color: 'var(--primary)', 
              fontSize: '0.65rem', 
              fontWeight: '600', 
              padding: '0.4rem 0.8rem', 
              borderRadius: '2px',
              textTransform: 'uppercase',
              backdropFilter: 'blur(12px)',
              letterSpacing: '0.1em',
            }}>
              Curated
            </div>
          )}
        </div>

        {/* Favorite Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
          style={{ 
            position: 'absolute', 
            top: '1.25rem', 
            right: '1.25rem',
            width: '38px',
            height: '38px',
            borderRadius: '2px',
            background: 'rgba(10, 10, 10, 0.4)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: isLiked ? 'var(--accent-gold)' : 'white',
            zIndex: 10,
            transition: 'all 0.4s var(--ease-slow)'
          }}
        >
          <Heart size={16} fill={isLiked ? "currentColor" : "none"} strokeWidth={1.5} />
        </button>
      </div>

      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
           <span style={{ fontSize: '0.65rem', fontWeight: '500', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{item.category}</span>
           <div style={{ display: 'flex', gap: '2px', marginLeft: 'auto' }}>
             {[1,2,3,4,5].map(i => <Star key={i} size={10} fill={i <= 4 ? "var(--accent-gold)" : "none"} color="transparent" />)}
           </div>
        </div>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '0.5rem', lineHeight: '1.2' }}>{item.name}</h3>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '2rem' }}>
          <MapPin size={12} color="var(--primary)" strokeWidth={1.5} />
          <span style={{ fontWeight: '300', letterSpacing: '0.01em' }}>{item.location}</span>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
            <span style={{ fontSize: '1.25rem', fontFamily: 'Playfair Display, serif', color: 'var(--primary)' }}>${item.price}</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '400', letterSpacing: '0.05em' }}>/ AVG</span>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
                className="icon-btn-luxury" 
                onClick={(e) => { e.stopPropagation(); alert('Connecting to Concierge...'); }}
            >
                <Phone size={14} strokeWidth={1.5} />
            </button>
            <button 
                className="icon-btn-luxury"
                onClick={(e) => { e.stopPropagation(); navigate('/listings'); }}
                style={{ background: 'var(--primary)', color: 'var(--accent-gold)', borderColor: 'var(--primary)' }}
            >
                <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        .listing-card-premium {
          transition: all 0.8s var(--ease-slow);
        }
        .listing-card-premium:hover {
          transform: translateY(-4px);
          border-color: var(--primary);
        }
        .listing-card-premium:hover img {
          transform: scale(1.05);
        }
        .icon-btn-luxury {
          width: 36px;
          height: 36px;
          border-radius: 2px;
          background: transparent;
          border: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.4s var(--ease-slow);
          color: var(--primary);
        }
        .icon-btn-luxury:hover {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }
      `}</style>
    </div>
  );
};

export default ListingCard;
