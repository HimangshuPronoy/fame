import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: '#111827', color: 'white', padding: '10rem 0 5rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '5rem', marginBottom: '8rem' }}>
          <div>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'white', fontWeight: '900', letterSpacing: '-2px' }}>
                Fame<span style={{ color: 'var(--primary)' }}>.</span>
              </h2>
            </Link>
            <p style={{ opacity: 0.6, fontSize: '1rem', lineHeight: '1.8', maxWidth: '300px' }}>
              Your ultimate companion for discovering premium lifestyle experiences across the globe. Hand-verified for the elite.
            </p>
          </div>
          
           <div>
            <h4 style={{ color: 'white', marginBottom: '2rem', fontSize: '1.2rem', fontWeight: '800' }}>Discovery</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <li><Link to="/listings" className="footer-link">Marketplace</Link></li>
              <li><a href="/#trending" className="footer-link">Trending Spots</a></li>
              <li><Link to="/listings?sort=new" className="footer-link">New Openings</Link></li>
              <li><a href="/#categories" className="footer-link">Featured Niches</a></li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ color: 'white', marginBottom: '2rem', fontSize: '1.2rem', fontWeight: '800' }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <li><Link to="/" className="footer-link">About Us</Link></li>
              <li><Link to="/admin" className="footer-link">Join as Partner</Link></li>
              <li><Link to="/listings" className="footer-link">Legal Notice</Link></li>
              <li><Link to="/" className="footer-link">Contact Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ color: 'white', marginBottom: '2rem', fontSize: '1.2rem', fontWeight: '800' }}>Newsletter</h4>
            <p style={{ opacity: 0.6, fontSize: '1rem', marginBottom: '2rem', lineHeight: '1.6' }}>Stay updated with the latest trending spots and exclusive invites.</p>
            <div style={{ display: 'flex', gap: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '0.4rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <input 
                type="email" 
                placeholder="Email address" 
                style={{ background: 'transparent', border: 'none', color: 'white', padding: '0.75rem 1.25rem', flex: 1, outline: 'none', fontSize: '0.9rem' }} 
              />
              <button className="btn btn-primary" style={{ padding: '0 1.5rem', borderRadius: '10px' }}>Join</button>
            </div>
          </div>
        </div>
        
        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.05)', 
          paddingTop: '4rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          opacity: 0.5, 
          fontSize: '0.9rem',
          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
          gap: '2rem',
          textAlign: 'center'
        }}>
            <span>© 2026 Fame Discovery. All rights reserved.</span>
            <div style={{ display: 'flex', gap: '2rem' }}>
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
