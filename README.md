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

```text
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

Create a `.env` file (recommended: in the `server/` directory):

```env
EMAIL_USER=updownlighting19@gmail.com
EMAIL_PASS=your-app-password
PORT=5000
NODE_ENV=development
DB_PATH=./database.sqlite

# Google Reviews (Google Places API (New))
API_KEY=your-google-places-api-key
PLACE_ID=your-google-place-id
```

Notes:

- The server will load environment variables from either `server/.env` or the repository root `.env`.
- The Google Reviews section on the Home page calls `GET /api/reviews`, which uses `API_KEY` and `PLACE_ID` server-side. Enable Places API (New) for the key in Google Cloud.
- The endpoint returns the Place's overall `rating` and `userRatingCount` alongside the normalized `reviews` array; the carousel displays reviews in the order returned by Google.
- Keep the API key server-side; do not put it in React code or commit it.
- On Vercel, `server/.env` is NOT used. You must set `API_KEY` and `PLACE_ID` in the Vercel Project → Settings → Environment Variables (Production), then redeploy.

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

## 🧪 Serve the Production Build Locally

If you run a static server against the wrong folder (or without SPA fallback), you can see `404 Not Found` for routes like `/services` or `/about-us`.

From the repo root:

```bash
# Build the React app
npm run build

# Serve the production build with SPA fallback (recommended)
npm run serve
```

Notes:

- This project uses React Router, so client-side routes must be rewritten to `index.html`. The `serve` command above uses `serve -s` which enables that fallback.
- If port `3000` is already in use, `serve` will automatically pick another port and print the URL.

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

The quote and contact `GET` endpoints require a Supabase session whose `app_metadata.role` is `admin`. They use `SUPABASE_URL` and `SUPABASE_SECRET_KEY` (or `SUPABASE_SERVICE_ROLE_KEY`) from server-side environment configuration; never put the service-role key in the React client.

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

- Email: [updownlighting19@gmail.com](mailto:updownlighting19@gmail.com)
- Phone: (651)497-4609
- Website: [Up-Down-Lighting](https://updownlighting.com)

---

**Up-Down-Lighting** - Making your holidays bright in Bayport, Minnesota! 🎄✨
