import { Search, ShieldCheck, MapPin } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      icon: <Search size={32} />,
      title: "Discover Nearby",
      desc: "Search by category or keyword to find the most trending spots in your current city."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Verified Choice",
      desc: "Check for the 'Fame Verified' badge to ensure premium service and verified authenticity."
    },
    {
      icon: <MapPin size={32} />,
      title: "Experience Excellence",
      desc: "Use Fame hooks for instant access or book directly through our verified partners."
    }
  ];

  return (
    <section style={{ padding: 'var(--section-padding) 0', background: 'var(--bg-subtle)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
          <span style={{ color: 'var(--primary)', fontWeight: '900', fontSize: '0.8rem', letterSpacing: '0.3rem' }}>THREE SIMPLE STEPS</span>
          <h2 style={{ marginTop: '2rem' }}>Experience the World of Fame</h2>
        </div>

        <div className="grid-3" style={{ position: 'relative' }}>
          {/* Connector Line - Hidden on mobile */}
          <div 
            className="process-connector"
            style={{ 
              position: 'absolute', 
              top: '40px', 
              left: '10%', 
              right: '10%', 
              height: '2px', 
              background: 'linear-gradient(to right, transparent, var(--border-light), transparent)',
              zIndex: 0,
            }}
          ></div>

          {steps.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: 'white', 
                border: '1px solid var(--border-light)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 2.5rem',
                color: 'var(--primary)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
              }}>
                {s.icon}
              </div>
              <h4 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', fontWeight: '800' }}>{s.title}</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '300px', margin: '0 auto' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .process-connector { display: none; }
        }
      `}</style>
    </section>
  );
};

export default Process;
