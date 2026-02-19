import React, { useState } from 'react';

export default function FloatingIcons({ phone, whatsapp }) {
  return (
    <div className="floating-icons">
      <a 
        href={`https://wa.me/${whatsapp}?text=Hello`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp"
        title="Chat on WhatsApp"
      >
        <span>💬</span>
        <span className="floating-label">Chat with us</span>
      </a>
      
      <a 
        href={`tel:${phone}`}
        className="floating-btn call"
        title="Call us"
      >
        <span>☎️</span>
        <span className="floating-label">Call us</span>
      </a>
    </div>
  );
}