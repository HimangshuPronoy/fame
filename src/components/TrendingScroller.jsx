import { Star, MapPin, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../hooks/useStore';

const TrendingScroller = () => {
  const navigate = useNavigate();
  const { listings, loading } = useStore();

  const featuredSpots = listings.filter(l => l.is_featured);

  // If no featured spots, use a subset of all listings or fallback to mock
  const displaySpots = featuredSpots.length > 0 ? featuredSpots : listings.slice(0, 8);

  // Double for infinite effect
  const doubleSpots = [...displaySpots, ...displaySpots];

  return (
    <section style={{ padding: '10rem 0', background: 'var(--bg-subtle)', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ marginBottom: '5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '2rem' }} className="responsive-flex">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '20px', height: '1px', background: 'var(--accent-gold)' }}></div>
              <span style={{ color: 'var(--accent-gold)', fontWeight: '500', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Highlights</span>
            </div>
            <h2 style={{ marginTop: '0' }}>Trending This Week</h2>
          </div>
          <button 
            onClick={() => navigate('/listings')}
            className="btn btn-outline" 
            style={{ padding: '0.85rem 2rem' }}
          >
            View Collection
          </button>
        </div>
      </div>

      <div className="trending-marquee">
        <div className="trending-marquee-content">
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '2rem' }}>
              <Loader2 className="animate-spin" size={24} color="var(--primary)" />
              <span style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '1.2rem' }}>Synchronizing Trends...</span>
            </div>
          ) : doubleSpots.map((spot, i) => (
            <div 
              key={`${spot.id || i}-${i}`} 
              onClick={() => navigate('/listings')}
              style={{ 
                flexShrink: 0, 
                width: '400px', 
                position: 'relative', 
                borderRadius: '8px', 
                border: '1px solid rgba(10,10,10,0.05)',
                overflow: 'hidden', 
                cursor: 'pointer',
                margin: '0 1.5rem',
              }}
              className="trending-card"
            >
              <div style={{ overflow: 'hidden', aspectRatio: '4/5' }}>
                <img src={spot.image || spot.img} alt={spot.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1.2s var(--ease-slow)' }} className="trending-img" />
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2.5rem', background: 'linear-gradient(to top, rgba(10,10,10,0.95), transparent)', color: 'white' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: '500', padding: '0.35rem 0.8rem', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '2px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{spot.category || spot.cat}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', fontWeight: '400', letterSpacing: '0.1em' }}>
                        <Star size={12} fill="var(--accent-gold)" color="var(--accent-gold)" />
                        {spot.rating || spot.score || '5.0'}
                    </div>
                 </div>
                 <h4 style={{ fontSize: '1.75rem', letterSpacing: '0', color: 'white', marginBottom: '0.5rem', marginTop: '0.5rem' }}>{spot.name}</h4>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', opacity: 0.8, marginTop: '0', fontWeight: '300' }}>
                    <MapPin size={12} color="var(--accent-gold)" /> {spot.location || spot.loc}
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes trending-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .trending-marquee {
          display: flex;
          overflow: hidden;
          width: 100%;
        }
        .trending-marquee-content {
          display: flex;
          animation: trending-marquee 60s linear infinite;
        }
        .trending-marquee:hover .trending-marquee-content {
          animation-play-state: paused;
        }
        @media (max-width: 768px) {
          .trending-card { width: 300px !important; margin: 0 1rem !important; }
          .trending-marquee-content { animation-duration: 40s; }
        }
        .trending-card {
           transition: all 0.6s var(--ease-slow);
        }
        .trending-card:hover .trending-img { 
          transform: scale(1.05); 
        }
      `}</style>
    </section>
  );
};

export default TrendingScroller;
