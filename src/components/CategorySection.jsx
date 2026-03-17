import { useNavigate } from 'react-router-dom';
import { Utensils, GlassWater, Dumbbell, ShoppingBag, Plane, Sparkles } from 'lucide-react';

const CategorySection = () => {
  const navigate = useNavigate();
  
  const categories = [
    { title: 'Restaurant', icon: <Utensils size={32} />, bg: '#FFF5F5', color: '#B91C1C', desc: 'Savor world-class cuisines and hidden local eateries.' },
    { title: 'Nightlife', icon: <GlassWater size={32} />, bg: '#FDF2F8', color: '#BE185D', desc: 'Experience vibrant energy at the city\'s most exclusive clubs.' },
    { title: 'Fitness', icon: <Dumbbell size={32} />, bg: '#EFF6FF', color: '#1D4ED8', desc: 'Train at elite facilities with state-of-the-art equipment.' },
    { title: 'Shopping', icon: <ShoppingBag size={32} />, bg: '#F5F3FF', color: '#6D28D9', desc: 'Discover curated boutiques and luxury global brands.' },
    { title: 'Travel', icon: <Plane size={32} />, bg: '#ECFDF5', color: '#047857', desc: 'Plan your next escape with verified local guides.' },
    { title: 'Beauty', icon: <Sparkles size={32} />, bg: '#FFFBEB', color: '#B45309', desc: 'Rejuvenate at premium spas and elite wellness centers.' },
  ];

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6rem' }}>
        <div style={{ maxWidth: '700px' }}>
          <span style={{ color: 'var(--primary)', fontWeight: '900', fontSize: '0.85rem', letterSpacing: '0.25rem', textTransform: 'uppercase' }}>Discover Locally</span>
          <h2 style={{ marginTop: '1.5rem', color: '#0F172A', fontSize: '3.5rem', lineHeight: '1.1' }}>Searching is more easy by category</h2>
        </div>
        <p style={{ maxWidth: '450px', color: 'var(--text-secondary)', fontSize: '1.2rem', paddingBottom: '0.5rem', lineHeight: '1.7' }}>
          Explore verified establishments curated for excellence and reviewed by the local community.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: window.innerWidth < 640 ? '1fr' : (window.innerWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'), 
        gap: '3rem' 
      }}>
        {categories.map((cat, i) => (
          <div 
            key={i} 
            onClick={() => navigate('/listings')}
            className="category-card"
          >
            <div 
              className="icon-box"
              style={{ 
                width: '90px', 
                height: '90px', 
                borderRadius: '28px', 
                background: cat.bg, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: cat.color,
                transition: 'all 0.4s var(--ease-premium)',
                flexShrink: 0
              }}
            >
              {cat.icon}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '0.75rem', color: '#0F172A' }}>{cat.title}</h3>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: '500', lineHeight: '1.5' }}>{cat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
