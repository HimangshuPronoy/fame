import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Eye, EyeOff, ShieldCheck } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Ensure 100vh and no scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) {
      alert("Please agree to the Terms & Privacy Policy to continue.");
      return;
    }
    console.log("Auth Success:", formData);
    navigate('/');
  };

  return (
    <div style={{ 
        display: 'flex', 
        height: '100vh', 
        width: '100vw', 
        background: 'white', 
        overflow: 'hidden',
        position: 'fixed',
        inset: 0,
        zIndex: 2000
    }}>
      {/* Left Side: Aesthetic Lifestyle Image */}
      <div style={{ 
        flex: 1.2, 
        position: 'relative', 
        overflow: 'hidden',
        display: window.innerWidth < 1024 ? 'none' : 'block' 
      }}>
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80" 
          alt="Lifestyle"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7))',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '4rem'
        }}>
          <h2 style={{ color: 'white', fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-2px', marginBottom: '1rem', lineHeight: '1.1' }}>
            Elevate Your <br /> <span style={{ color: 'var(--primary)' }}>Lifestyle Experience.</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', maxWidth: '450px', lineHeight: '1.6' }}>
            Join a community of elite explorers discovering the world's most premium establishments.
          </p>
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        padding: '2.5rem 4rem',
        overflowY: 'auto'
      }}>
        {/* Header Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
          <button 
            onClick={() => navigate('/')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.6rem', 
              background: 'transparent', 
              border: 'none', 
              color: '#64748B', 
              fontWeight: '700', 
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            <ArrowLeft size={18} /> Back
          </button>
          <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem' }}>
             <span style={{ color: '#64748B', fontWeight: '500' }}>
               {isLogin ? "New?" : "Member?"}
             </span>
             <button 
               onClick={() => setIsLogin(!isLogin)}
               style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: '800', cursor: 'pointer', padding: 0 }}
             >
               {isLogin ? "Join Now" : "Sign In"}
             </button>
          </div>
        </div>

        {/* Form Container */}
        <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#0F172A', marginBottom: '0.75rem', letterSpacing: '-1px' }}>
            {isLogin ? "Welcome Back" : "Start Discovering"}
          </h1>
          <p style={{ color: '#64748B', marginBottom: '3rem', fontSize: '1rem', fontWeight: '500' }}>
            {isLogin ? "Enter your details to sign in." : "Create your account today."}
          </p>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {!isLogin && (
              <div>
                <label className="auth-label">Full Name</label>
                <input 
                  type="text" 
                  className="auth-input" 
                  placeholder="John Doe" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            )}
            
            <div>
              <label className="auth-label">Email Address</label>
              <input 
                type="email" 
                className="auth-input" 
                placeholder="name@example.com" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <label className="auth-label">Password</label>
              <input 
                type={showPass ? "text" : "password"} 
                className="auth-input" 
                placeholder="••••••••" 
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button 
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: '1.25rem', bottom: '0.8rem', background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', cursor: 'pointer' }} onClick={() => setAgreed(!agreed)}>
               <div style={{ 
                 width: '20px', 
                 height: '20px', 
                 borderRadius: '6px', 
                 border: '2px solid' + (agreed ? ' var(--primary)' : ' #E2E8F0'),
                 background: agreed ? 'var(--primary)' : 'white',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 transition: 'all 0.2s',
                 marginTop: '2px',
                 flexShrink: 0
               }}>
                 {agreed && <Check size={14} color="white" strokeWidth={4} />}
               </div>
               <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: '1.4', fontWeight: '500' }}>
                 I agree to the <span style={{ color: '#0F172A', fontWeight: '700' }}>Terms</span> and <span style={{ color: '#0F172A', fontWeight: '700' }}>Privacy</span>.
               </p>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ padding: '1.1rem', fontSize: '1rem', borderRadius: '16px', marginTop: '0.5rem' }}
            >
              {isLogin ? "Sign In Now" : "Create Account"}
            </button>
          </form>

          {/* Social Auth */}
          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
             <p style={{ fontSize: '0.75rem', fontWeight: '800', color: '#CBD5E1', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>OR CONTINUE WITH</p>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {['Google', 'Apple', 'Meta'].map(p => (
                   <button key={p} style={{ padding: '0.75rem', borderRadius: '12px', border: '1.5px solid #E2E8F0', background: 'white', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer' }}>{p}</button>
                ))}
             </div>
          </div>
        </div>

        {/* Footer info */}
        <div style={{ marginTop: 'auto', paddingTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#94A3B8' }}>
           <ShieldCheck size={18} />
           <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>Bank-grade security encryption.</span>
        </div>
      </div>

      <style>{`
        .auth-input::placeholder { color: #CBD5E1; }
        .btn:hover { opacity: 0.95; transform: translateY(-2px); }
      `}</style>
    </div>
  );
};

export default Login;
