import { Star, MapPin, Phone, Heart, Share2, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ListingCard = ({ item }) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  return (
    <div 
      className="premium-card reveal listing-card-hover"
      style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}
      onClick={() => navigate('/listings')}
    >
      <div className="card-image-container">
        <img 
          src={item.image} 
          alt={item.name} 
          className="card-image"
        />
        
        {/* Top Overlay Actions */}
        <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.4rem' }}>
          <div style={{ 
            background: '#10B981', 
            color: 'white', 
            fontSize: '0.65rem', 
            fontWeight: '900', 
            padding: '0.3rem 0.6rem', 
            borderRadius: '6px',
            textTransform: 'uppercase'
          }}>
            Open
          </div>
          {item.isFeatured && (
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.95)', 
              color: '#0F172A', 
              fontSize: '0.65rem', 
              fontWeight: '900', 
              padding: '0.3rem 0.6rem', 
              borderRadius: '6px',
              textTransform: 'uppercase',
              backdropFilter: 'blur(8px)'
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
            top: '1rem', 
            right: '1rem',
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: isLiked ? 'var(--primary)' : 'white',
            zIndex: 10
          }}
        >
          <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
        </button>
      </div>

      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
           <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{item.category}</span>
           <div style={{ display: 'flex', gap: '1px', marginLeft: 'auto' }}>
             {[1,2,3,4].map(i => <Star key={i} size={12} fill="var(--accent-gold)" color="var(--accent-gold)" />)}
             <Star size={12} color="#CBD5E1" />
           </div>
           <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>({item.reviews || 0})</span>
        </div>

        <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#0F172A', marginBottom: '0.5rem', lineHeight: '1.2' }}>{item.name}</h3>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
          <MapPin size={14} color="var(--primary)" />
          <span>{item.location}</span>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.25rem', borderTop: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '800' }}>FROM</span>
            <span style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--primary)' }}>${item.price}</span>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button 
                className="icon-btn-small" 
                title="Call"
                onClick={(e) => { e.stopPropagation(); alert('Calling Establishment...'); }}
            >
                <Phone size={14} />
            </button>
            <button 
                className="icon-btn-small" 
                title="Share"
                onClick={(e) => { e.stopPropagation(); alert('Link Copied!'); }}
            >
                <Share2 size={14} />
            </button>
          </div>
        </div>

        <button 
          className="btn btn-primary" 
          style={{ width: '100%', marginTop: '1.25rem', padding: '0.85rem', borderRadius: '14px', fontSize: '0.9rem', gap: '0.5rem' }}
          onClick={(e) => { e.stopPropagation(); navigate('/listings'); }}
        >
          Discover Spot <ArrowRight size={16} />
        </button>
      </div>
      
      <style>{`
        .listing-card-hover {
          transition: all 0.4s var(--ease-premium);
        }
        .listing-card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 40px 80px -20px rgba(0,0,0,0.12);
        }
        .icon-btn-small {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: #F8FAFC;
          border: 1.5px solid #E2E8F0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s var(--ease-premium);
          color: #64748B;
        }
        .icon-btn-small:hover {
          background: white;
          border-color: var(--primary);
          color: var(--primary);
          transform: scale(1.05);
          box-shadow: 0 8px 16px rgba(239, 68, 68, 0.1);
        }
      `}</style>
    </div>
  );
};

export default ListingCard;
