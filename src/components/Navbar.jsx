import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Globe, Sparkles, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useStore } from '../hooks/useStore';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const { user, profile, signOut } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
      setIsMobileMenuOpen(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      zIndex: 1000, 
      height: 'var(--nav-height)',
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.4s var(--ease-premium)',
      background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(20px)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div 
          onClick={() => navigate('/')} 
          style={{ 
            color: isScrolled || !isHome ? '#0F172A' : (isMobileMenuOpen ? '#0F172A' : 'white'), 
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', 
            fontWeight: '900', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            letterSpacing: '-2px'
          }}
        >
          Fame<span style={{ color: 'var(--primary)' }}>.</span>
        </div>

        {/* Desktop Menu */}
        <div className="desktop-only">
          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
            <a href="#trending" className="nav-link" style={{ color: isScrolled || !isHome ? 'var(--text-secondary)' : 'rgba(255,255,255,0.85)' }}>Trending</a>
            <a href="#categories" className="nav-link" style={{ color: isScrolled || !isHome ? 'var(--text-secondary)' : 'rgba(255,255,255,0.85)' }}>Explore</a>
            <button 
              onClick={() => navigate('/marketplace')}
              className="nav-link" 
              style={{ color: isScrolled || !isHome ? 'var(--text-secondary)' : 'rgba(255,255,255,0.85)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              Marketplace
            </button>
            
            <div style={{ width: '1px', height: '24px', background: isScrolled || !isHome ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)', margin: '0 0.5rem' }}></div>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  background: 'var(--primary)', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '0.75rem'
                }}>
                  {profile?.full_name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                </div>
                <button 
                  onClick={handleLogout}
                  className="btn btn-primary" 
                  style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', borderRadius: '10px' }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <Link to="/login" style={{ color: isScrolled || !isHome ? '#0F172A' : 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '700' }}>Log In</Link>
                  <button 
                    onClick={() => navigate('/login')}
                    className="btn btn-primary" 
                    style={{ padding: '0.65rem 1.25rem', borderRadius: '10px' }}
                  >
                    Join Fame
                  </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="mobile-only" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ cursor: 'pointer', zIndex: 1100 }}>
          {isMobileMenuOpen ? (
            <X color="#0F172A" size={28} />
          ) : (
            <Menu color={isScrolled || !isHome ? 'var(--text-main)' : 'white'} size={28} />
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="reveal" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'white',
          zIndex: 1050,
          padding: '8rem 2rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          <a href="#trending" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)', textDecoration: 'none' }}>Trending</a>
          <a href="#categories" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)', textDecoration: 'none' }}>Explore</a>
          <span onClick={() => { navigate('/marketplace'); setIsMobileMenuOpen(false); }} style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)', cursor: 'pointer' }}>Marketplace</span>
          <hr style={{ border: 'none', borderTop: '1px solid var(--border-light)' }} />
          {user ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.25rem' }}>
                   {profile?.full_name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                </div>
                <div>
                   <div style={{ fontWeight: '800', fontSize: '1rem' }}>{profile?.full_name || 'User'}</div>
                   <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{user.email}</div>
                </div>
              </div>
              <button onClick={handleLogout} className="btn btn-primary" style={{ padding: '1rem', fontSize: '1rem' }}>Sign Out</button>
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className="btn btn-primary" style={{ padding: '1.25rem', fontSize: '1.1rem', borderRadius: '16px' }}>Login / Sign Up</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
