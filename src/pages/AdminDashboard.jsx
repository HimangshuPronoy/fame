import { useState } from 'react';
import { useStore } from '../hooks/useStore';
import { Plus, Trash2, X, Database, Layers, BarChart, Settings, Search } from 'lucide-react';

const AdminDashboard = () => {
  const { listings, loading, addListing, deleteListing } = useStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState('inventory');
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '0',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category) return;
    addListing(formData);
    setFormData({ 
      name: '', 
      category: '', 
      description: '', 
      price: '0',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80' 
    });
    setShowAddForm(false);
  };

  return (
    <div className="admin-root" style={{ background: '#f0f2f5', minHeight: '100vh', display: 'flex' }}>
      {/* SaaS Sidebar - Hidden on Mobile */}
      <aside className="desktop-only" style={{ 
        width: '280px', 
        background: '#1a1b1d', 
        color: 'white', 
        padding: '2.5rem 1.5rem',
        flexDirection: 'column',
        gap: '2rem',
        position: 'sticky',
        top: 0,
        height: '100vh'
      }}>
        <div style={{ padding: '0 0.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '900', letterSpacing: '-0.5px', color: 'var(--primary)' }}>FAME HUB</h2>
          <p style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '0.25rem' }}>Company Owner Console</p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
          {[
            { id: 'inventory', icon: <Database size={18} />, label: 'Marketplace Items' },
            { id: 'analytics', icon: <BarChart size={18} />, label: 'Revenue & Growth' },
            { id: 'requests', icon: <Layers size={18} />, label: 'Active Requests' },
            { id: 'settings', icon: <Settings size={18} />, label: 'System Settings' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: activeTab === tab.id ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                color: activeTab === tab.id ? 'var(--primary)' : '#95979d',
                borderLeft: activeTab === tab.id ? '3px solid var(--primary)' : '3px solid transparent',
                textAlign: 'left',
                width: '100%',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', padding: '1rem', background: '#222325', borderRadius: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '50%' }}></div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>System Admin</div>
              <div style={{ fontSize: '0.7rem', color: '#95979d' }}>admin@hub.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Professional Content Area */}
      <main style={{ flex: 1, padding: 'clamp(1.5rem, 5vw, 3.5rem)', width: '100%', minWidth: 0 }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', fontWeight: '900', color: '#111' }}>Owner Console</h1>
            <p style={{ color: '#62646a', marginTop: '0.25rem', fontSize: '0.9rem' }}>Manage and verify all establishments listed on Fame.</p>
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="btn-primary btn"
            style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}
          >
            + Register New Business
          </button>
        </header>

        {/* Pro Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '1.5rem', 
          marginBottom: '3rem' 
        }}>
          {[
            { label: 'TOTAL LISTINGS', val: listings?.length || 0, change: '+12%', color: 'var(--primary)', bg: '#e6faf4' },
            { label: 'MONTHLY GROWTH', val: '24.8%', change: '+2.4%', color: '#4a6cf7', bg: '#eef1ff' },
            { label: 'PLATFORM STATUS', val: 'Healthy', change: 'Operational', color: '#ffb33e', bg: '#fff7e6' }
          ].map((s, i) => (
            <div key={i} style={{ 
              background: 'white', 
              padding: '1.5rem', 
              border: '1px solid #e4e5e7',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: '800', color: '#95979d', letterSpacing: '1px' }}>{s.label}</span>
                <span style={{ fontSize: '0.7rem', fontWeight: '700', color: s.color }}>{s.change}</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#111' }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Content Tabs & Management Table */}
        <div style={{ background: 'white', border: '1px solid #e4e5e7', overflow: 'hidden', borderRadius: '8px' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e4e5e7', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fcfcfe', flexWrap: 'wrap', gap: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Inventory Records</h3>
            <div style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '300px' }}>
              <div style={{ position: 'relative', width: '100%' }}>
                <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#95979d' }} />
                <input type="text" placeholder="Search records..." style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.25rem', fontSize: '0.85rem', border: '1px solid #e4e5e7', borderRadius: '6px' }} />
              </div>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            {loading ? (
                <div style={{ padding: '5rem', textAlign: 'center', color: '#62646a' }}>
                <div style={{ marginBottom: '1rem' }}>Synchronizing with Supabase Hub...</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>Fetching latest marketplace data</div>
                </div>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                <thead>
                    <tr style={{ background: '#f7f8fa', borderBottom: '1px solid #e4e5e7', textAlign: 'left' }}>
                    <th style={{ padding: '1.25rem 2rem', fontSize: '0.75rem', fontWeight: '800', color: '#95979d' }}>BUSINESS DETAILS</th>
                    <th style={{ padding: '1.25rem 2rem', fontSize: '0.75rem', fontWeight: '800', color: '#95979d' }}>CATEGORY</th>
                    <th style={{ padding: '1.25rem 2rem', fontSize: '0.75rem', fontWeight: '800', color: '#95979d' }}>RATING</th>
                    <th style={{ padding: '1.25rem 2rem', fontSize: '0.75rem', fontWeight: '800', color: '#95979d', textAlign: 'right' }}>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {listings?.map(item => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #f0f1f3' }}>
                    <td style={{ padding: '1.5rem 2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <img src={item.image} alt="" style={{ width: '64px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div>
                            <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#111' }}>{item.name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#62646a', marginTop: '0.15rem' }}>ID: {item.id.substring(0,8)}</div>
                        </div>
                        </div>
                    </td>
                    <td style={{ padding: '1.5rem 2rem' }}>
                        <span style={{ 
                        background: '#f0f1f3', 
                        color: '#62646a', 
                        padding: '0.35rem 0.75rem', 
                        fontSize: '0.7rem', 
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        borderRadius: '4px'
                        }}>{item.category}</span>
                    </td>
                    <td style={{ padding: '1.5rem 2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                        <span style={{ fontWeight: '800', color: '#111' }}>5.0</span>
                        <span style={{ fontSize: '0.75rem', color: '#95979d' }}>/5</span>
                        </div>
                    </td>
                    <td style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>
                        <button 
                        onClick={() => deleteListing(item.id)}
                        style={{ 
                            color: '#ff4d4f', 
                            fontSize: '0.85rem', 
                            fontWeight: '700',
                            background: 'transparent',
                            padding: '0.5rem',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                        >
                        Delete
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            )}
          </div>
        </div>
      </main>

      {/* Floating Modal for Add Business */}
      {showAddForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="reveal" style={{ 
            background: 'white', 
            width: '100%', 
            maxWidth: '550px', 
            padding: 'clamp(1.5rem, 5vw, 3rem)',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Register Establishment</h2>
              <button onClick={() => setShowAddForm(false)} style={{ background: 'transparent', color: '#95979d', border: 'none', cursor: 'pointer' }}><X size={28} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '800', fontSize: '0.75rem', color: '#95979d' }}>BUSINESS NAME</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Iron Gym Pro"
                  className="auth-input"
                  required
                />
              </div>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '800', fontSize: '0.75rem', color: '#95979d' }}>CATEGORY</label>
                <input 
                  type="text" 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  placeholder="e.g. Gym"
                  className="auth-input"
                  required
                />
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '800', fontSize: '0.75rem', color: '#95979d' }}>DESCRIPTION</label>
                <textarea 
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="The best place for..."
                  className="auth-input"
                  style={{ resize: 'none' }}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontWeight: '800', fontSize: '1rem' }}>
                Add to Marketplace
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
            .admin-root { flex-direction: column; }
            main { padding: 1.5rem !important; }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;



