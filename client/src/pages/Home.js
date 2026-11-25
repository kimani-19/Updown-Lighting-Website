import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Chatbot from '../components/Chatbot';
import GoogleReviews, { GoogleMark } from '../components/GoogleReviews';
import QuoteForm from '../components/QuoteForm';

const HeroRatingStars = ({ rating }) => {
  const hasRating = typeof rating === 'number' && Number.isFinite(rating);
  const fill = hasRating ? `${(Math.max(0, Math.min(5, rating)) / 5) * 100}%` : '0%';

  return (
    <span
      className="hero-google-stars"
      style={{ '--hero-star-fill': fill }}
      role="img"
      aria-label={hasRating ? `${rating.toFixed(1)} out of 5 stars` : 'Rating unavailable'}
    >
      ★★★★★
    </span>
  );
};

const Home = () => {
  const [googleReviewData, setGoogleReviewData] = useState(null);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/reviews');
        const data = Array.isArray(response.data)
          ? { reviews: response.data }
          : response.data;

        if (!Array.isArray(data?.reviews)) {
          throw new Error('Received an invalid response for Google reviews.');
        }

        if (active) setGoogleReviewData(data);
      } catch (error) {
        console.error('Error fetching Google reviews:', error);
        if (active) setReviewsError(true);
      } finally {
        if (active) setReviewsLoading(false);
      }
    };

    fetchReviews();
    return () => {
      active = false;
    };
  }, []);

  const rating = typeof googleReviewData?.rating === 'number'
    ? googleReviewData.rating
    : null;
  const reviewCount = typeof googleReviewData?.userRatingCount === 'number'
    ? googleReviewData.userRatingCount
    : null;
  const formattedReviewCount = reviewCount === null
    ? reviewsLoading ? 'Loading reviews' : 'Review count unavailable'
    : `${new Intl.NumberFormat('en-US').format(reviewCount)} ${reviewCount === 1 ? 'review' : 'reviews'}`;
  const ratingDescription = rating === null
    ? 'Rating unavailable.'
    : `Rated ${rating.toFixed(1)} out of 5.`;
  const reviewCountDescription = reviewCount === null
    ? 'Review count unavailable.'
    : `${formattedReviewCount}.`;

  return (
    <div className="home">
      {/* Hero Section */}
      <section 
        className="hero hero-business-photo"
        style={{
          backgroundImage: `url('/images/hero/team-installation-wide-banner.jpg')`
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Professional Christmas Lights Installation</h1>
          <p className="hero-subtitle">
            Transform your home into a winter wonderland with our expert Christmas lights installation service in Bayport, Minnesota and surrounding areas.
          </p>
          <div className="hero-buttons">
            <a href="#quote-form" className="btn hero-quote-btn">Get a Free Quote</a>
            <Link to="/gallery" className="btn hero-work-btn">View Our Work</Link>
          </div>
          <div className="hero-google-rating-row">
            <a
              className="hero-google-rating"
              href="#google-reviews"
              aria-label={`Read our Google customer reviews. ${ratingDescription} ${reviewCountDescription}`}
            >
              <span className="hero-google-brand">
                <GoogleMark className="hero-google-logo" />
                <span>Google</span>
              </span>
              <strong className="hero-google-rating-number">
                {rating === null ? '—' : rating.toFixed(1)}
              </strong>
              <HeroRatingStars rating={rating} />
              <span className="hero-google-review-count">{formattedReviewCount}</span>
              <svg
                className="hero-google-arrow"
                viewBox="0 0 20 20"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M4 10h11M10 5l5 5-5 5" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section
        id="quote-form"
        className="section quote-section"
        style={{ '--quote-background-image': "url('/images/hero/image1.jpeg')" }}
      >
        <div className="container quote-section-content">
          <div className="quote-section-heading">
            <p className="quote-kicker">Up-Down-Lighting</p>
            <h2 className="section-title">Request a Free Quote</h2>
            <p className="section-subtitle">
              Get a personalized quote for professional Christmas light installation at your home or business. It's quick, easy, and there's no obligation.
            </p>
          </div>
          
          <QuoteForm />
        </div>
      </section>

      {/* Page Previews Section */}
      <section className="page-previews">
        <div className="container">
          <h2 className="section-title">Explore Our Services</h2>
          <p className="section-subtitle">
            Discover everything we offer to make your Christmas lighting dreams come true.
          </p>
          
          <div className="grid grid-3">
            <div className="preview-card">
              <div className="preview-icon">🔧</div>
              <h3 className="preview-title">Our Services</h3>
              <p className="preview-description">
                Professional installation, maintenance, and removal services for residential and commercial properties.
              </p>
              <Link to="/services" className="btn btn-primary">Learn More</Link>
            </div>
            
            <div className="preview-card">
              <div className="preview-icon">📍</div>
              <h3 className="preview-title">Service Areas</h3>
              <p className="preview-description">
                We proudly serve Bayport, Minnesota and surrounding communities within a 25-mile radius.
              </p>
              <Link to="/service-areas" className="btn btn-primary">View Areas</Link>
            </div>
            
            <div className="preview-card">
              <div className="preview-icon">📸</div>
              <h3 className="preview-title">Gallery</h3>
              <p className="preview-description">
                See our beautiful Christmas light installations and get inspired for your own project.
              </p>
              <Link to="/gallery" className="btn btn-primary">View Gallery</Link>
            </div>
            
            <div className="preview-card">
              <div className="preview-icon">👥</div>
              <h3 className="preview-title">About Us</h3>
              <p className="preview-description">
                Learn about our experienced team and our commitment to quality Christmas lighting services.
              </p>
              <Link to="/about-us" className="btn btn-primary">Meet Our Team</Link>
            </div>
            
            <div className="preview-card">
              <div className="preview-icon">📞</div>
              <h3 className="preview-title">Contact Us</h3>
              <p className="preview-description">
                Get in touch with our team for questions, quotes, or to schedule your installation.
              </p>
              <Link to="/contact" className="btn btn-primary">Contact Us</Link>
            </div>
            
            <div className="preview-card">
              <div className="preview-icon">⭐</div>
              <h3 className="preview-title">Why Choose Us</h3>
              <p className="preview-description">
                Licensed, insured, and experienced professionals dedicated to making your holidays bright.
              </p>
              <Link to="/about-us" className="btn btn-primary">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <GoogleReviews
        reviewData={googleReviewData}
        loading={reviewsLoading}
        error={reviewsError}
      />

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Home;
