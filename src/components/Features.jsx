import { ShieldCheck, Zap, Globe, Heart } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <ShieldCheck size={36} />,
      title: "Verified Excellence",
      desc: "Every spot on Fame is hand-verified for quality and authenticity."
    },
    {
      icon: <Zap size={36} />,
      title: "Instant Access",
      desc: "Get priority hooks and real-time availability at trending spots."
    },
    {
      icon: <Globe size={36} />,
      title: "Global Curation",
      desc: "Discover premium lifestyles from Chicago to Ulaanbaatar."
    },
    {
      icon: <Heart size={36} />,
      title: "Curated for You",
      desc: "Personalized discovery based on your unique lifestyle tastes."
    }
  ];

  return (
    <section style={{ background: '#F8FAFC', padding: 'var(--section-padding) 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <span style={{ color: 'var(--primary)', fontWeight: '900', fontSize: '0.85rem', letterSpacing: '0.3rem', textTransform: 'uppercase' }}>Our Core Value</span>
          <h2 style={{ fontSize: '3.5rem', marginTop: '1.5rem', fontWeight: '800' }}>Why Explorers Choose Fame</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '650px', margin: '2rem auto 0', lineHeight: '1.8' }}>
            We bridge the gap between ordinary places and extraordinary experiences through meticulous curation and local insight.
          </p>
        </div>

        <div className="grid-4">
          {features.map((f, i) => (
            <div 
              key={i} 
              className="feature-card" 
            >
              <div className="feature-icon-wrapper">
                {f.icon}
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '1.25rem', color: '#0F172A' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6', fontWeight: '500' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .feature-card {
          padding: 4rem 2.5rem;
          text-align: center;
          background: white;
          border-radius: 32px;
          border: 1px solid #F1F5F9;
          transition: all 0.5s var(--ease-premium);
          cursor: default;
        }
        .feature-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 40px 80px -20px rgba(0,0,0,0.08);
          border-color: var(--primary);
        }
        .feature-icon-wrapper {
          width: 90px;
          height: 90px;
          border-radius: 28px;
          background: #F8FAFC;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2.5rem;
          color: var(--primary);
          transition: all 0.5s var(--ease-premium);
        }
        .feature-card:hover .feature-icon-wrapper {
          background: var(--primary);
          color: white;
          transform: scale(1.1) rotate(8deg);
          box-shadow: 0 15px 30px var(--primary-glow);
        }
      `}</style>
    </section>
  );
};

export default Features;
