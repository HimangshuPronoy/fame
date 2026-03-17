const Testimonials = () => {
  const reviews = [
    { name: "Enkhbold T.", role: "Lifestyle Blogger", text: "Fame has completely changed how I discover hidden gems in my city. The curation is perfectly aligned with premium tastes.", avatar: "https://i.pravatar.cc/150?u=1" },
    { name: "Sarah Jenkins", role: "Expat in Chicago", text: "Finding verified wellness spots used to be a chore. With Fame, I can trust every listing I see. Highly recommended!", avatar: "https://i.pravatar.cc/150?u=2" },
    { name: "Marcello Rossi", role: "Fine Dining Enthusiast", text: "The 'Instant Access' feature at restaurants is a game-changer. It's like having a digital concierge in my pocket.", avatar: "https://i.pravatar.cc/150?u=3" },
    { name: "Ariunaa B.", role: "Yoga Instructor", text: "I found my favorite studio through Fame. The verified badge actually means something here.", avatar: "https://i.pravatar.cc/150?u=4" },
    { name: "James Wilson", role: "Tech Entrepreneur", text: "The interface is slick and the content is better. No more sorting through fake reviews on other platforms.", avatar: "https://i.pravatar.cc/150?u=5" },
    { name: "Elena Gomez", role: "Travel Photographer", text: "The visual discovery tools on Fame help me find the most aesthetic spots for my shoots effortlessly.", avatar: "https://i.pravatar.cc/150?u=6" },
    { name: "David Chen", role: "Nightlife Curater", text: "Mapping out a night in a new city used to take hours. Fame does it in seconds with verified spots.", avatar: "https://i.pravatar.cc/150?u=7" },
    { name: "Sofia Meyer", role: "Spa Reviewer", text: "Luxury wellness spots are hard to verify. Fame's council does the work for us. Incredible service.", avatar: "https://i.pravatar.cc/150?u=8" },
  ];

  // Double the reviews for infinite scroll effect
  const doubleReviews = [...reviews, ...reviews];

  return (
    <section style={{ padding: 'var(--section-padding) 0', background: 'white', overflow: 'hidden' }}>
      <div className="container" style={{ marginBottom: '5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: window.innerWidth < 768 ? '2.5rem' : '3.5rem', marginBottom: '1.5rem' }}>Loved by Explorers</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: window.innerWidth < 768 ? '1rem' : '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Hear from our global community of lifestyle enthusiasts.
        </p>
      </div>

      <div style={{ position: 'relative', width: '100%' }}>
        {/* Shadow Overlays for Fade Effect */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '200px', height: '100%', background: 'linear-gradient(to right, white, transparent)', zIndex: 2 }}></div>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '100%', background: 'linear-gradient(to left, white, transparent)', zIndex: 2 }}></div>

        <div className="marquee">
          <div className="marquee-content">
            {doubleReviews.map((r, i) => (
              <div 
                key={i} 
                style={{ 
                  flexShrink: 0,
                  width: '400px',
                  padding: '3rem', 
                  border: '1px solid var(--border-light)', 
                  borderRadius: '32px',
                  background: 'white',
                  margin: '0 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  transition: 'all 0.4s var(--ease-premium)',
                  cursor: 'pointer'
                }}
                className="testimonial-card"
              >
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <img src={r.avatar} alt={r.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '800' }}>{r.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>{r.role}</span>
                  </div>
                </div>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: '1.7' }}>
                  "{r.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee {
          display: flex;
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .marquee-content {
          display: flex;
          animation: marquee 40s linear infinite;
        }
        .marquee:hover .marquee-content {
          animation-play-state: paused;
        }
        .testimonial-card:hover {
          border-color: var(--primary);
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
