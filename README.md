# Up-Down-Lighting Website

A professional Christmas lights installation service website for Bayport, Minnesota and surrounding areas.

## 🎄 Features

- **Responsive Design**: Mobile-first approach with beautiful UI/UX
- **Multi-page Website**: Home, Services, Service Areas, Contact, About Us, Gallery
- **Interactive Forms**: Quote request and contact forms with validation
- **Live Chatbot**: AI-powered customer support
- **Database Integration**: SQLite database for storing quotes and messages
- **Email Notifications**: Automated email alerts for new submissions

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with CSS variables

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **SQLite3** - Lightweight database
- **Nodemailer** - Email service
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
up-down-lighting/
├── client/                 # React frontend
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   └── src/
│       ├── components/
│       │   ├── Navbar.js
│       │   ├── Footer.js
│       │   └── Chatbot.js
│       ├── pages/
│       │   ├── Home.js
│       │   ├── Services.js
│       │   ├── ServiceAreas.js
│       │   ├── Contact.js
│       │   ├── AboutUs.js
│       │   └── Gallery.js
│       ├── App.js
│       ├── App.css
│       └── index.css
├── server/
│   └── index.js           # Express server
├── public/                # Production build files
├── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd up-down-lighting
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 3. Environment Configuration
Create a `.env` file in the server directory:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=5000
NODE_ENV=development
DB_PATH=./database.sqlite
```

### 4. Start the Application
```bash
# Development mode (runs both frontend and backend)
npm run dev

# Or run separately:
# Backend only
npm run server

# Frontend only
npm run client
```

## 📱 Pages Overview

### 🏠 Home Page
- Hero section with call-to-action
- Free quote request form with validation
- Preview cards for all other pages
- Interactive chatbot
- Responsive design

### 🔧 Services Page
- Detailed service offerings
- Pricing information
- Process explanation
- Why choose us section

### 📍 Service Areas Page
- Coverage map and areas served
- City-specific information
- Special services by area

### 📞 Contact Page
- Multiple contact methods
- Contact form with validation
- FAQ section
- Emergency service notice

### 👥 About Us Page
- Company story and values
- Team member profiles
- Company timeline
- Certifications and insurance

### 📸 Gallery Page
- Project showcase with filtering
- Before/after comparisons
- Customer testimonials
- Category-based organization

## 🎨 Design Features

### Color Scheme
- **Primary Green**: #228B22 (Christmas theme)
- **Dark Green**: #006400
- **Gold**: #FFD700 (Accent color)
- **Red**: #DC143C (Holiday accent)

### Typography
- **Font**: Inter (Google Fonts)
- **Responsive**: Mobile-first design
- **Accessibility**: WCAG compliant

## 🔧 API Endpoints

### Quotes
- `GET /api/quotes` - Retrieve all quotes
- `POST /api/quotes` - Submit new quote

### Contact
- `GET /api/contact` - Retrieve all messages
- `POST /api/contact` - Submit new message

### Gallery
- `GET /api/gallery` - Retrieve gallery images
- `POST /api/gallery` - Add new image (admin)

### Chatbot
- `POST /api/chatbot` - Chat with AI assistant

## 📊 Database Schema

### Quotes Table
```sql
CREATE TABLE quotes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  service_type TEXT,
  message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Contact Messages Table
```sql
CREATE TABLE contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Gallery Images Table
```sql
CREATE TABLE gallery_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Deployment

### Production Build
```bash
# Build the React app
npm run build

# Start production server
npm start
```

### Environment Variables
Ensure all environment variables are set for production:
- `EMAIL_USER` - Gmail address for notifications
- `EMAIL_PASS` - Gmail app password
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (production/development)

## 🧪 Testing

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] Navigation works on all devices
- [ ] Forms submit successfully
- [ ] Chatbot responds appropriately
- [ ] Email notifications work
- [ ] Mobile responsiveness
- [ ] Form validation
- [ ] Error handling

## 📈 Future Enhancements

- [ ] Admin dashboard for managing quotes/messages
- [ ] Image upload functionality for gallery
- [ ] Customer portal for quote tracking
- [ ] Payment integration
- [ ] Advanced chatbot with more responses
- [ ] SEO optimization
- [ ] Analytics integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions:
- Email: info@updownlighting.com
- Phone: (555) 123-4567
- Website: [Up-Down-Lighting](https://updownlighting.com)

---

**Up-Down-Lighting** - Making your holidays bright in Bayport, Minnesota! 🎄✨
