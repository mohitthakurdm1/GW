import React from 'react';

export default function HomePage({ data, onNavigate }) {
  const heroImage = 'https://images.unsplash.com/photo-1503066211613-c17ebc9daef0?w=1200&h=600&fit=crop';
  const aboutImage = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop';

  const testimonials = [
    {
      id: 1,
      name: 'Amit Singh',
      feedback: 'The medical camp was incredibly helpful. Doctors were very professional and caring.',
      rating: 5
    },
    {
      id: 2,
      name: 'Neha Patel',
      feedback: 'I received educational support which changed my life. Grateful to the committee.',
      rating: 5
    },
    {
      id: 3,
      name: 'Rajesh Kumar',
      feedback: 'The langar service is the best. Community spirit is truly reflected here.',
      rating: 5
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section style={{
        background: `linear-gradient(rgba(11, 31, 58, 0.7), rgba(11, 31, 58, 0.7)), url('${heroImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: 'var(--white)',
        padding: '6rem 1.5rem',
        textAlign: 'center',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div className="container fade-in-up">
          <h1 style={{ marginBottom: '1rem', fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}>
            Serving Humanity Through Seva
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            {data.name} - A beacon of community service, spiritual values, and social welfare in {data.location}
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary"
              onClick={() => onNavigate('donation')}
            >
              💝 Donate Now
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => onNavigate('services')}
              style={{ borderColor: 'var(--white)', color: 'var(--white)' }}
            >
              🤝 Our Services
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="light-bg">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div className="fade-in-up">
              <img 
                src={aboutImage} 
                alt="Gurudwara"
                style={{ width: '100%', borderRadius: '0.75rem', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)' }}
              />
            </div>
            
            <div className="fade-in-up stagger-2">
              <h2>About {data.name}</h2>
              <p style={{ marginBottom: '1rem' }}>
                Located in {data.location}, our Gurudwara stands as a symbol of faith, community service, and spiritual growth. We are dedicated to serving all sections of society without any discrimination.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Our mission is to provide comprehensive support through medical camps, educational assistance, marriage support, and various community services. We believe in the Sikh principle of 'Sarbat da Bhala' - the well-being of all.
              </p>
              <p>
                With dedicated committee members and countless volunteers, we work tirelessly to make a positive impact in the lives of our community members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <h2>Our Services</h2>
            <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Comprehensive community support covering health, education, social welfare, and spiritual guidance
            </p>
          </div>

          <div className="grid grid-4">
            {data.services.slice(0, 4).map((service, index) => (
              <div 
                key={service.id}
                className="card fade-in-up"
                style={{ [`--stagger-${index + 1}`]: `${index * 0.1}s` }}
              >
                <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>
                  {service.icon}
                </div>
                <h3 className="card-title">{service.title}</h3>
                <p className="card-description">{service.description}</p>
                <button 
                  className="btn btn-primary btn-wide"
                  onClick={() => onNavigate('services')}
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button 
              className="btn btn-outline"
              onClick={() => onNavigate('services')}
            >
              View All Services →
            </button>
          </div>
        </div>
      </section>

      {/* Events & Updates */}
      <section className="navy-bg">
        <div className="container text-center">
          <h2 style={{ color: 'var(--white)' }}>Upcoming Events</h2>
          <p style={{ color: 'var(--kesari-light)', marginBottom: '2rem' }}>
            Join us for spiritual and community gatherings
          </p>

          <div className="grid grid-2">
            {data.events.map((event, index) => (
              <div 
                key={event.id}
                className="card fade-in-up"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderLeft: '4px solid var(--kesari)'
                }}
              >
                {event.image && (
                  <img src={event.image} alt={event.title} className="card-image" />
                )}
                <h3 className="card-title">{event.title}</h3>
                <p style={{ marginBottom: '1rem' }}>
                  📅 {new Date(event.date).toLocaleDateString('en-IN', { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="card-description">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="light-bg">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <h2>Community Voices</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--gray-dark)' }}>
              Hear from those whose lives have been touched by our services
            </p>
          </div>

          <div className="grid grid-3">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className="card fade-in-up"
                style={{ borderTop: '4px solid var(--kesari)' }}
              >
                <div style={{ marginBottom: '1rem' }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} style={{ fontSize: '1.25rem', color: 'var(--kesari)' }}>⭐</span>
                  ))}
                </div>
                <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                  "{testimonial.feedback}"
                </p>
                <p style={{ fontWeight: 600, color: 'var(--navy)' }}>
                  — {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Committee Members */}
      <section>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <h2>Committee Members</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--gray-dark)' }}>
              Dedicated leaders committed to community service
            </p>
          </div>

          <div className="grid grid-5">
            {data.committees.map((member) => (
              <div 
                key={member.id}
                className="card fade-in-up text-center"
                style={{ padding: '1.5rem' }}
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    marginBottom: '1rem',
                    objectFit: 'cover',
                    border: '3px solid var(--kesari)'
                  }}
                />
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  {member.name}
                </h3>
                <p style={{ color: 'var(--kesari)', fontWeight: 600, fontSize: '0.9rem' }}>
                  {member.position}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="navy-bg" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'var(--white)', marginBottom: '1.5rem' }}>
            Be Part of Our Community
          </h2>
          <p style={{ 
            color: 'var(--kesari-light)', 
            fontSize: '1.1rem',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Join us in our mission to serve humanity. Whether through donations, volunteering, or simply spreading the word, every contribution matters.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary"
              onClick={() => onNavigate('donation')}
            >
              Make a Donation
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => onNavigate('booking')}
              style={{ borderColor: 'var(--white)', color: 'var(--white)' }}
            >
              Book a Service
            </button>
          </div>
        </div>
      </section>

      {/* Contact & Location Info */}
      <section className="light-bg">
        <div className="container">
          <div className="grid grid-2">
            <div className="fade-in-up">
              <h3 style={{ marginBottom: '1.5rem' }}>Contact Information</h3>
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>📍 Location</p>
                <p>{data.location}</p>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>📞 Phone</p>
                <p><a href={`tel:${data.phone}`} style={{ color: 'var(--kesari)', textDecoration: 'none' }}>{data.phone}</a></p>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>💬 WhatsApp</p>
                <p><a href={`https://wa.me/${data.whatsapp}`} style={{ color: 'var(--kesari)', textDecoration: 'none' }}>Message on WhatsApp</a></p>
              </div>
            </div>

            <div className="fade-in-up stagger-2">
              <h3 style={{ marginBottom: '1.5rem' }}>Visit Us</h3>
              <div style={{
                borderRadius: '0.75rem',
                overflow: 'hidden',
                height: '300px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3442.1234567890!2d78.16!3d30.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390299!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Gurudwara Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
