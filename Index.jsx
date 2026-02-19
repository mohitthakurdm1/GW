import React, { useState, useEffect } from 'react';
import './styles.css';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BookingPage from './pages/BookingPage';
import DonationPage from './pages/DonationPage';
import AdminPanel from './pages/AdminPanel';
import Navigation from './components/Navigation';
import FloatingIcons from './components/FloatingIcons';
import EventPopup from './components/EventPopup';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [admin, setAdmin] = useState(false);
  const [gurudwaraData, setGurudwaraData] = useState({
    name: 'Gurudwara Sadh Sangat Sahib',
    location: 'Saiyyad Mohalla, Dehradun',
    phone: '8191011219',
    whatsapp: '8191011219',
    upiId: 'mohitthakur222333@oksbi',
    services: [
      {
        id: 1,
        title: 'Medical Camp',
        description: 'Free medical consultation and health check-up camps organized regularly for the community.',
        category: 'Medical Services',
        icon: '🏥',
        details: 'Monthly medical camps with specialist doctors. Free medicines and health check-ups provided.',
        dates: 'Every 1st Sunday of month, 9:00 AM onwards',
        whatsappMessage: 'Hello, I would like information about Medical Camp services.'
      },
      {
        id: 2,
        title: 'Educational Support',
        description: 'Financial assistance for student fee payment and educational materials.',
        category: 'Educational Support',
        icon: '📚',
        details: 'We provide fee assistance for underprivileged students pursuing higher education.',
        dates: 'Applications accepted year-round',
        whatsappMessage: 'Hello, I would like information about Educational Support.'
      },
      {
        id: 3,
        title: 'Marriage Support',
        description: 'Financial and logistical help for marriages in the community.',
        category: 'Marriage & Social Support',
        icon: '💑',
        details: 'Marriage hall booking, decorations, and financial assistance available.',
        dates: 'Available year-round',
        whatsappMessage: 'Hello, I would like information about Marriage Support services.'
      },
      {
        id: 4,
        title: 'Langar Service',
        description: 'Community meal service available daily with nutritious food for everyone.',
        category: 'Community Support',
        icon: '🍲',
        details: 'Free Langar served daily. Volunteers welcome to help in preparation.',
        dates: 'Daily 12:00 PM and 6:00 PM',
        whatsappMessage: 'Hello, I would like information about Langar Service.'
      },
      {
        id: 5,
        title: 'Dead Body Freezer Service',
        description: 'Essential funeral support service available 24/7 for the community.',
        category: 'Emergency Support',
        icon: '🕯️',
        details: '24/7 emergency support for funeral and last rites arrangements.',
        dates: 'Available round the clock',
        whatsappMessage: 'Hello, I would like information about Dead Body Freezer Service.'
      },
      {
        id: 6,
        title: 'Bedding Service',
        description: 'Rajai and Gadda (quilts and mattresses) available for community events.',
        category: 'Community Support',
        icon: '🛏️',
        details: 'Quality bedding available for rent during community gatherings and events.',
        dates: 'Available on request',
        whatsappMessage: 'Hello, I would like information about Bedding Service.'
      },
      {
        id: 7,
        title: 'Utensil Service',
        description: 'Kitchen utensils and dishes available for community cooking events.',
        category: 'Community Support',
        icon: '🍴',
        details: 'Complete bartan (utensil) sets available for large gatherings.',
        dates: 'Available on request',
        whatsappMessage: 'Hello, I would like information about Utensil Service.'
      },
      {
        id: 8,
        title: 'Community Hall Booking',
        description: 'Spacious hall available for social events, celebrations, and gatherings.',
        category: 'Venue Services',
        icon: '🏛️',
        details: 'Well-equipped community hall with capacity for 200+ people.',
        dates: 'Available for booking',
        whatsappMessage: 'Hello, I would like to book the Community Hall.'
      }
    ],
    events: [
      {
        id: 1,
        title: 'Guru Nanak Jayanti Celebration',
        date: '2025-03-15',
        description: 'Grand celebration with Kirtan, Langar, and community gathering',
        image: 'https://images.unsplash.com/photo-1523438097911-512455cf3852?w=800'
      },
      {
        id: 2,
        title: 'Medical Camp & Health Awareness',
        date: '2025-03-02',
        description: 'Free health check-up camp with specialist doctors',
        image: 'https://images.unsplash.com/photo-1631217314830-e66d7a3d9359?w=800'
      }
    ],
    committees: [
      { id: 1, name: 'Rajesh Kumar Singh', position: 'Head Committee', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
      { id: 2, name: 'Priya Sharma', position: 'Finance Manager', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' },
      { id: 3, name: 'Vikram Patel', position: 'Community Coordinator', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200' },
      { id: 4, name: 'Neha Gupta', position: 'Educational Programs', image: 'https://images.unsplash.com/photo-1517849845537-1d51a20414de?w=200' },
      { id: 5, name: 'Arjun Mehta', position: 'Event Organizer', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' }
    ]
  });

  useEffect(() => {
    const savedData = localStorage.getItem('gurudwaraData');
    if (savedData) {
      try {
        setGurudwaraData(JSON.parse(savedData));
      } catch (e) {
        console.log('Error loading saved data');
      }
    }
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage data={gurudwaraData} onNavigate={handlePageChange} />;
      case 'services':
        return <ServicesPage data={gurudwaraData} />;
      case 'booking':
        return <BookingPage data={gurudwaraData} />;
      case 'donation':
        return <DonationPage data={gurudwaraData} />;
      case 'admin':
        return <AdminPanel data={gurudwaraData} setData={setGurudwaraData} onNavigate={handlePageChange} />;
      default:
        return <HomePage data={gurudwaraData} onNavigate={handlePageChange} />;
    }
  };

  return (
    <div className="app">
      <Navigation onNavigate={handlePageChange} currentPage={currentPage} gurudwaraName={gurudwaraData.name} adminToggle={() => setAdmin(!admin)} />
      {renderPage()}
      <FloatingIcons phone={gurudwaraData.phone} whatsapp={gurudwaraData.whatsapp} />
      <EventPopup event={gurudwaraData.events[0]} />
    </div>
  );
}