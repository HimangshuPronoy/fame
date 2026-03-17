import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Globe, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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
            color: isScrolled || !isHome ? '#0F172A' : 'white', 
            fontSize: '2.2rem', 
            fontWeight: '900', 
            textDecoration: 'none', 
            letterSpacing: '-2.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}>
            Fame<span style={{ color: 'var(--primary)' }}>.</span>
          </Link>
          
          <div style={{ 
            display: 'flex', 
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
            display: 'flex', 
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
      </div>
    </nav>
  );
};

export default Navbar;
