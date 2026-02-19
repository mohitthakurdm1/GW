import React, { useState } from 'react';

export default function Navigation({ onNavigate, currentPage, gurudwaraName, adminToggle }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'booking', label: 'Booking' },
    { id: 'donation', label: 'Donate' }
  ];

  const handleNavClick = (page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav>
      <div className="nav-container">
        <div 
          className="nav-logo"
          onClick={() => handleNavClick('home')}
          style={{ cursor: 'pointer' }}
        >
          ☬ {gurudwaraName}
        </div>
        
        <button 
          className="hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span style={{ transform: mobileMenuOpen ? 'rotate(45deg) translateY(10px)' : 'none', transition: 'all 0.3s' }}></span>
          <span style={{ opacity: mobileMenuOpen ? '0' : '1', transition: 'all 0.3s' }}></span>
          <span style={{ transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-10px)' : 'none', transition: 'all 0.3s' }}></span>
        </button>

        <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={currentPage === item.id ? 'active' : ''}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('admin');
              }}
              style={{ fontSize: '0.8rem', opacity: 0.6 }}
              title="Admin Panel"
            >
              ⚙️
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}