import { Star, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TrendingScroller = () => {
  const navigate = useNavigate();
  const spots = [
    { name: 'Aurora Sky Bar', cat: 'Nightlife', img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80', score: '4.9', loc: 'Downtown' },
    { name: 'Zenith Spa', cat: 'Wellness', img: 'https://images.unsplash.com/photo-1544161515-4af6b1d462c2?auto=format&fit=crop&w=600&q=80', score: '5.0', loc: 'West End' },
    { name: 'Terra Bistro', cat: 'Restaurant', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80', score: '4.8', loc: 'Harbor' },
    { name: 'Iron Works', cat: 'Fitness', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80', score: '4.7', loc: 'East Side' },
    { name: 'Velvet Club', cat: 'Nightlife', img: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=600&q=80', score: '4.9', loc: 'Metro' },
    { name: 'Loom Studio', cat: 'Shopping', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80', score: '4.6', loc: 'Arts Dist' },
    { name: 'Copper & Oak', cat: 'Restaurant', img: 'https://images.unsplash.com/photo-1550966841-3ee5ad443542?auto=format&fit=crop&w=600&q=80', score: '4.9', loc: 'History Dist' },
    { name: 'Skyline Yoga', cat: 'Fitness', img: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=600&q=80', score: '4.8', loc: 'Plaza' },
    { name: 'Artisan Bowl', cat: 'Restaurant', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', score: '4.7', loc: 'North' },
  ];

  // Double the spots for infinite scroll effect
  const doubleSpots = [...spots, ...spots];

  return (
    <section style={{ padding: '10rem 0', background: 'white', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ marginBottom: '5rem' }} className="responsive-flex">
          <div>
            <span style={{ color: 'var(--primary)', fontWeight: '900', fontSize: '0.85rem', letterSpacing: '0.3rem' }}>HIGHLIGHTS</span>
            <h2 style={{ marginTop: '1rem' }}>Trending This Week</h2>
          </div>
          <button 
            onClick={() => navigate('/listings')}
            className="btn btn-primary" 
            style={{ padding: '1rem 2.5rem', borderRadius: '18px' }}
          >
            View All
          </button>
        </div>
      </div>

      <div className="trending-marquee">
        <div className="trending-marquee-content">
          {doubleSpots.map((spot, i) => (
            <div 
              key={i} 
              onClick={() => navigate('/listings')}
              style={{ 
                flexShrink: 0, 
                width: '380px', 
                position: 'relative', 
                borderRadius: '32px', 
                overflow: 'hidden', 
                cursor: 'pointer',
                margin: '0 1.5rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
              }}
              className="trending-card"
            >
              <div style={{ overflow: 'hidden', aspectRatio: '4/5' }}>
                <img src={spot.img} alt={spot.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s var(--ease-premium)' }} />
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', color: 'white' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '900', padding: '0.35rem 0.75rem', background: 'var(--primary)', borderRadius: '6px', textTransform: 'uppercase' }}>{spot.cat}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem', fontWeight: '800' }}>
                        <Star size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />
                        {spot.score}
                    </div>
                 </div>
                 <h4 style={{ fontSize: '1.6rem', fontWeight: '900', letterSpacing: '-0.5px' }}>{spot.name}</h4>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', opacity: 0.8, marginTop: '0.75rem', fontWeight: '600' }}>
                    <MapPin size={14} color="var(--primary)" /> {spot.loc} District
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
          animation: trending-marquee 50s linear infinite;
        }
        .trending-marquee:hover .trending-marquee-content {
          animation-play-state: paused;
        }
        @media (max-width: 768px) {
          .trending-card { width: 300px !important; }
          .trending-marquee-content { animation-duration: 30s; }
        }
        .trending-card:hover img { 
          transform: scale(1.1); 
        }
        .trending-card:hover {
          box-shadow: 0 40px 80px rgba(0,0,0,0.15);
        }
      `}</style>
    </section>
  );
};

export default TrendingScroller;
