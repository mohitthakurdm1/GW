import React, { useState } from 'react';

export default function AdminPanel({ data, setData, onNavigate }) {
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingService, setEditingService] = useState(null);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    category: '',
    icon: '',
    details: '',
    dates: '',
    whatsappMessage: ''
  });

  const correctPassword = 'admin@seva123';

  const handleLogin = () => {
    if (adminPassword === correctPassword) {
      setIsAuthenticated(true);
      setAdminPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    onNavigate('home');
  };

  const updateGurudwaraInfo = (field, value) => {
    setData(prev => {
      const updated = { ...prev, [field]: value };
      localStorage.setItem('gurudwaraData', JSON.stringify(updated));
      return updated;
    });
  };

  const addService = () => {
    if (!newService.title || !newService.category) {
      alert('Please fill in required fields');
      return;
    }

    const service = {
      ...newService,
      id: Math.max(...data.services.map(s => s.id), 0) + 1
    };

    setData(prev => {
      const updated = {
        ...prev,
        services: [...prev.services, service]
      };
      localStorage.setItem('gurudwaraData', JSON.stringify(updated));
      return updated;
    });

    setNewService({
      title: '',
      description: '',
      category: '',
      icon: '',
      details: '',
      dates: '',
      whatsappMessage: ''
    });
    alert('Service added successfully!');
  };

  const deleteService = (id) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setData(prev => {
        const updated = {
          ...prev,
          services: prev.services.filter(s => s.id !== id)
        };
        localStorage.setItem('gurudwaraData', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const updateEvent = (index, field, value) => {
    setData(prev => {
      const updated = {
        ...prev,
        events: prev.events.map((e, i) => 
          i === index ? { ...e, [field]: value } : e
        )
      };
      localStorage.setItem('gurudwaraData', JSON.stringify(updated));
      return updated;
    });
  };

  const updateCommitteeMember = (id, field, value) => {
    setData(prev => {
      const updated = {
        ...prev,
        committees: prev.committees.map(c => 
          c.id === id ? { ...c, [field]: value } : c
        )
      };
      localStorage.setItem('gurudwaraData', JSON.stringify(updated));
      return updated;
    });
  };

  if (!isAuthenticated) {
    return (
      <section style={{
        background: 'linear-gradient(135deg, var(--navy), var(--navy-light))',
        color: 'var(--white)',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div className="container">
          <div style={{
            maxWidth: '400px',
            margin: '0 auto',
            background: 'var(--white)',
            color: 'var(--navy)',
            padding: '2rem',
            borderRadius: '0.75rem',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)'
          }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
              Admin Login
            </h2>

            <div className="form-group">
              <label>Admin Password</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter admin password"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>

            <button 
              className="btn btn-primary btn-wide"
              onClick={handleLogin}
              style={{ marginBottom: '1rem' }}
            >
              Login
            </button>

            <button 
              className="btn btn-secondary btn-wide"
              onClick={() => onNavigate('home')}
            >
              Back to Home
            </button>

            <p style={{
              fontSize: '0.85rem',
              textAlign: 'center',
              marginTop: '1.5rem',
              color: 'var(--gray-dark)'
            }}>
              Admin credentials required. Contact system administrator if you don't have access.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Admin Header */}
      <section style={{
        background: 'linear-gradient(135deg, var(--navy), var(--navy-light))',
        color: 'var(--white)',
        padding: '2rem 1.5rem'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h1>⚙️ Admin Panel</h1>
            <button 
              className="btn btn-secondary"
              onClick={handleLogout}
              style={{ borderColor: 'var(--white)', color: 'var(--white)' }}
            >
              Logout
            </button>
          </div>
        </div>
      </section>

      {/* Admin Navigation */}
      <section style={{ padding: '1rem 1.5rem', backgroundColor: 'var(--gray-light)' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            {[
              { id: 'dashboard', label: '📊 Dashboard' },
              { id: 'info', label: '📋 Gurudwara Info' },
              { id: 'services', label: '🤝 Services' },
              { id: 'events', label: '📅 Events' },
              { id: 'committee', label: '👥 Committee' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  background: activeTab === tab.id ? 'var(--kesari)' : 'var(--white)',
                  color: activeTab === tab.id ? 'var(--white)' : 'var(--navy)',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.3s'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Admin Content */}
      <section style={{ padding: '3rem 1.5rem' }}>
        <div className="container">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="fade-in-up">
              <h2 style={{ marginBottom: '2rem' }}>Dashboard Overview</h2>
              
              <div className="grid grid-4">
                {[
                  { label: 'Total Services', value: data.services.length, icon: '🤝' },
                  { label: 'Events', value: data.events.length, icon: '📅' },
                  { label: 'Committee Members', value: data.committees.length, icon: '👥' },
                  { label: 'Last Updated', value: new Date().toLocaleDateString(), icon: '📅' }
                ].map((stat, index) => (
                  <div key={index} className="card" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{stat.icon}</div>
                    <p style={{ color: 'var(--gray-dark)', marginBottom: '0.5rem' }}>{stat.label}</p>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--kesari)' }}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="card" style={{ marginTop: '2rem' }}>
                <h3>Quick Actions</h3>
                <div style={{
                  display: 'grid',
                  gap: '1rem',
                  marginTop: '1rem'
                }}>
                  <button className="btn btn-primary" onClick={() => setActiveTab('info')}>
                    Update Gurudwara Info
                  </button>
                  <button className="btn btn-primary" onClick={() => setActiveTab('services')}>
                    Manage Services
                  </button>
                  <button className="btn btn-primary" onClick={() => setActiveTab('events')}>
                    Manage Events
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Gurudwara Info */}
          {activeTab === 'info' && (
            <div className="fade-in-up">
              <h2 style={{ marginBottom: '2rem' }}>Gurudwara Information</h2>
              
              <div className="card">
                <h3 style={{ marginBottom: '1.5rem' }}>Contact Details</h3>

                <div className="form-group">
                  <label>Gurudwara Name</label>
                  <input
                    type="text"
                    value={data.name}
                    onChange={(e) => updateGurudwaraInfo('name', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={data.location}
                    onChange={(e) => updateGurudwaraInfo('location', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={data.phone}
                    onChange={(e) => updateGurudwaraInfo('phone', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>WhatsApp Number</label>
                  <input
                    type="text"
                    value={data.whatsapp}
                    onChange={(e) => updateGurudwaraInfo('whatsapp', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>UPI ID for Donations</label>
                  <input
                    type="text"
                    value={data.upiId}
                    onChange={(e) => updateGurudwaraInfo('upiId', e.target.value)}
                  />
                </div>

                <button className="btn btn-primary">
                  ✓ Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Services Management */}
          {activeTab === 'services' && (
            <div className="fade-in-up">
              <h2 style={{ marginBottom: '2rem' }}>Manage Services</h2>

              <div className="card" style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Add New Service (Coming Soon)</h3>
                
                <p style={{
                  background: 'linear-gradient(135deg, rgba(255, 153, 51, 0.1), rgba(255, 153, 51, 0.05))',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  borderLeft: '4px solid var(--kesari)',
                  color: 'var(--gray-dark)',
                  marginBottom: '1.5rem'
                }}>
                  📌 Note: This feature will be available in the future. For now, services are managed in the database.
                </p>

                <p style={{ color: 'var(--gray-dark)' }}>
                  Service management interface will allow you to:
                </p>
                <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
                  {[
                    'Add new community services',
                    'Edit existing service details',
                    'Delete services',
                    'Manage service icons and descriptions',
                    'Set service availability',
                    'Customize WhatsApp messages'
                  ].map((item, i) => (
                    <li key={i} style={{ padding: '0.5rem 0', color: 'var(--gray-dark)' }}>
                      ✓ {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card">
                <h3 style={{ marginBottom: '1.5rem' }}>Current Services</h3>

                {data.services.map((service, index) => (
                  <div 
                    key={service.id}
                    style={{
                      background: 'var(--gray-light)',
                      padding: '1.5rem',
                      borderRadius: '0.5rem',
                      marginBottom: '1rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div>
                        <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.5rem' }}>
                          {service.icon} {service.title}
                        </p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--gray-dark)', marginBottom: '0.5rem' }}>
                          Category: <strong>{service.category}</strong>
                        </p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--gray-dark)' }}>
                          {service.description}
                        </p>
                      </div>
                      <button 
                        className="btn btn-small"
                        style={{ background: '#EF4444', color: 'white' }}
                        onClick={() => deleteService(service.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events Management */}
          {activeTab === 'events' && (
            <div className="fade-in-up">
              <h2 style={{ marginBottom: '2rem' }}>Manage Events</h2>

              {data.events.map((event, index) => (
                <div key={event.id} className="card" style={{ marginBottom: '2rem' }}>
                  <h3 style={{ marginBottom: '1.5rem' }}>Event #{index + 1}</h3>

                  <div className="form-group">
                    <label>Event Title</label>
                    <input
                      type="text"
                      value={event.title}
                      onChange={(e) => updateEvent(index, 'title', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Event Date</label>
                    <input
                      type="date"
                      value={event.date}
                      onChange={(e) => updateEvent(index, 'date', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={event.description}
                      onChange={(e) => updateEvent(index, 'description', e.target.value)}
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label>Image URL</label>
                    <input
                      type="text"
                      value={event.image}
                      onChange={(e) => updateEvent(index, 'image', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <button className="btn btn-primary">
                    Save Event
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Committee Management */}
          {activeTab === 'committee' && (
            <div className="fade-in-up">
              <h2 style={{ marginBottom: '2rem' }}>Committee Members</h2>

              <div className="grid grid-2">
                {data.committees.map((member) => (
                  <div key={member.id} className="card">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      style={{
                        width: '100%',
                        height: '150px',
                        objectFit: 'cover',
                        borderRadius: '0.5rem',
                        marginBottom: '1rem'
                      }}
                    />

                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => updateCommitteeMember(member.id, 'name', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Position</label>
                      <input
                        type="text"
                        value={member.position}
                        onChange={(e) => updateCommitteeMember(member.id, 'position', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Image URL</label>
                      <input
                        type="text"
                        value={member.image}
                        onChange={(e) => updateCommitteeMember(member.id, 'image', e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <button className="btn btn-primary btn-wide">
                      Save Member
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
