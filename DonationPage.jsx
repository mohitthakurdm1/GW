import React, { useState } from 'react';

export default function DonationPage({ data }) {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [step, setStep] = useState(1);

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000];

  const donationCategories = [
    {
      id: 'medical',
      title: 'Medical Camp',
      description: 'Support free health check-ups and medicine distribution',
      icon: '🏥',
      impact: 'Helps 50+ people'
    },
    {
      id: 'education',
      title: 'Student Support',
      description: 'Assist underprivileged students with fee payments',
      icon: '📚',
      impact: 'Helps 1 student'
    },
    {
      id: 'marriage',
      title: 'Marriage Support',
      description: 'Help families with marriage expenses',
      icon: '💑',
      impact: 'Helps 1 family'
    },
    {
      id: 'langar',
      title: 'Community Langar',
      description: 'Support daily meal service for community',
      icon: '🍲',
      impact: 'Feeds 100+ people'
    },
    {
      id: 'general',
      title: 'General Seva',
      description: 'Let us use your donation where needed most',
      icon: '🤲',
      impact: 'Maximum impact'
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure',
      description: 'Help improve facilities and equipment',
      icon: '🏛️',
      impact: 'Sustainable impact'
    }
  ];

  const handleDonationFlow = () => {
    const finalAmount = selectedAmount || customAmount;
    if (!finalAmount || finalAmount < 100) {
      alert('Please select an amount of at least ₹100');
      return;
    }

    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      initiateUPIPayment();
    }
  };

  const initiateUPIPayment = () => {
    const finalAmount = selectedAmount || customAmount;
    const category = donationCategories.find(c => c.id === selectedCategory)?.title || 'Donation';
    
    const upiString = `upi://pay?pa=${data.upiId}&pn=${encodeURIComponent(data.name)}&am=${finalAmount}&tr=${encodeURIComponent(category)}&tn=${encodeURIComponent(category + ' from ' + donorInfo.name)}`;
    
    window.location.href = upiString;
    
    // Also send a WhatsApp confirmation message
    setTimeout(() => {
      const message = encodeURIComponent(
        `Donation Details:\nAmount: ₹${finalAmount}\nCategory: ${category}\nDonor: ${donorInfo.name}\nEmail: ${donorInfo.email}\nPhone: ${donorInfo.phone}`
      );
      window.open(`https://wa.me/${data.whatsapp}?text=${message}`, '_blank');
    }, 1000);
  };

  const handleDonorChange = (e) => {
    const { name, value } = e.target;
    setDonorInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getFinalAmount = () => selectedAmount || (customAmount ? parseInt(customAmount) : 0);

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
          <h1 style={{ marginBottom: '1rem' }}>Make a Difference</h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
            Your donation helps us continue our mission of serving humanity through medical camps, education support, and community services
          </p>
        </div>
      </section>

      {/* Donation Impact Stats */}
      <section className="light-bg">
        <div className="container">
          <div className="grid grid-4" style={{ marginBottom: '2rem' }}>
            {[
              { number: '5000+', label: 'Lives Impacted' },
              { number: '₹50L+', label: 'Donated' },
              { number: '8+ Years', label: 'Service' },
              { number: '100%', label: 'Transparent' }
            ].map((stat, index) => (
              <div 
                key={index}
                style={{
                  textAlign: 'center',
                  padding: '1.5rem'
                }}
                className="fade-in-up"
              >
                <p style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: 'var(--kesari)',
                  marginBottom: '0.5rem'
                }}>
                  {stat.number}
                </p>
                <p style={{ color: 'var(--navy)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Categories */}
      <section style={{ padding: '3rem 1.5rem' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Where Your Donation Goes
          </h2>

          <div className="grid grid-3">
            {donationCategories.map((category, index) => (
              <div 
                key={category.id}
                className="card fade-in-up"
                onClick={() => {
                  setSelectedCategory(category.id);
                  setStep(1);
                  setSelectedAmount(null);
                  setCustomAmount('');
                }}
                style={{
                  cursor: 'pointer',
                  borderLeft: selectedCategory === category.id ? '4px solid var(--kesari)' : '4px solid transparent',
                  background: selectedCategory === category.id ? 'linear-gradient(135deg, rgba(255, 153, 51, 0.1), rgba(255, 153, 51, 0.05))' : 'var(--white)',
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  transition: 'all 0.3s'
                }}
              >
                <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>
                  {category.icon}
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', textAlign: 'center' }}>
                  {category.title}
                </h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '1rem', color: 'var(--gray-dark)' }}>
                  {category.description}
                </p>
                <p style={{
                  textAlign: 'center',
                  fontWeight: 600,
                  color: 'var(--kesari)',
                  fontSize: '0.9rem'
                }}>
                  {category.impact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Flow */}
      <section className="light-bg">
        <div className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            {/* Progress Indicator */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '2rem',
              justifyContent: 'space-between'
            }}>
              {[1, 2, 3].map(s => (
                <div 
                  key={s}
                  style={{
                    flex: 1,
                    height: '4px',
                    backgroundColor: step >= s ? 'var(--kesari)' : 'var(--gray-medium)',
                    borderRadius: '2px',
                    transition: 'all 0.3s'
                  }}
                ></div>
              ))}
            </div>

            {/* Step 1: Amount Selection */}
            {step === 1 && (
              <div className="fade-in-up">
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  Step 1: Select Amount
                </h2>
                
                <div style={{
                  background: 'var(--white)',
                  padding: '2rem',
                  borderRadius: '0.75rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                }}>
                  <p style={{
                    textAlign: 'center',
                    marginBottom: '1.5rem',
                    color: 'var(--gray-dark)'
                  }}>
                    Category: <strong>{donationCategories.find(c => c.id === selectedCategory)?.title}</strong>
                  </p>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                    gap: '1rem',
                    marginBottom: '2rem'
                  }}>
                    {predefinedAmounts.map(amount => (
                      <button
                        key={amount}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount('');
                        }}
                        style={{
                          padding: '1rem',
                          borderRadius: '0.5rem',
                          border: selectedAmount === amount ? '2px solid var(--kesari)' : '2px solid var(--gray-medium)',
                          background: selectedAmount === amount ? 'var(--kesari)' : 'var(--white)',
                          color: selectedAmount === amount ? 'var(--white)' : 'var(--navy)',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.3s',
                          fontSize: '1rem'
                        }}
                      >
                        ₹{amount}
                      </button>
                    ))}
                  </div>

                  <div className="form-group">
                    <label>Custom Amount</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '1.1rem',
                        color: 'var(--gray-dark)'
                      }}>₹</span>
                      <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setSelectedAmount(null);
                        }}
                        placeholder="Enter custom amount"
                        min="100"
                        style={{
                          paddingLeft: '2.5rem'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{
                    background: 'linear-gradient(135deg, rgba(255, 153, 51, 0.1), rgba(255, 153, 51, 0.05))',
                    padding: '1.5rem',
                    borderRadius: '0.5rem',
                    marginBottom: '2rem',
                    borderLeft: '4px solid var(--kesari)',
                    textAlign: 'center'
                  }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--gray-dark)', marginBottom: '0.5rem' }}>
                      Donation Amount
                    </p>
                    <p style={{
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      color: 'var(--kesari)'
                    }}>
                      ₹{getFinalAmount() || '0'}
                    </p>
                  </div>

                  <button 
                    className="btn btn-primary btn-wide"
                    onClick={handleDonationFlow}
                    disabled={!getFinalAmount()}
                    style={{
                      opacity: getFinalAmount() ? 1 : 0.5,
                      cursor: getFinalAmount() ? 'pointer' : 'not-allowed'
                    }}
                  >
                    Next: Enter Your Details →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Donor Information */}
            {step === 2 && (
              <div className="fade-in-up">
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  Step 2: Your Information
                </h2>

                <div style={{
                  background: 'var(--white)',
                  padding: '2rem',
                  borderRadius: '0.75rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                }}>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleDonationFlow();
                  }}>
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={donorInfo.name}
                        onChange={handleDonorChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Email (Optional)</label>
                      <input
                        type="email"
                        name="email"
                        value={donorInfo.email}
                        onChange={handleDonorChange}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="form-group">
                      <label>Phone Number (Optional)</label>
                      <input
                        type="tel"
                        name="phone"
                        value={donorInfo.phone}
                        onChange={handleDonorChange}
                        placeholder="10-digit number"
                      />
                    </div>

                    <div style={{
                      background: 'var(--gray-light)',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      marginBottom: '2rem',
                      fontSize: '0.9rem',
                      color: 'var(--gray-dark)'
                    }}>
                      💡 Your information will be kept confidential and used only for donation receipts (80G eligible donations)
                    </div>

                    <button 
                      type="submit"
                      className="btn btn-primary btn-wide"
                      style={{ marginBottom: '1rem' }}
                    >
                      Next: Payment →
                    </button>

                    <button 
                      type="button"
                      className="btn btn-secondary btn-wide"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Step 3: Payment Confirmation */}
            {step === 3 && (
              <div className="fade-in-up">
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  Step 3: Confirm & Pay
                </h2>

                <div style={{
                  background: 'var(--white)',
                  padding: '2rem',
                  borderRadius: '0.75rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                }}>
                  <div style={{
                    background: 'var(--gray-light)',
                    padding: '1.5rem',
                    borderRadius: '0.5rem',
                    marginBottom: '2rem'
                  }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--navy)' }}>
                      Donation Summary
                    </h3>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span>Donor Name:</span>
                      <strong>{donorInfo.name || 'Anonymous'}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span>Category:</span>
                      <strong>{donationCategories.find(c => c.id === selectedCategory)?.title}</strong>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '2px solid var(--gray-medium)'
                    }}>
                      <span style={{ fontWeight: 600 }}>Amount:</span>
                      <span style={{
                        fontWeight: 'bold',
                        fontSize: '1.3rem',
                        color: 'var(--kesari)'
                      }}>
                        ₹{getFinalAmount()}
                      </span>
                    </div>
                  </div>

                  <p style={{
                    color: 'var(--gray-dark)',
                    marginBottom: '1.5rem',
                    fontSize: '0.9rem'
                  }}>
                    ✓ Your payment is secure and will be processed via UPI\n
                    ✓ 80G tax deductible receipt will be sent to your email\n
                    ✓ Confirmation will be sent via WhatsApp
                  </p>

                  <button 
                    className="btn btn-primary btn-wide"
                    onClick={handleDonationFlow}
                    style={{ marginBottom: '1rem', padding: '1rem' }}
                  >
                    💳 Pay ₹{getFinalAmount()} via UPI
                  </button>

                  <button 
                    className="btn btn-secondary btn-wide"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 80G & Transparency */}
      <section>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>
            80G Tax Deduction & Transparency
          </h2>

          <div className="grid grid-2">
            <div className="card fade-in-up">
              <h3 style={{ marginBottom: '1rem', color: 'var(--kesari)' }}>
                80G Tax Benefits
              </h3>
              <ul style={{ listStyle: 'none' }}>
                {[
                  '✓ All donations are 80G tax deductible',
                  '✓ Receipts issued within 48 hours',
                  '✓ Digital receipt sent to your email',
                  '✓ PAN not required for donations',
                  '✓ Donations under ₹5000 can be anonymous',
                  '✓ No hidden charges or processing fees'
                ].map((item, index) => (
                  <li 
                    key={index}
                    style={{
                      padding: '0.75rem 0',
                      borderBottom: '1px solid var(--gray-medium)',
                      color: 'var(--gray-dark)'
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card fade-in-up stagger-2">
              <h3 style={{ marginBottom: '1rem', color: 'var(--kesari)' }}>
                Transparency & Accountability
              </h3>
              <ul style={{ listStyle: 'none' }}>
                {[
                  '✓ 100% donation utilization',
                  '✓ Monthly impact reports',
                  '✓ Audit by registered CA',
                  '✓ Registered with government',
                  '✓ Open to community visits',
                  '✓ Annual financial statements'
                ].map((item, index) => (
                  <li 
                    key={index}
                    style={{
                      padding: '0.75rem 0',
                      borderBottom: '1px solid var(--gray-medium)',
                      color: 'var(--gray-dark)'
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
