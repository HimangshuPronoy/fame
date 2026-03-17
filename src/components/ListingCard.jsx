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
        borderRadius: '24px',
        border: '1px solid rgba(15, 23, 42, 0.05)',
        background: 'white',
        boxShadow: '0 10px 30px -10px rgba(15, 23, 42, 0.08)'
      }}
      onClick={() => navigate('/listings')}
    >
      <div className="card-image-container" style={{ aspectRatio: '16/10', position: 'relative' }}>
        <img 
          src={item.image} 
          alt={item.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1s var(--ease-premium)' }}
        />
        
        {/* Top Overlay Actions */}
        <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', display: 'flex', gap: '0.5rem' }}>
          <div style={{ 
            background: 'rgba(16, 185, 129, 0.9)', 
            backdropFilter: 'blur(10px)',
            color: 'white', 
            fontSize: '0.65rem', 
            fontWeight: '800', 
            padding: '0.4rem 0.75rem', 
            borderRadius: '100px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            Open
          </div>
          {item.isFeatured && (
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.2)', 
              color: 'white', 
              fontSize: '0.65rem', 
              fontWeight: '800', 
              padding: '0.4rem 0.75rem', 
              borderRadius: '100px',
              textTransform: 'uppercase',
              backdropFilter: 'blur(12px)',
              letterSpacing: '0.05em',
              border: '1px solid rgba(255,255,255,0.3)'
            }}>
              Featured
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
            borderRadius: '14px',
            background: 'rgba(15, 23, 42, 0.3)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: isLiked ? '#ef4444' : 'white',
            zIndex: 10,
            transition: 'all 0.3s var(--ease-premium)'
          }}
        >
          <Heart size={18} fill={isLiked ? "currentColor" : "none"} strokeWidth={2.5} />
        </button>
      </div>

      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
           <span style={{ fontSize: '0.7rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{item.category}</span>
           <div style={{ display: 'flex', gap: '2px', marginLeft: 'auto' }}>
             {[1,2,3,4,5].map(i => <Star key={i} size={10} fill={i <= 4 ? "var(--accent-gold)" : "none"} color={i <= 4 ? "var(--accent-gold)" : "#E2E8F0"} />)}
           </div>
        </div>

        <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#0F172A', marginBottom: '0.75rem', lineHeight: '1.25', letterSpacing: '-0.02em' }}>{item.name}</h3>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '2rem' }}>
          <MapPin size={14} color="var(--primary)" strokeWidth={2.5} />
          <span style={{ fontWeight: '500' }}>{item.location}</span>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '800', letterSpacing: '0.05em' }}>FROM</span>
            <span style={{ fontSize: '1.5rem', fontWeight: '900', color: '#0F172A' }}>${item.price}</span>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
                className="icon-btn-premium" 
                onClick={(e) => { e.stopPropagation(); alert('Calling Establishment...'); }}
            >
                <Phone size={16} strokeWidth={2.5} />
            </button>
            <button 
                className="icon-btn-premium"
                onClick={(e) => { e.stopPropagation(); navigate('/listings'); }}
                style={{ background: 'var(--primary)', color: 'white', borderColor: 'var(--primary)' }}
            >
                <ArrowRight size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        .listing-card-premium {
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .listing-card-premium:hover {
          transform: translateY(-10px);
          box-shadow: 0 50px 100px -20px rgba(15, 23, 42, 0.15);
        }
        .listing-card-premium:hover img {
          transform: scale(1.05);
        }
        .icon-btn-premium {
          width: 44px;
          height: 44px;
          border-radius: 16px;
          background: white;
          border: 1.5px solid rgba(15, 23, 42, 0.08);
          display: flex;
          align-items: center;
          justifyContent: center;
          cursor: pointer;
          transition: all 0.3s var(--ease-premium);
          color: var(--text-secondary);
        }
        .icon-btn-premium:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }
      `}</style>
    </div>
  );
};

export default ListingCard;
