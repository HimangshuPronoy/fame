import { useState } from 'react';
import { useStore } from '../hooks/useStore';
import { Plus, Clock, CheckCircle, MessageSquare, Briefcase } from 'lucide-react';

const UserDashboard = () => {
  const { requests, addRequest } = useStore();
  const [taskName, setTaskName] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName) return;
    addRequest({ user: 'Me', task: taskName });
    setTaskName('');
    setShowForm(false);
  };

  return (
    <div style={{ background: 'var(--bg-light)', minHeight: '100vh', padding: '5rem 0' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <header style={{ marginBottom: '3.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Buyer Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Manage your active requests and service status.</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="btn-primary shadow-fiverr"
            style={{ padding: '1rem 2.5rem' }}
          >
            Post a Request
          </button>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', marginBottom: '3.5rem' }}>
          <div className="dashboard-tile">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ background: '#eef1ff', padding: '0.75rem' }}>
                <Briefcase size={22} color="#4a6cf7" />
              </div>
              <span style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-dim)' }}>TOTAL REQUESTS</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700' }}>{requests.length}</div>
          </div>
          <div className="dashboard-tile">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ background: '#e6faf4', padding: '0.75rem' }}>
                <Clock size={22} color="var(--primary)" />
              </div>
              <span style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-dim)' }}>ACTIVE PROJECTS</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700' }}>{requests.filter(r => r.status !== 'Completed').length}</div>
          </div>
        </div>

        {showForm && (
          <div className="dashboard-tile animate-in" style={{ padding: '3.5rem', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '2rem' }}>What service are you looking for?</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '2.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '700', color: 'var(--text-main)' }}>Requirement Details</label>
                <textarea 
                  placeholder="I'm looking for a premium gym with..." 
                  rows="5"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <button type="submit" className="btn-primary" style={{ padding: '1rem 2.5rem' }}>Submit Request</button>
                <button 
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={{ color: 'var(--text-dim)', fontWeight: '700', background: 'transparent', padding: '1rem' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="dashboard-tile" style={{ padding: '0' }}>
          <div style={{ padding: '2rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700' }}>Manage Requests</h3>
          </div>
          <div style={{ background: '#fff' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-light)', background: 'var(--bg-light)' }}>
                  <th style={{ padding: '1.25rem 2rem', fontWeight: '700', color: 'var(--text-dim)', fontSize: '0.85rem', letterSpacing: '0.5px' }}>SERVICE REQUESTED</th>
                  <th style={{ padding: '1.25rem 2rem', fontWeight: '700', color: 'var(--text-dim)', fontSize: '0.85rem', letterSpacing: '0.5px' }}>DATE</th>
                  <th style={{ padding: '1.25rem 2rem', fontWeight: '700', color: 'var(--text-dim)', fontSize: '0.85rem', letterSpacing: '0.5px' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(req => (
                  <tr key={req.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <div style={{ color: 'var(--primary)' }}><MessageSquare size={20} /></div>
                        <span style={{ fontWeight: '500', fontSize: '1.05rem', color: 'var(--text-main)' }}>{req.task}</span>
                      </div>
                    </td>
                    <td style={{ padding: '2rem', color: 'var(--text-secondary)', fontSize: '1rem' }}>
                      {req.date}
                    </td>
                    <td style={{ padding: '2rem' }}>
                      <span className={`status-pill status-${req.status.toLowerCase()}`}>
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {requests.length === 0 && (
              <div style={{ padding: '6rem 2rem', textAlign: 'center' }}>
                <div style={{ color: 'var(--text-dim)', marginBottom: '2rem', fontSize: '1.1rem' }}>You have no active requests.</div>
                <button 
                  onClick={() => setShowForm(true)}
                  style={{ color: 'var(--primary)', fontWeight: '700', background: 'transparent', fontSize: '1.1rem' }}
                >
                  Post your first request +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;



