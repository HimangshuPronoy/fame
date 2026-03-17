import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: '#111827', color: 'white', padding: 'clamp(4rem, 10vw, 8rem) 0 4rem' }}>
      <div className="container" style={{ padding: '0 5%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: 'clamp(4rem, 8vw, 6rem)' }}>
          <div style={{ gridColumn: 'span min(1, 1)' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.25rem)', marginBottom: '1.5rem', color: 'white', fontWeight: '900', letterSpacing: '-2px' }}>
                Fame<span style={{ color: 'var(--primary)' }}>.</span>
              </h2>
            </Link>
            <p style={{ opacity: 0.6, fontSize: '0.9rem', lineHeight: '1.7', maxWidth: '300px' }}>
              Your ultimate companion for discovering premium lifestyle experiences globally. Hand-verified for excellence.
            </p>
          </div>
          
           <div>
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Discovery</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><Link to="/listings" className="footer-link">Marketplace</Link></li>
              <li><Link to="/#trending" className="footer-link">Trending Spots</Link></li>
              <li><Link to="/listings?sort=new" className="footer-link">New Openings</Link></li>
              <li><Link to="/#categories" className="footer-link">Featured Niches</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><Link to="/" className="footer-link">About Us</Link></li>
              <li><Link to="/admin" className="footer-link">Join as Partner</Link></li>
              <li><Link to="/login" className="footer-link">Legal Notice</Link></li>
              <li><Link to="/" className="footer-link">Contact Support</Link></li>
            </ul>
          </div>
          
          <div style={{ gridColumn: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Newsletter</h4>
            <p style={{ opacity: 0.6, fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>Stay updated with the latest trending spots.</p>
            <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '0.35rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <input 
                type="email" 
                placeholder="Email address" 
                style={{ background: 'transparent', border: 'none', color: 'white', padding: '0.6rem 1rem', flex: 1, outline: 'none', fontSize: '0.85rem' }} 
              />
              <button className="btn btn-primary" style={{ padding: '0 1.25rem', borderRadius: '8px', fontSize: '0.85rem' }}>Join</button>
            </div>
          </div>
        </div>
        
        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.08)', 
          paddingTop: '2.5rem', 
          opacity: 0.4, 
          fontSize: '0.8rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
            <span>© 2026 Fame Discovery. All rights reserved.</span>
            <div style={{ display: 'flex', gap: '1.5rem', fontWeight: '700', letterSpacing: '0.05em' }}>
                <span style={{ cursor: 'pointer' }}>INSTAGRAM</span>
                <span style={{ cursor: 'pointer' }}>TWITTER</span>
                <span style={{ cursor: 'pointer' }}>LINKEDIN</span>
            </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          color: white;
          text-decoration: none;
          opacity: 0.6;
          transition: all 0.3s var(--ease-premium);
          font-weight: 500;
        }
        .footer-link:hover {
          opacity: 1;
          color: var(--primary);
          transform: translateX(5px);
          display: inline-block;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
