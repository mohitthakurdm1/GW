import React, { useState } from 'react';

export default function ServicesPage({ data }) {
  const [selectedService, setSelectedService] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Group services by category
  const servicesByCategory = data.services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {});

  const categories = Object.keys(servicesByCategory);

  const handleWhatsApp = (service) => {
    const message = encodeURIComponent(service.whatsappMessage);
    window.open(`https://wa.me/${data.whatsapp}?text=${message}`, '_blank');
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--navy), var(--navy-light))',
        color: 'var(--white)',
        padding: '3rem 1.5rem',
        textAlign: 'center'
      }}>
        <div className="container fade-in-up">
          <h1 style={{ marginBottom: '1rem' }}>Our Community Services</h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Comprehensive support across healthcare, education, social welfare, and emergency services
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section style={{ padding: '2rem 1.5rem', backgroundColor: 'var(--gray-light)' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: '2px solid var(--kesari)',
                  background: expandedCategory === category ? 'var(--kesari)' : 'var(--white)',
                  color: expandedCategory === category ? 'var(--white)' : 'var(--kesari)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontSize: '0.95rem'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '3rem 1.5rem' }}>
        <div className="container">
          {categories.map((category) => (
            <div key={category} style={{ marginBottom: '3rem' }}>
              <h2 style={{
                color: 'var(--kesari)',
                marginBottom: '2rem',
                paddingBottom: '1rem',
                borderBottom: '2px solid var(--gray-medium)',
                textAlign: 'center'
              }}>
                {category}
              </h2>

              <div className="grid grid-2">
                {servicesByCategory[category].map((service, index) => (
                  <div 
                    key={service.id}
                    className="card fade-in-up"
                    style={{
                      borderTop: '4px solid var(--kesari)',
                      cursor: 'pointer',
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                    }}
                    onClick={() => setSelectedService(selectedService?.id === service.id ? null : service)}
                  >
                    <div style={{
                      fontSize: '3rem',
                      textAlign: 'center',
                      marginBottom: '1rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      {service.icon}
                    </div>

                    <h3 className="card-title" style={{ textAlign: 'center' }}>
                      {service.title}
                    </h3>

                    <p className="card-description" style={{ textAlign: 'center' }}>
                      {service.description}
                    </p>

                    {selectedService?.id === service.id && (
                      <div style={{
                        background: 'var(--gray-light)',
                        padding: '1.5rem',
                        borderRadius: '0.5rem',
                        marginBottom: '1.5rem',
                        animation: 'fadeInUp 0.3s ease-out'
                      }}>
                        <p style={{ fontWeight: 600, marginBottom: '0.75rem', color: 'var(--navy)' }}>
                          📋 Details
                        </p>
                        <p style={{ marginBottom: '1rem', fontSize: '0.95rem' }}>
                          {service.details}
                        </p>
                        <p style={{ fontWeight: 600, marginBottom: '0.75rem', color: 'var(--navy)' }}>
                          📅 Schedule
                        </p>
                        <p style={{ fontSize: '0.95rem' }}>
                          {service.dates}
                        </p>
                      </div>
                    )}

                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      marginTop: '1.5rem',
                      flexWrap: 'wrap'
                    }}>
                      <button 
                        className="btn btn-whatsapp"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWhatsApp(service);
                        }}
                        style={{ flex: 1, minWidth: '140px' }}
                      >
                        💬 WhatsApp
                      </button>
                      <button 
                        className="btn btn-call"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCall(data.phone);
                        }}
                        style={{ flex: 1, minWidth: '140px' }}
                      >
                        ☎️ Call
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Request CTA */}
      <section className="navy-bg">
        <div className="container text-center">
          <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>
            Need a Specific Service?
          </h2>
          <p style={{
            color: 'var(--kesari-light)',
            marginBottom: '2rem',
            fontSize: '1.1rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Reach out directly to our team via phone or WhatsApp for personalized assistance
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href={`https://wa.me/${data.whatsapp}?text=Hello, I would like to inquire about services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              💬 Chat on WhatsApp
            </a>
            <a 
              href={`tel:${data.phone}`}
              className="btn btn-call"
            >
              ☎️ Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Service Standards */}
      <section className="light-bg">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Our Service Commitment
          </h2>

          <div className="grid grid-3">
            {[
              {
                icon: '✅',
                title: 'Quality Service',
                description: 'Professional and caring approach to every service we provide'
              },
              {
                icon: '🤲',
                title: 'Inclusive Support',
                description: 'Services available to everyone without discrimination'
              },
              {
                icon: '⚡',
                title: 'Quick Response',
                description: 'Swift assistance available 24/7 for emergency services'
              },
              {
                icon: '💰',
                title: 'No Cost',
                description: 'Most services provided free of charge to the community'
              },
              {
                icon: '👥',
                title: 'Volunteers',
                description: 'Dedicated volunteers ready to help at all times'
              },
              {
                icon: '🙏',
                title: 'With Dignity',
                description: 'Serving with respect and maintaining confidentiality'
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
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--gray-dark)' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '3rem 1.5rem' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Frequently Asked Questions
          </h2>

          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            {[
              {
                q: 'How do I register for the medical camp?',
                a: 'You can register by contacting us via WhatsApp, phone call, or visiting the Gurudwara directly. We accept registrations on a first-come, first-served basis.'
              },
              {
                q: 'What documents are needed for educational support?',
                a: 'Typically, we require proof of income, academic records, and identification. Specific requirements vary by scholarship type. Please contact us for details.'
              },
              {
                q: 'Is there a cost for the langar service?',
                a: 'No, the langar service is completely free. Everyone is welcome to share the community meal.'
              },
              {
                q: 'Can we book the community hall for private events?',
                a: 'Yes, the community hall is available for booking. Contact us for availability and pricing details.'
              },
              {
                q: 'Are these services available only for community members?',
                a: 'Our services are available to everyone in the community, regardless of caste, religion, or background.'
              }
            ].map((faq, index) => (
              <div 
                key={index}
                style={{
                  background: 'var(--gray-light)',
                  padding: '1.5rem',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem',
                  borderLeft: '4px solid var(--kesari)'
                }}
                className="fade-in-up"
              >
                <h4 style={{
                  color: 'var(--navy)',
                  marginBottom: '0.75rem',
                  fontWeight: 600
                }}>
                  Q: {faq.q}
                </h4>
                <p style={{ color: 'var(--gray-dark)' }}>
                  A: {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
