import { useNavigate } from 'react-router-dom';
import { Utensils, GlassWater, Dumbbell, ShoppingBag, Plane, Sparkles } from 'lucide-react';

const CategorySection = () => {
  const navigate = useNavigate();
  
  const categories = [
    { title: 'Restaurant', icon: <Utensils size={28} strokeWidth={1.5} />, desc: 'World-class cuisines & hidden eateries.' },
    { title: 'Nightlife', icon: <GlassWater size={28} strokeWidth={1.5} />, desc: 'Exclusive access to vibrant city energy.' },
    { title: 'Fitness', icon: <Dumbbell size={28} strokeWidth={1.5} />, desc: 'Train at state-of-the-art elite facilities.' },
    { title: 'Shopping', icon: <ShoppingBag size={28} strokeWidth={1.5} />, desc: 'Curated boutiques & luxury global brands.' },
    { title: 'Travel', icon: <Plane size={28} strokeWidth={1.5} />, desc: 'Verified guides for your next grand escape.' },
    { title: 'Wellness', icon: <Sparkles size={28} strokeWidth={1.5} />, desc: 'Rejuvenate at premium, verified spas.' },
  ];

  return (
    <div className="container" style={{ overflow: 'hidden' }}>
      <div style={{ marginBottom: 'clamp(4rem, 8vw, 6rem)', textAlign: 'center', maxWidth: '800px', margin: '0 auto clamp(4rem, 8vw, 6rem)' }} className="reveal">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '30px', height: '1px', background: 'var(--accent-gold)' }}></div>
            <span style={{ color: 'var(--accent-gold)', fontWeight: '500', fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}>Curation by Excellence</span>
            <div style={{ width: '30px', height: '1px', background: 'var(--accent-gold)' }}></div>
        </div>
        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>The <span className="text-gradient">Signatures</span> of Local Culture.</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', margin: '1.5rem auto 0', lineHeight: '1.8', maxWidth: '600px', fontWeight: '300' }}>
          Explore verified establishments curated for excellence, from Michelin-starred dining to exclusive wellness sanctuaries.
        </p>
      </div>

      <div className="grid-3">
        {categories.map((cat, i) => (
          <div 
            key={i} 
            onClick={() => navigate(`/listings?cat=${encodeURIComponent(cat.title)}`)}
            className="category-card"
          >
            <div 
              className="icon-box"
              style={{ 
                width: '60px', 
                height: '60px', 
                background: 'transparent',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--primary)',
                flexShrink: 0
              }}
            >
              {cat.icon}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{cat.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '300', lineHeight: '1.6', letterSpacing: '0.01em' }}>{cat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
