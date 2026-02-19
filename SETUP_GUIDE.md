# Gurudwara Website - Setup & Deployment Guide

## 📋 Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Configuration](#configuration)
3. [Customization](#customization)
4. [Deployment](#deployment)
5. [Troubleshooting](#troubleshooting)
6. [Admin Guide](#admin-guide)

---

## 🚀 Local Development Setup

### Prerequisites
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Usually comes with Node.js
- A text editor (VS Code recommended)
- Basic knowledge of React

### Installation Steps

1. **Clone or Download the Project**
```bash
# If using git
git clone <repository-url>
cd gurudwara-website

# Or extract the ZIP file and navigate to folder
```

2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

3. **Start Development Server**
```bash
npm start
# or
yarn start
```

The site will open at `http://localhost:3000`

4. **Build for Production**
```bash
npm run build
# Creates optimized build in 'build' folder
```

---

## ⚙️ Configuration

### 1. Update Gurudwara Information

**File**: `index.jsx` (in the App component state)

```javascript
const [gurudwaraData, setGurudwaraData] = useState({
  name: 'Gurudwara Sadh Sangat Sahib',
  location: 'Saiyyad Mohalla, Dehradun',
  phone: '8191011219',
  whatsapp: '8191011219',
  upiId: 'mohitthakur222333@oksbi',
  // ... rest of data
});
```

**Update these fields:**
- `name` - Gurudwara name
- `location` - Address
- `phone` - Contact phone number
- `whatsapp` - WhatsApp number (with country code, no + sign)
- `upiId` - UPI ID for donations

### 2. Update Admin Password

**File**: `pages/AdminPanel.jsx`

```javascript
const correctPassword = 'admin@seva123'; // Change this to your secure password
```

**Recommendation**: Use a strong password combining:
- Uppercase letters
- Lowercase letters
- Numbers
- Special characters (@#$%^&*)

### 3. Update Committee Members

Edit the `committees` array in `index.jsx`:

```javascript
committees: [
  { 
    id: 1, 
    name: 'Person Name', 
    position: 'Committee Role',
    image: 'https://images.unsplash.com/...' 
  },
  // Add more members
]
```

Replace image URLs with actual photos of committee members.

### 4. Update Services

Edit the `services` array in `index.jsx`:

```javascript
services: [
  {
    id: 1,
    title: 'Service Name',
    description: 'Brief description',
    category: 'Medical Services',
    icon: '🏥',
    details: 'Detailed information',
    dates: 'Schedule/Availability',
    whatsappMessage: 'WhatsApp inquiry message'
  }
]
```

### 5. Update Events

Edit the `events` array in `index.jsx`:

```javascript
events: [
  {
    id: 1,
    title: 'Event Name',
    date: '2025-03-15',
    description: 'Event description',
    image: 'https://images.unsplash.com/...'
  }
]
```

---

## 🎨 Customization

### Color Scheme

If you want to change colors, edit `styles.css`:

```css
:root {
  --kesari: #FF9933;        /* Primary color (Saffron) */
  --navy: #0B1F3A;          /* Secondary color (Navy) */
  --white: #FFFFFF;         /* Background */
  /* ... other colors */
}
```

### Typography

Change fonts in `styles.css`:

```css
h1, h2, h3 {
  font-family: 'Georgia', serif; /* Change to your font */
}

body {
  font-family: 'Segoe UI', sans-serif; /* Change to your font */
}
```

### Images

Replace the following images:
- Hero background in `HomePage.jsx`
- About section image in `HomePage.jsx`
- Committee member photos
- Event images
- Venue image in `BookingPage.jsx`

### Animations

Modify animation speeds in `styles.css`:

```css
--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
/* Change 0.3s to desired duration */
```

---

## 🌐 Deployment

### Option 1: Vercel (Recommended)

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub/GitLab/Bitbucket

2. **Deploy**
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects React
   - Click "Deploy"
   - Done! Your site is live

3. **Custom Domain**
   - Go to Project Settings
   - Add your custom domain
   - Update DNS records (Vercel provides instructions)

### Option 2: Netlify

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up

2. **Deploy**
   - Drag and drop the `build` folder
   - OR connect GitHub for auto-deployment
   - Netlify builds and deploys automatically

3. **Custom Domain**
   - Go to Site Settings
   - Add custom domain
   - Update DNS records

### Option 3: GitHub Pages

1. **Update package.json**
```json
"homepage": "https://yourusername.github.io/gurudwara-website"
```

2. **Deploy**
```bash
npm run build
npm install gh-pages --save-dev
npx gh-pages -d build
```

3. **Enable in Repository**
   - Go to Settings > Pages
   - Select "gh-pages" branch
   - Save

### Option 4: Self-Hosted (cpanel/VPS)

1. **Build the Project**
```bash
npm run build
```

2. **Upload Files**
   - Upload contents of `build` folder to your server
   - Typically in `public_html` directory

3. **Configure Server**
   - Ensure `.htaccess` for React routing:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 🔧 Troubleshooting

### Issue: "npm not found"
**Solution**: Install Node.js from [nodejs.org](https://nodejs.org)

### Issue: Port 3000 already in use
**Solution**: 
```bash
# Use different port
npm start -- --port 3001
```

### Issue: Services not showing WhatsApp number
**Solution**: 
- Check WhatsApp number format (no spaces or +)
- Verify in `gurudwaraData` state
- Test: `wa.me/8191011219`

### Issue: UPI payment not working
**Solution**:
- Verify UPI ID format: `username@bankname`
- Test on actual device
- Check if UPI app is installed

### Issue: Images not loading
**Solution**:
- Verify image URLs are accessible
- Use HTTPS URLs only
- Check image dimensions

### Issue: Admin login not working
**Solution**:
- Clear browser cache
- Check password is exact match (case-sensitive)
- Default password: `admin@seva123`

### Issue: Data not persisting
**Solution**:
- Check if localStorage is enabled
- Try private/incognito window
- Clear browser storage and refresh

### Issue: Deployment fails
**Solution**:
- Check Node version compatibility
- Delete `node_modules` and `npm install` again
- Check build logs for errors
- Verify environment variables (if any)

---

## 👨‍💼 Admin Guide

### Accessing Admin Panel

1. **Navigate to Website**
   - Go to your website
   - Look for admin icon (⚙️) in navigation menu
   - Or direct URL: `yoursite.com/#/admin`

2. **Login**
   - Default Password: `admin@seva123`
   - Change this immediately!

### Admin Features

#### Dashboard
- View statistics
- Quick access to all features
- See total services, events, committee members

#### Gurudwara Info
- Update name
- Update location/address
- Update phone number
- Update WhatsApp number
- Update UPI ID
- Changes save automatically

#### Services Management
- View all services
- Delete services (coming: add/edit interface)
- Service details are displayed
- Edit functionality coming in future

#### Events Management
- Create/edit events
- Set event dates
- Update descriptions
- Upload event images
- Automatic date formatting

#### Committee Members
- Edit member names
- Update positions/roles
- Update/upload photos
- All changes save to database

### Logout

Click "Logout" button to exit admin panel

---

## 📱 Mobile App Preparation

To convert website to mobile app:

1. **PWA Setup** (Progressive Web App)
   - Add to homescreen capability
   - Offline access
   - Native feel

2. **Android App**
   - Use Android Studio
   - Wrap website in WebView
   - Publish to Play Store

3. **iOS App**
   - Use Xcode
   - Create native wrapper
   - Submit to App Store

---

## 🔒 Security Tips

1. **Change Default Credentials**
   - Admin password
   - Any API keys

2. **HTTPS Only**
   - All deployments use HTTPS
   - Ensures data security
   - Required for WhatsApp integration

3. **Data Privacy**
   - Inform users about data collection
   - Add privacy policy page
   - Implement GDPR if applicable

4. **Regular Backups**
   - Backup admin panel data
   - Use localStorage export
   - Version control all changes

---

## 📊 Analytics Setup

### Google Analytics

Add to your site:

```html
<!-- In public/index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Monitor
- Page views
- User behavior
- Donation conversions
- Booking submissions

---

## 🚀 Performance Optimization

1. **Image Optimization**
   - Use WebP format
   - Compress images
   - Use appropriate sizes

2. **Code Splitting**
   - Already done by React
   - Reduces initial load

3. **Caching**
   - Browser caching enabled
   - LocalStorage for data
   - Service Worker ready

4. **CDN**
   - Use CDN for images
   - Faster global delivery
   - Better performance

---

## 📞 Support

### For Technical Issues
1. Check browser console (F12)
2. Review error messages
3. Clear browser cache
4. Try different browser
5. Check connectivity

### Common Commands

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Build for production
npm run build

# Analyze bundle size
npm install -g source-map-explorer
source-map-explorer 'build/static/js/*.js'

# Run tests (if added)
npm test
```

---

## 📈 Future Roadmap

- [ ] Database integration (Firebase/MongoDB)
- [ ] Email notifications
- [ ] SMS integration
- [ ] Appointment system
- [ ] Volunteer management
- [ ] Photo gallery
- [ ] Multi-language full support
- [ ] Mobile app (iOS/Android)
- [ ] Advanced analytics
- [ ] Social media integration

---

**Last Updated**: February 2025  
**Version**: 1.0.0  
**Support**: Contact development team

---

## ✨ Quick Reference

### Important Files
- `index.jsx` - Main app component, data config
- `styles.css` - All styling
- `pages/AdminPanel.jsx` - Admin password
- `README.md` - Full documentation

### Key Contacts
- WhatsApp: 8191011219
- Phone: 8191011219
- Email: (Add your email)
- Location: Saiyyad Mohalla, Dehradun

### Default Credentials
- Admin Password: `admin@seva123`
- UPI ID: `mohitthakur222333@oksbi`

### Testing Checklist
- [ ] All links working
- [ ] WhatsApp messages correct
- [ ] Phone numbers clickable
- [ ] Forms submitting
- [ ] Donations working
- [ ] Admin login working
- [ ] Mobile responsive
- [ ] Fast loading
- [ ] No console errors

---

Happy serving! ☬
