import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategorySection from '../components/CategorySection';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import Process from '../components/Process';
import TrendingScroller from '../components/TrendingScroller';
import { Search, Compass, Play } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [bgIndex, setBgIndex] = useState(0);
  const [prevBgIndex, setPrevBgIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const backgroundImages = [
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80", 
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1920&q=80", 
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80", 
    "https://images.unsplash.com/photo-1544161515-4af6b1d462c2?auto=format&fit=crop&w=1920&q=80", 
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80", 
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80", 
    "https://images.unsplash.com/photo-1574091678382-728b7f8842e4?auto=format&fit=crop&w=1920&q=80", 
    "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=1920&q=80" 
  ];

  useEffect(() => {
    const length = backgroundImages.length;
    const timer = setInterval(() => {
      setPrevBgIndex(bgIndex);
      setBgIndex((prev) => (prev + 1) % length);
    }, 6000);
    return () => clearInterval(timer);
  }, [bgIndex, backgroundImages.length]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
        if (searchTerm.trim()) {
            navigate(`/listings?q=${encodeURIComponent(searchTerm)}`);
        } else {
            navigate('/listings');
        }
    }
  };

  return (
    <div className="home-root">
      {/* Luxury Cinematic Hero Section */}
      <section className="hero-section" style={{ height: '100vh', minHeight: '600px', position: 'relative', overflow: 'hidden', background: 'var(--primary)' }}>
        {/* Background Layers - Slower, more subtle cross-fades */}
        {backgroundImages.map((img, idx) => (
          <div 
            key={idx}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `linear-gradient(to bottom, rgba(10,10,10,0.4), rgba(10,10,10,0.8)), url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: idx === bgIndex ? 1 : 0,
              transition: 'opacity 3.5s var(--ease-slow)',
              zIndex: idx === bgIndex ? 1 : (idx === prevBgIndex ? 0 : -1)
            }}
          />
        ))}

        <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 10 }}>
          <div className="hero-content fade-in" style={{ marginTop: '2.5rem' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '1rem', 
              marginBottom: '1rem',
            }}>
                <div style={{ width: '40px', height: '1px', background: 'var(--accent-gold)' }}></div>
                <span style={{ fontSize: '0.65rem', fontWeight: '600', letterSpacing: '0.3em', color: 'var(--accent-gold)', textTransform: 'uppercase' }}>Curated Excellence</span>
            </div>
            
            <h1 style={{ 
              color: 'white', 
              marginBottom: '1.5rem',
              maxWidth: '1000px',
            }}>
              Discover the <br className="desktop-only" />
              <span style={{ fontStyle: 'italic', color: 'var(--bg-main)', opacity: 0.9 }}>Extraordinary</span>.
            </h1>
            
            <p style={{ 
              color: 'var(--bg-main)', 
              fontSize: 'clamp(1rem, 1.2vw, 1.15rem)', 
              maxWidth: '600px', 
              opacity: 0.8, 
              lineHeight: '1.8', 
              marginBottom: '4rem',
              fontWeight: '300',
            }}>
              Fame hand-verifies the world's most exclusive restaurants, secret nightspots, and elite wellness centers. Welcome to the pinnacle of lifestyle discovery.
            </p>
            
            <div className="hero-search-wrapper" style={{ maxWidth: '800px', background: 'rgba(10,10,10,0.4)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem', padding: '0 1.5rem' }}>
                    <Search className="mobile-only" size={18} color="rgba(255,255,255,0.5)" />
                    <input 
                      type="text" 
                      placeholder="What are you looking for?" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={handleSearch}
                      style={{ border: 'none', background: 'transparent', width: '100%', fontSize: '0.95rem', outline: 'none', fontWeight: '300', color: 'white' }}
                    />
                </div>
                <button 
                  onClick={handleSearch}
                  className="btn" 
                  style={{ background: 'white', color: 'var(--primary)', padding: '1rem 2.5rem', borderRadius: '2px', whiteSpace: 'nowrap', fontWeight: '600' }}
                >
                  Explore Now
                </button>
            </div>
          </div>
        </div>
      </section>

      <div id="categories" style={{ padding: 'var(--section-padding) 0', background: 'var(--bg-subtle)' }}>
        <CategorySection />
      </div>

      <div id="trending">
        <TrendingScroller />
      </div>

      <Features />
      <Process />

      <section style={{ padding: 'var(--section-padding) 0', overflow: 'hidden' }}>
        <div className="container responsive-flex" style={{ gap: 'clamp(3rem, 6vw, 6rem)' }}>
          <div style={{ flex: 1 }} className="reveal">
            <span style={{ color: 'var(--primary)', fontWeight: '900', fontSize: '0.8rem', letterSpacing: '0.3rem' }}>PREMIUM CURATION</span>
            <h2 style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>Only the <span className="text-gradient">Best</span> Makes the Cut.</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: '1.8' }}>
              We don't list every place. We list the right places. Our 'Excellence Council' personally visits and verifies every establishment before it earns the Fame mark.
            </p>
            <div style={{ display: 'flex', gap: 'clamp(1.5rem, 4vw, 3rem)', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <h4 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', fontWeight: '900', color: 'var(--primary)' }}>5.8k+</h4>
                    <span style={{ fontWeight: '700', fontSize: '0.8rem', color: 'var(--text-muted)' }}>VERIFIED SPOTS</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h4 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', fontWeight: '900', color: 'var(--primary)' }}>12</h4>
                    <span style={{ fontWeight: '700', fontSize: '0.8rem', color: 'var(--text-muted)' }}>GLOBAL CITIES</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h4 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', fontWeight: '900', color: 'var(--primary)' }}>24/7</h4>
                    <span style={{ fontWeight: '700', fontSize: '0.8rem', color: 'var(--text-muted)' }}>ACCESS HOOKS</span>
                </div>
            </div>
          </div>
          <div style={{ flex: 1, position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ 
                width: '100%', 
                aspectRatio: '1', 
                borderRadius: 'clamp(20px, 5vw, 50px)', 
                overflow: 'hidden',
                boxShadow: '0 50px 100px -20px rgba(0,0,0,0.2)',
                transform: 'rotate(0deg)'
            }}>
                <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80" alt="curation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <section style={{ padding: 'var(--section-padding) 0', borderTop: '1px solid var(--border-light)', overflow: 'hidden' }}>
        <div className="container" style={{ textAlign: 'center' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '0.4rem' }}>TRUSTED BY GLOBAL VISIONARIES</span>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              gap: 'clamp(1.5rem, 5vw, 4rem)', 
              marginTop: '5rem', 
              opacity: 0.3, 
              fontSize: 'clamp(1.2rem, 4vw, 1.8rem)', 
              fontWeight: '900', 
              letterSpacing: '2px' 
            }} className="logo-grid">
                <span>GOOGLE</span>
                <span>META</span>
                <span>NETFLIX</span>
                <span>PAYPAL</span>
            </div>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding) 0', background: '#111827', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <h2 style={{ color: 'white', marginBottom: '2.5rem' }}>Ready to <span style={{ color: 'var(--primary)' }}>Fame</span> your city?</h2>
          <p style={{ opacity: 0.7, marginBottom: '5rem', maxWidth: '750px', margin: '0 auto 5rem', fontSize: '1.1rem' }}>
            Join 50k+ explorers who are redefining their lifestyle discovery through verified curation.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center' }}>
            <button 
                onClick={() => navigate('/login')}
                className="btn btn-primary" 
                style={{ padding: '1.25rem 3.5rem', borderRadius: '20px', width: '100%', maxWidth: '300px' }}
            >
                Create Account
            </button>
            <button 
                onClick={() => navigate('/admin')}
                className="btn btn-glass" 
                style={{ padding: '1.25rem 3.5rem', borderRadius: '20px', width: '100%', maxWidth: '300px' }}
            >
                Partner with Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
