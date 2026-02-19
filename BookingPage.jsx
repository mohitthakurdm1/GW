import React, { useState } from 'react';

export default function BookingPage({ data }) {
  const [formData, setFormData] = useState({
    eventType: 'marriage',
    date: '',
    name: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const eventTypes = [
    { value: 'marriage', label: '💑 Marriage Ceremony' },
    { value: 'birthday', label: '🎂 Birthday Celebration' },
    { value: 'barsi', label: '🕯️ Barsi (Annual Remembrance)' },
    { value: 'tervi', label: '🙏 Tervi (13th Day Ceremony)' },
    { value: 'langar', label: '🍲 Community Langar' },
    { value: 'other', label: '📋 Other Event' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      newErrors.phone = 'Valid phone number is required';
    }
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const eventType = eventTypes.find(t => t.value === formData.eventType)?.label || formData.eventType;
    const bookingDate = new Date(formData.date).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const whatsappMessage = encodeURIComponent(
      `Hello, I would like to book the following:\n\nEvent Type: ${eventType}\nDate: ${bookingDate}\nName: ${formData.name}\nPhone: ${formData.phone}\nMessage: ${formData.message || 'None'}`
    );

    window.open(`https://wa.me/${data.whatsapp}?text=${whatsappMessage}`, '_blank');
    
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        eventType: 'marriage',
        date: '',
        name: '',
        phone: '',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  // Calculate minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--kesari), var(--kesari-dark))',
        color: 'var(--white)',
        padding: '3rem 1.5rem',
        textAlign: 'center'
      }}>
        <div className="container fade-in-up">
          <h1 style={{ marginBottom: '1rem' }}>Book a Service or Event</h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Schedule your event or service at {data.name}
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section style={{ padding: '3rem 1.5rem' }}>
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }} className="fade-in-up">
            <div className="card" style={{ padding: '2.5rem' }}>
              {submitted && (
                <div className="form-success" style={{ marginBottom: '1.5rem' }}>
                  ✅ Booking request submitted! We'll contact you via WhatsApp shortly.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Event Type */}
                <div className="form-group">
                  <label htmlFor="eventType">Event Type *</label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                  >
                    {eventTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="form-group">
                  <label htmlFor="date">Preferred Date *</label>
                  <input
                    id="date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={today}
                    required
                    style={{ borderColor: errors.date ? 'var(--error)' : undefined }}
                  />
                  {errors.date && <span className="form-error">{errors.date}</span>}
                </div>

                {/* Name */}
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    style={{ borderColor: errors.name ? 'var(--error)' : undefined }}
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label htmlFor="phone">Contact Number *</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit phone number"
                    required
                    style={{ borderColor: errors.phone ? 'var(--error)' : undefined }}
                  />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>

                {/* Message */}
                <div className="form-group">
                  <label htmlFor="message">Additional Details</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any special requirements or additional information..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  className="btn btn-primary btn-wide"
                  style={{ padding: '1rem', fontSize: '1rem', marginBottom: '1rem' }}
                >
                  📬 Request Booking via WhatsApp
                </button>

                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--gray-dark)',
                  textAlign: 'center'
                }}>
                  We'll send your booking request via WhatsApp. Our team will confirm availability and details shortly.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Availability & Contact Info */}
      <section className="light-bg">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>
            How Booking Works
          </h2>

          <div className="grid grid-3">
            {[
              {
                step: '1',
                title: 'Submit Request',
                description: 'Fill out the booking form with your event details and preferred date'
              },
              {
                step: '2',
                title: 'WhatsApp Confirmation',
                description: 'Receive confirmation and discuss specifics with our team'
              },
              {
                step: '3',
                title: 'Book & Prepare',
                description: 'Finalize details and prepare for your event or service'
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="card fade-in-up"
                style={{
                  textAlign: 'center',
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: 'var(--kesari)',
                  marginBottom: '1rem',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--kesari), var(--kesari-light))',
                  color: 'var(--white)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--gray-dark)' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Direct Contact
          </h2>

          <div className="grid grid-2">
            <div className="card fade-in-up" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💬</div>
              <h3>WhatsApp</h3>
              <p style={{ marginBottom: '1.5rem', color: 'var(--gray-dark)' }}>
                Quick and convenient way to discuss your booking
              </p>
              <a 
                href={`https://wa.me/${data.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-wide"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="card fade-in-up stagger-2" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>☎️</div>
              <h3>Phone Call</h3>
              <p style={{ marginBottom: '1.5rem', color: 'var(--gray-dark)' }}>
                Speak directly with our booking coordinator
              </p>
              <a 
                href={`tel:${data.phone}`}
                className="btn btn-call btn-wide"
              >
                Call Now: {data.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Venue Details */}
      <section className="light-bg">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Venue & Facilities
          </h2>

          <div className="grid grid-2">
            <div className="fade-in-up">
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--kesari)' }}>
                Community Hall Features
              </h3>
              <ul style={{ listStyle: 'none' }}>
                {[
                  '✓ Spacious main hall (200+ capacity)',
                  '✓ Separate kitchen facilities',
                  '✓ Parking available',
                  '✓ Wheelchair accessible',
                  '✓ Air-conditioned',
                  '✓ Sound system included',
                  '✓ Decorated with spiritual symbols',
                  '✓ Tables, chairs, and utensils available'
                ].map((feature, index) => (
                  <li 
                    key={index}
                    style={{
                      padding: '0.75rem 0',
                      borderBottom: '1px solid var(--gray-medium)',
                      fontSize: '1rem'
                    }}
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="fade-in-up stagger-2">
              <img 
                src="https://images.unsplash.com/photo-1519671482677-a0fbb3fcaa26?w=600&h=400&fit=crop"
                alt="Community Hall"
                style={{
                  width: '100%',
                  borderRadius: '0.75rem',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)'
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
