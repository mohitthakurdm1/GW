# Gurudwara Sadh Sangat Sahib - Community Service Website

A modern, responsive, and trust-focused website for **Gurudwara Sadh Sangat Sahib** located in **Saiyyad Mohalla, Dehradun**. Built with React and optimized for high conversion, community engagement, and spiritual values.

---

## 🌟 Features

### 📱 Responsive Design
- **Fully mobile-responsive** layout with Tailwind CSS
- Optimized for phones, tablets, and desktop browsers
- Touch-friendly interface with smooth animations
- Professional animations and micro-interactions

### 🎨 Brand-Focused Design System
- **Kesari (Saffron)** (#FF9933) - Primary action color
- **Navy Blue** (#0B1F3A) - Trust and structure
- **White** base with soft gradients and depth
- Elegant serif fonts for headings (Georgia)
- Clean sans-serif for body text

### 📌 Comprehensive Service Page
8 community services with detailed information:
- 🏥 **Medical Camp** - Free health check-ups
- 📚 **Educational Support** - Student fee assistance
- 💑 **Marriage Support** - Financial & logistical help
- 🍲 **Langar Service** - Free community meals
- 🕯️ **Dead Body Freezer** - Emergency support
- 🛏️ **Bedding Service** - Rajai & Gadda rental
- 🍴 **Utensil Service** - Bartan for events
- 🏛️ **Community Hall** - Event venue booking

### ☎️ Integrated Communication
- **WhatsApp Integration** - Direct WhatsApp messaging with predefined messages
- **Click-to-Call** - One-tap phone calling
- **Floating Icons** - Sticky WhatsApp and Call buttons
- **Smart Routing** - Proper contact handling on all devices

### 📅 Event Management
- Dynamic event popup (appears once per session)
- Event showcase on homepage
- Admin-editable event details
- Automatic date formatting

### 💰 Secure Donation System
- **UPI Payment Integration** - Direct UPI transfers
- Multiple donation categories:
  - 🏥 Medical Camp
  - 📚 Student Support
  - 💑 Marriage Support
  - 🍲 Community Langar
  - 🤲 General Seva
  - 🏛️ Infrastructure
- **80G Tax Benefits** - Tax deductible donations
- 3-step donation flow with confirmation
- Transparent receipts and impact tracking

### 📋 Flexible Booking System
- Event type selection (Marriage, Birthday, Barsi, Tervi, etc.)
- Date picker with availability
- WhatsApp-based confirmation
- Venue details and facilities info
- FAQ section

### 🛠️ Full Admin Panel
**Password Protected** (Default: `admin@seva123`)

Features:
- Dashboard with statistics
- Gurudwara info management (Name, Location, Phone, WhatsApp, UPI ID)
- Service management (view/delete, add coming soon)
- Event management (create, edit, update dates)
- Committee member management (edit names, positions, photos)
- Auto-save to LocalStorage with data persistence

### 🌍 Multilingual Support (Ready)
- English (Default)
- Hindi support (Structure ready)
- Punjabi support (Structure ready)

### 🙏 Community Features
- Committee member showcase with photos
- Testimonials from community members
- Transparent service descriptions
- Trust-building elements (80G certification, audit info)
- FAQs for common questions

---

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Required Dependencies

```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0"
}
```

---

## 📝 Configuration

### Update Gurudwara Details

Edit the initial state in `pages/HomePage.jsx`:

```javascript
const [gurudwaraData, setGurudwaraData] = useState({
  name: 'Gurudwara Sadh Sangat Sahib',
  location: 'Saiyyad Mohalla, Dehradun',
  phone: '8191011219',
  whatsapp: '8191011219',
  upiId: 'mohitthakur222333@oksbi',
  // ... other fields
});
```

### Update Admin Password

In `pages/AdminPanel.jsx`:

```javascript
const correctPassword = 'admin@seva123'; // Change this
```

### Customize Services

Services are stored in `gurudwaraData.services` array. Structure:

```javascript
{
  id: 1,
  title: 'Service Name',
  description: 'Short description',
  category: 'Category Name',
  icon: '🏥',
  details: 'Detailed description',
  dates: 'Available schedule',
  whatsappMessage: 'Custom WhatsApp message'
}
```

---

## 🎯 Key Pages

### 1. **Home Page** (`pages/HomePage.jsx`)
- Hero section with CTA
- About Gurudwara
- Services overview grid
- Upcoming events
- Community testimonials
- Committee members
- Contact information with map embed

### 2. **Services Page** (`pages/ServicesPage.jsx`)
- Complete service directory
- Category filters
- Expandable service details
- WhatsApp & Call buttons for each service
- Service commitment standards
- FAQ section

### 3. **Booking Page** (`pages/BookingPage.jsx`)
- Event/service booking form
- Date picker (min today)
- WhatsApp integration
- Booking process guide
- Venue details
- Direct contact options

### 4. **Donation Page** (`pages/DonationPage.jsx`)
- Impact statistics
- Category selection (6 types)
- Predefined amounts + custom
- 3-step donation flow
- UPI payment integration
- 80G tax information
- Transparency details

### 5. **Admin Panel** (`pages/AdminPanel.jsx`)
- Dashboard overview
- Gurudwara info editor
- Service management
- Event management
- Committee member editor
- Password protected

---

## 🎨 Design System

### Color Palette

```css
--kesari: #FF9933 (Saffron)
--kesari-light: #FFB366
--kesari-dark: #E67E22
--navy: #0B1F3A (Navy Blue)
--navy-light: #1a3a5f
--navy-dark: #051424
--white: #FFFFFF
--gray-light: #F5F7FA
--gray-medium: #E8EEF5
--gray-dark: #6B7280
```

### Typography

- **Headings**: Georgia, Garamond serif (elegant)
- **Body**: Segoe UI, Tahoma sans-serif (readable)
- **Font Sizes**: Responsive with `clamp()` for fluidity

### Components

- **Buttons**: Primary, Secondary, Outline, WhatsApp, Call styles
- **Cards**: Hover effects with elevation
- **Forms**: Full validation with error states
- **Modals**: Smooth animations and overlays
- **Grids**: Auto-responsive with gap management

### Animations

- `fadeInUp` - Content entrance
- `fadeInDown` - Top-to-bottom
- `slideInRight/Left` - Directional slides
- `pulse` - Attention drawing
- `glow` - Kesari highlight
- `float` - Subtle movement

All animations respect `prefers-reduced-motion` for accessibility.

---

## 📱 WhatsApp Integration

### Format

```javascript
const message = encodeURIComponent('Your message here');
window.open(`https://wa.me/${PHONE_NUMBER}?text=${message}`, '_blank');
```

### Predefined Messages

Each service has a customized WhatsApp message:
```
"Hello, I would like information about [Service Name]."
```

### Booking Messages

Booking forms automatically format:
```
Event Type: [Type]
Date: [Formatted Date]
Name: [User Name]
Phone: [User Phone]
Message: [Additional Details]
```

---

## 💳 UPI Payment Integration

### Format

```javascript
const upiString = `upi://pay?pa=${UPI_ID}&pn=${NAME}&am=${AMOUNT}&tr=${REFERENCE}&tn=${DESCRIPTION}`;
window.location.href = upiString;
```

### Supported Apps
- Google Pay
- PhonePe
- Paytm
- BHIM
- Any UPI-enabled app

### Flow

1. User selects amount and category
2. Enters donor information
3. Confirms payment details
4. Clicks "Pay via UPI"
5. Opens default UPI app
6. Confirmation sent via WhatsApp

---

## 🔐 Data Persistence

### LocalStorage
- All admin changes auto-save to `localStorage`
- Key: `gurudwaraData`
- Data loads on app initialization
- JSON serialization

### Session Storage
- Event popup shown once per session
- Key: `eventPopupShown`

---

## 🌐 API Integration Ready

### Google Maps
Embed code in HomePage:
```javascript
<iframe 
  src="https://www.google.com/maps/embed?pb=..."
  title="Gurudwara Location"
></iframe>
```

### WhatsApp API
Uses official WhatsApp web integration via `wa.me` URLs

### UPI
Standard Android/iOS UPI protocol

---

## 📊 Admin Dashboard Stats

- Total Services Count
- Events Count
- Committee Members
- Last Updated Date
- Quick Action Buttons

---

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels for icons
- Keyboard navigation support
- Color contrast compliance
- Reduced motion support
- Focus states on all interactive elements

---

## 📱 Mobile Optimization

### Responsive Breakpoints
- **Desktop**: 1200px+
- **Tablet**: 768px - 1200px
- **Mobile**: < 768px

### Mobile Features
- Hamburger menu (auto-hide at 768px)
- Touch-friendly button sizes (min 44x44px)
- Optimized font sizes
- Single-column layouts
- Floating icons repositioned
- Stack-based forms

---

## 🔍 SEO Optimization

- Semantic HTML tags
- Meta descriptions
- Proper heading hierarchy
- Alt text for images
- Clean URLs
- Fast load times
- Mobile-first design

---

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm run build
# Upload build folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy build folder
```

### Self-Hosted
```bash
npm run build
# Serve build folder with any HTTP server
```

---

## 📧 Support & Contact

### For Users
- **WhatsApp**: 8191011219
- **Phone**: 8191011219
- **Location**: Saiyyad Mohalla, Dehradun

### For Admin Issues
- Check LocalStorage (DevTools > Application)
- Clear cache if issues persist
- Verify admin password
- Check browser console for errors

---

## 🔄 Future Enhancements

- [ ] Service add/edit interface in admin
- [ ] Donor/volunteer registration
- [ ] Appointment system
- [ ] Integrated SMS notifications
- [ ] Photo gallery management
- [ ] Multi-language full translation
- [ ] Database backend (Firebase/Node.js)
- [ ] Email confirmations
- [ ] Analytics dashboard
- [ ] Volunteer management system

---

## 📄 License

This website is created for **Gurudwara Sadh Sangat Sahib** for community service purposes.

---

## 🙏 Acknowledgments

Built with ❤️ for community service and spiritual values.

Design inspired by:
- Trust-first design principles
- Spiritual & cultural aesthetics
- Community-focused UX
- Accessibility standards

---

## 📞 Technical Support

For technical issues or customization:
1. Check browser console for errors
2. Verify all phone numbers and UPI ID are correct
3. Test WhatsApp integration on device
4. Clear browser cache and localStorage if needed
5. Ensure JavaScript is enabled

---

**Version**: 1.0.0  
**Last Updated**: February 2025  
**Made with ☬ for Sarbat da Bhala (Well-being of All)**
