import React, { useState, useEffect } from 'react';

export default function EventPopup({ event }) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('eventPopupShown');
    if (!hasSeenPopup && event) {
      setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem('eventPopupShown', 'true');
      }, 2000);
    }
  }, [event]);

  if (!showPopup || !event) return null;

  return (
    <div className="modal-overlay" onClick={() => setShowPopup(false)}>
      <div 
        className="modal" 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: `linear-gradient(135deg, rgba(255, 153, 51, 0.1), rgba(255, 153, 51, 0.05))`,
          borderLeft: `4px solid var(--kesari)`
        }}
      >
        <button className="modal-close" onClick={() => setShowPopup(false)}>✕</button>
        
        <div className="text-center">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
          
          <h2 style={{ color: 'var(--kesari)', marginBottom: '1rem' }}>
            {event.title}
          </h2>
          
          {event.image && (
            <img 
              src={event.image} 
              alt={event.title}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '0.5rem',
                marginBottom: '1.5rem'
              }}
            />
          )}
          
          <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.5rem' }}>
            📅 {new Date(event.date).toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          
          <p style={{ marginBottom: '1.5rem', color: 'var(--gray-dark)' }}>
            {event.description}
          </p>
          
          <button 
            className="btn btn-primary"
            onClick={() => setShowPopup(false)}
            style={{ width: '100%' }}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}