import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Globe, Sparkles, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useStore } from '../hooks/useStore';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
        if (searchTerm.trim()) {
            navigate(`/listings?q=${encodeURIComponent(searchTerm)}`);
        }
    }
  };

  const { user, profile, signOut } = useStore();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
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
      background: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(20px)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4rem' }}>
          <Link to="/" style={{ 
            color: isScrolled || !isHome ? '#0F172A' : (isMobileMenuOpen ? '#0F172A' : 'white'), 
            fontSize: window.innerWidth < 768 ? '1.8rem' : '2.2rem', 
            fontWeight: '900', 
            textDecoration: 'none', 
            letterSpacing: '-2.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            zIndex: 1100
          }}>
            Fame<span style={{ color: 'var(--primary)' }}>.</span>
          </Link>
          
          <div style={{ 
            display: window.innerWidth < 1024 ? 'none' : 'flex', 
            alignItems: 'center', 
            gap: '1rem', 
            background: isScrolled || !isHome ? '#F1F5F9' : 'rgba(255,255,255,0.1)',
            padding: '0.5rem 1.25rem',
            borderRadius: '12px',
            width: '300px',
            border: isScrolled || !isHome ? '1px solid transparent' : '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.3s'
          }}>
            <Search 
                size={18} 
                color={isScrolled || !isHome ? '#64748B' : 'white'} 
                onClick={handleSearch}
                style={{ cursor: 'pointer' }}
            />
            <input 
                type="text" 
                placeholder="Search spots..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
                style={{ 
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: isScrolled || !isHome ? '#0F172A' : 'white',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    width: '100%'
                }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ 
            display: window.innerWidth < 768 ? 'none' : 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: isScrolled || !isHome ? 'var(--text-secondary)' : 'white',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            <Globe size={18} />
            MN / EN
          </div>
          
          <div style={{ display: window.innerWidth < 768 ? 'none' : 'block' }}>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                 <Link to="/dashboard" style={{ 
                   display: 'flex', 
                   alignItems: 'center', 
                   gap: '0.75rem', 
                   textDecoration: 'none',
                   color: isScrolled || !isHome ? '#0F172A' : 'white' 
                 }}>
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
                      {profile?.full_name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{profile?.full_name?.split(' ')[0] || 'User'}</span>
                 </Link>
                 <button 
                   onClick={handleLogout}
                   style={{ 
                     background: 'transparent', 
                     border: 'none', 
                     color: isScrolled || !isHome ? '#64748B' : 'rgba(255,255,255,0.8)',
                     fontWeight: '700',
                     cursor: 'pointer',
                     fontSize: '0.9rem'
                   }}
                 >
                   Sign Out
                 </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <Link to="/login" style={{ 
                  color: isScrolled || !isHome ? '#0F172A' : 'white', 
                  textDecoration: 'none', 
                  fontSize: '0.95rem', 
                  fontWeight: '700' 
                }}>
                  Log In
                </Link>
                <button 
                  onClick={() => navigate('/login')}
                  className={isScrolled || !isHome ? "btn btn-primary" : "btn btn-glass"}
                  style={{ 
                    padding: '0.75rem 2rem', 
                    borderRadius: '14px',
                    boxShadow: isScrolled || !isHome ? '0 8px 20px rgba(239, 68, 68, 0.2)' : 'none'
                  }}
                >
                  <Sparkles size={16} />
                  Join Fame
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ 
              display: window.innerWidth < 768 ? 'flex' : 'none',
              background: 'transparent',
              border: 'none',
              color: isScrolled || !isHome ? '#0F172A' : (isMobileMenuOpen ? '#0F172A' : 'white'),
              cursor: 'pointer',
              zIndex: 1100
            }}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div style={{ 
          position: 'fixed', 
          inset: 0, 
          background: 'white', 
          zIndex: 1050, 
          display: 'flex', 
          flexDirection: 'column',
          padding: '10rem 2rem',
          gap: '2.5rem'
        }}>
           <Link to="/listings" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0F172A', textDecoration: 'none' }}>Marketplace</Link>
           <a href="/#categories" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0F172A', textDecoration: 'none' }}>Categories</a>
           <a href="/#trending" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0F172A', textDecoration: 'none' }}>Trending</a>
           <div style={{ height: '1px', background: '#E2E8F0', width: '100%', margin: '1rem 0' }}></div>
           {user ? (
             <>
               <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)', textDecoration: 'none' }}>My Dashboard</Link>
               <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} style={{ background: 'none', border: 'none', color: '#64748B', fontWeight: '700', fontSize: '1.5rem', textAlign: 'left', padding: 0 }}>Sign Out</button>
             </>
           ) : (
             <>
               <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0F172A', textDecoration: 'none' }}>Sign In</Link>
               <button onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }} className="btn btn-primary" style={{ padding: '1.25rem', borderRadius: '16px' }}>Join Fame</button>
             </>
           )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
