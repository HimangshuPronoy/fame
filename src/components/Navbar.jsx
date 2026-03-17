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
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      background: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(20px)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div 
          onClick={() => navigate('/')} 
          style={{ 
            color: isScrolled || !isHome ? '#0F172A' : (isMobileMenuOpen ? '#0F172A' : 'white'), 
            fontSize: '1.8rem', 
            fontWeight: '900', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}
        >
          Fame<span style={{ color: 'var(--primary)' }}>.</span>
        </div>

        {/* Desktop Menu */}
        <div className="desktop-only" style={{ gap: '3rem', alignItems: 'center' }}>
          <a href="#trending" className="nav-link" style={{ color: isScrolled || !isHome ? 'var(--text-secondary)' : 'rgba(255,255,255,0.8)' }}>Trending</a>
          <a href="#categories" className="nav-link" style={{ color: isScrolled || !isHome ? 'var(--text-secondary)' : 'rgba(255,255,255,0.8)' }}>Explore</a>
          <button 
            onClick={() => navigate('/marketplace')}
            className="nav-link" 
            style={{ color: isScrolled || !isHome ? 'var(--text-secondary)' : 'rgba(255,255,255,0.8)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            Marketplace
          </button>
          
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '50%', 
                background: 'var(--primary)', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '0.8rem'
              }}>
                {profile?.full_name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
              </div>
              <button 
                onClick={handleLogout}
                className="btn btn-primary" 
                style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <Link to="/login" style={{ color: isScrolled || !isHome ? '#0F172A' : 'white', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '700' }}>Log In</Link>
                <button 
                  onClick={() => navigate('/login')}
                  className="btn btn-primary" 
                  style={{ padding: '0.75rem 1.5rem', borderRadius: '12px' }}
                >
                  Join Fame
                </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="mobile-only" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ cursor: 'pointer', zIndex: 1100 }}>
          {isMobileMenuOpen ? (
            <X color="#0F172A" size={32} />
          ) : (
            <Menu color={isScrolled || !isHome ? 'var(--text-main)' : 'white'} size={32} />
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div style={{
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
          gap: '2.5rem',
          animation: 'revealUp 0.4s var(--ease-premium)'
        }}>
          <a href="#trending" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-main)', textDecoration: 'none' }}>Trending</a>
          <a href="#categories" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-main)', textDecoration: 'none' }}>Explore</a>
          <span onClick={() => { navigate('/marketplace'); setIsMobileMenuOpen(false); }} style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-main)', cursor: 'pointer' }}>Marketplace</span>
          <hr style={{ border: 'none', borderTop: '1px solid var(--border-light)' }} />
          {user ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontWeight: '800', fontSize: '1.5rem' }}>
                   {profile?.full_name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                </div>
                <div>
                   <div style={{ fontWeight: '800', fontSize: '1.2rem' }}>{profile?.full_name || 'User'}</div>
                   <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{user.email}</div>
                </div>
              </div>
              <button onClick={handleLogout} className="btn btn-primary" style={{ padding: '1.2rem', fontSize: '1.1rem' }}>Sign Out</button>
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className="btn btn-primary" style={{ padding: '1.5rem', fontSize: '1.2rem', borderRadius: '20px' }}>Login / Sign Up</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
