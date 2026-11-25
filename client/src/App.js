import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceAreas from './pages/ServiceAreas';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import Gallery from './pages/Gallery';
import Footer from './components/Footer';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import LocationLandingPage from './pages/LocationLandingPage';
import locationPages from './locationPages.json';
import seoPages from './seoPages.json';
import './App.css';

const siteUrl = 'https://updownlighting.com';
const socialImage = `${siteUrl}/images/hero/team-installation-wide-banner.jpg`;
const locationPagesByPath = Object.fromEntries(
  Object.values(locationPages).map((page) => [page.path, page])
);

function setMetaTag(attribute, key, content) {
  let meta = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }

  meta.setAttribute('content', content);
}

function updateLocationStructuredData(locationPage) {
  let script = document.head.querySelector('script[data-location-service-schema="true"]');

  if (!locationPage) {
    script?.remove();
    return;
  }

  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.locationServiceSchema = 'true';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteUrl}${locationPage.path}#service`,
    name: `Christmas light installation in ${locationPage.city}, Minnesota`,
    serviceType: 'Christmas light installation',
    description: locationPage.description,
    provider: { '@id': `${siteUrl}/#business` },
    areaServed: {
      '@type': 'City',
      name: `${locationPage.city}, Minnesota`,
    },
    url: `${siteUrl}${locationPage.path}`,
  });
}

function updatePageMetadata(pathname) {
  const route = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  const locationPage = locationPagesByPath[route];
  const metadata = seoPages[route] || locationPage;
  const isPrivateRoute = pathname.startsWith('/admin') || !metadata;
  const title = metadata?.title || 'Administrator | UpDown Lighting';
  const description = metadata?.description || 'Private administrator access for UpDown Lighting.';

  document.title = title;
  setMetaTag('name', 'description', description);
  setMetaTag('property', 'og:title', title);
  setMetaTag('property', 'og:description', description);
  setMetaTag('property', 'og:url', `${siteUrl}${route || '/'}`);
  setMetaTag('name', 'twitter:title', title);
  setMetaTag('name', 'twitter:description', description);

  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (isPrivateRoute) {
    updateLocationStructuredData(null);
    canonical?.remove();
    setMetaTag('name', 'robots', 'noindex, nofollow');
    return;
  }

  updateLocationStructuredData(locationPage);

  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', `${siteUrl}${route}`);
  document.head.querySelector('meta[name="robots"]')?.remove();
  setMetaTag('property', 'og:image', socialImage);
  setMetaTag('property', 'og:image:alt', 'UpDown Lighting team installing holiday lights on a home');
  setMetaTag('name', 'twitter:image', socialImage);
}

function ScrollToDestination() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const frame = window.requestAnimationFrame(() => {
        const destination = document.querySelector(hash);
        if (destination) {
          destination.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
      });
      return () => window.cancelAnimationFrame(frame);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}

function AppRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    updatePageMetadata(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <ScrollToDestination />
      {!isAdminRoute && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service-areas" element={<ServiceAreas />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/service-areas/:slug" element={<LocationLandingPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/dashboard/:section" element={<AdminDashboard />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
