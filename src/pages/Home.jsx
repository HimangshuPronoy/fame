import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategorySection from '../components/CategorySection';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import Process from '../components/Process';
import TrendingScroller from '../components/TrendingScroller';
import { Search, MapPin, Compass, Play } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [bgIndex, setBgIndex] = useState(0);
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
      setBgIndex((prev) => (prev + 1) % length);
    }, 5000);
    return () => clearInterval(timer);
  }, [backgroundImages.length]);

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
    <div style={{ background: 'white' }}>
      <section 
        style={{ 
          height: '100vh',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url(${backgroundImages[bgIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          transition: 'background-image 2.5s cubic-bezier(0.16, 1, 0.3, 1)',
          color: 'white',
          padding: 0,
          position: 'relative'
        }}
      >
        <div className="container reveal" style={{ zIndex: 10 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', padding: '0.75rem 1.5rem', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.2)', marginBottom: '3rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }}></div>
              <span style={{ fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.15em' }}>EVERYTHING IS POSSIBLE</span>
          </div>
          
          <h1 style={{ marginBottom: '2.5rem', textShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            Elevate Your <br/>
            <span style={{ fontStyle: 'italic', fontWeight: '300', opacity: 0.9 }}>Lifestyle</span> Discovery<span style={{ color: 'var(--primary)' }}>.</span>
          </h1>
          
          <p style={{ fontSize: '1.4rem', opacity: 0.95, marginBottom: '4rem', maxWidth: '700px', lineHeight: '1.6', fontWeight: '500' }}>
            Fame hand-verifies the world’s most exclusive restaurants, secret nightspots, and elite wellness centers.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ 
              background: 'white', 
              padding: '0.75rem', 
              borderRadius: '24px', 
              display: 'flex', 
              width: '100%',
              maxWidth: '650px',
              boxShadow: '0 30px 60px -15px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{ flex: 1, padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Search size={22} color="var(--primary)" />
                <input 
                  type="text" 
                  placeholder="What are you looking for?" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearch}
                  style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.05rem', color: '#0F172A', fontWeight: '600' }}
                />
              </div>
              <button 
                onClick={handleSearch}
                className="btn btn-primary" 
                style={{ padding: '1rem 3rem', borderRadius: '18px', fontSize: '1rem' }}
              >
                Find Now
              </button>
            </div>
            
            <button className="btn btn-glass" style={{ width: '64px', height: '64px', borderRadius: '50%', padding: 0 }}>
              <Play fill="white" size={24} />
            </button>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', opacity: 0.6 }}>
            <span style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.2em' }}>SCROLL</span>
            <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, white, transparent)' }}></div>
        </div>
      </section>

      <section style={{ padding: '12rem 0', background: 'var(--bg-subtle)' }}>
        <CategorySection />
      </section>

      <TrendingScroller />
      <Features />
      <Process />

      <section style={{ padding: '12rem 0', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'flex', gap: '6rem', alignItems: 'center' }}>
          <div style={{ flex: 1 }} className="reveal">
            <span style={{ color: 'var(--primary)', fontWeight: '900', fontSize: '0.8rem', letterSpacing: '0.3rem' }}>PREMIUM CURATION</span>
            <h2 style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>Only the <span className="text-gradient">Best</span> Makes the Cut.</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '4rem', lineHeight: '1.8' }}>
              We don't list every place. We list the right places. Our 'Excellence Council' personally visits and verifies every establishment before it earns the Fame mark.
            </p>
            <div style={{ display: 'flex', gap: '3rem' }}>
                <div>
                    <h4 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)' }}>5.8k+</h4>
                    <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-muted)' }}>VERIFIED SPOTS</span>
                </div>
                <div>
                    <h4 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)' }}>12</h4>
                    <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-muted)' }}>GLOBAL CITIES</span>
                </div>
                <div>
                    <h4 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)' }}>24/7</h4>
                    <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-muted)' }}>ACCESS HOOKS</span>
                </div>
            </div>
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
            <div style={{ 
                width: '100%', 
                aspectRatio: '1', 
                borderRadius: '50px', 
                overflow: 'hidden',
                boxShadow: '0 50px 100px -20px rgba(0,0,0,0.2)',
                transform: 'rotate(-2deg)'
            }}>
                <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80" alt="curation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ 
                position: 'absolute', 
                bottom: '-30px', 
                left: '-30px', 
                background: 'white', 
                padding: '2rem', 
                borderRadius: '30px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                border: '1px solid var(--border-light)'
            }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    <Compass size={24} />
                </div>
                <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '900' }}>Excellence Badge</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Official Verification</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <section style={{ padding: '8rem 0', borderTop: '1px solid var(--border-light)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '900', letterSpacing: '0.4rem' }}>TRUSTED BY GLOBAL VISIONARIES</span>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '6rem', marginTop: '6rem', opacity: 0.3, fontSize: '2rem', fontWeight: '900', letterSpacing: '2px' }}>
                <span>GOOGLE</span>
                <span>META</span>
                <span>NETFLIX</span>
                <span>PAYPAL</span>
            </div>
        </div>
      </section>

      <section style={{ padding: '12rem 0', background: '#111827', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <h2 style={{ fontSize: '4.5rem', color: 'white', marginBottom: '2.5rem' }}>Ready to <span style={{ color: 'var(--primary)' }}>Fame</span> your city?</h2>
          <p style={{ fontSize: '1.4rem', opacity: 0.7, marginBottom: '5rem', maxWidth: '700px', margin: '0 auto 5rem' }}>
            Join 50k+ explorers who are redefining their lifestyle discovery through verified curation.
          </p>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <button 
                onClick={() => navigate('/login')}
                className="btn btn-primary" 
                style={{ padding: '1.5rem 4rem', borderRadius: '24px', fontSize: '1.1rem' }}
            >
                Create Account
            </button>
            <button 
                onClick={() => navigate('/admin')}
                className="btn btn-glass" 
                style={{ padding: '1.5rem 4rem', borderRadius: '24px', fontSize: '1.1rem' }}
            >
                Partner with Us
            </button>
          </div>
        </div>
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '40%', height: '60%', background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)' }}></div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
