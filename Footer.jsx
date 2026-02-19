import React from 'react';

export default function Footer({ data }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="navy-bg">
      <div className="container">
        {/* Footer Content */}
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section">
            <h3>☬ {data.name}</h3>
            <p>
              A beacon of community service, spiritual values, and social welfare in {data.location}.
            </p>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
              Serving humanity with faith, compassion, and dedication.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#booking">Book Service</a></li>
              <li><a href="#donation">Donate</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3>Our Services</h3>
            <ul className="footer-links">
              <li><a href="#medical">Medical Camps</a></li>
              <li><a href="#education">Educational Support</a></li>
              <li><a href="#marriage">Marriage Support</a></li>
              <li><a href="#langar">Community Langar</a></li>
              <li><a href="#emergency">Emergency Services</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h3>Contact</h3>
            <div className="footer-contact-item">
              <span>📍</span>
              <div>
                <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Location</p>
                <p>{data.location}</p>
              </div>
            </div>
            <div className="footer-contact-item">
              <span>📞</span>
              <div>
                <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Phone</p>
                <p>
                  <a 
                    href={`tel:${data.phone}`}
                    style={{ color: 'var(--kesari)', textDecoration: 'none' }}
                  >
                    {data.phone}
                  </a>
                </p>
              </div>
            </div>
            <div className="footer-contact-item">
              <span>💬</span>
              <div>
                <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>WhatsApp</p>
                <p>
                  <a 
                    href={`https://wa.me/${data.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--kesari)', textDecoration: 'none' }}
                  >
                    Chat with us
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Divider */}
        <div className="footer-divider">
          <p style={{ marginBottom: '1rem' }}>
            © {currentYear} {data.name}. All rights reserved.
          </p>
          <p style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>
            Registered Community Organization | 80G Tax Exempt Status
          </p>
          <p style={{ fontSize: '0.85rem' }}>
            Built with ☬ dedication to Sarbat da Bhala (Well-being of All)
          </p>
        </div>
      </div>
    </footer>
  );
}
