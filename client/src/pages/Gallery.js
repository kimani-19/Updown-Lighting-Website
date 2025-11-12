import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('/api/gallery');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
      // Fallback to sample images if API fails
      setImages(getSampleImages());
    } finally {
      setLoading(false);
    }
  };

  const getSampleImages = () => [
    {
      id: 1,
      title: 'Classic Roofline Installation',
      description: 'Traditional warm white LED lights on a beautiful Bayport home',
      image_url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="%23000" width="400" height="300"/><rect fill="%23888" x="50" y="200" width="300" height="80"/><rect fill="%23333" x="100" y="150" width="200" height="50"/><circle fill="%23FFD700" cx="120" cy="170" r="3"/><circle fill="%23FFD700" cx="140" cy="170" r="3"/><circle fill="%23FFD700" cx="160" cy="170" r="3"/><circle fill="%23FFD700" cx="180" cy="170" r="3"/><circle fill="%23FFD700" cx="200" cy="170" r="3"/><circle fill="%23FFD700" cx="220" cy="170" r="3"/><circle fill="%23FFD700" cx="240" cy="170" r="3"/><circle fill="%23FFD700" cx="260" cy="170" r="3"/><circle fill="%23FFD700" cx="280" cy="170" r="3"/></svg>',
      category: 'residential'
    },
    {
      id: 2,
      title: 'Colorful Holiday Display',
      description: 'Multi-colored LED lights creating a festive atmosphere',
      image_url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="%23000" width="400" height="300"/><rect fill="%23888" x="50" y="200" width="300" height="80"/><rect fill="%23333" x="100" y="150" width="200" height="50"/><circle fill="%23DC143C" cx="120" cy="170" r="3"/><circle fill="%23FFD700" cx="140" cy="170" r="3"/><circle fill="%2300FF00" cx="160" cy="170" r="3"/><circle fill="%2300BFFF" cx="180" cy="170" r="3"/><circle fill="%23FF69B4" cx="200" cy="170" r="3"/><circle fill="%23FFD700" cx="220" cy="170" r="3"/><circle fill="%23DC143C" cx="240" cy="170" r="3"/><circle fill="%2300FF00" cx="260" cy="170" r="3"/><circle fill="%2300BFFF" cx="280" cy="170" r="3"/></svg>',
      category: 'residential'
    },
    {
      id: 3,
      title: 'Commercial Building Lighting',
      description: 'Professional lighting installation for a Stillwater business',
      image_url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="%23000" width="400" height="300"/><rect fill="%23666" x="50" y="120" width="300" height="160"/><rect fill="%23444" x="70" y="140" width="40" height="40"/><rect fill="%23444" x="130" y="140" width="40" height="40"/><rect fill="%23444" x="190" y="140" width="40" height="40"/><rect fill="%23444" x="250" y="140" width="40" height="40"/><rect fill="%23444" x="310" y="140" width="40" height="40"/><circle fill="%23FFD700" cx="90" cy="130" r="2"/><circle fill="%23FFD700" cx="110" cy="130" r="2"/><circle fill="%23FFD700" cx="130" cy="130" r="2"/><circle fill="%23FFD700" cx="150" cy="130" r="2"/><circle fill="%23FFD700" cx="170" cy="130" r="2"/><circle fill="%23FFD700" cx="190" cy="130" r="2"/><circle fill="%23FFD700" cx="210" cy="130" r="2"/><circle fill="%23FFD700" cx="230" cy="130" r="2"/><circle fill="%23FFD700" cx="250" cy="130" r="2"/><circle fill="%23FFD700" cx="270" cy="130" r="2"/><circle fill="%23FFD700" cx="290" cy="130" r="2"/><circle fill="%23FFD700" cx="310" cy="130" r="2"/><circle fill="%23FFD700" cx="330" cy="130" r="2"/><circle fill="%23FFD700" cx="350" cy="130" r="2"/></svg>',
      category: 'commercial'
    },
    {
      id: 4,
      title: 'Custom Tree Lighting',
      description: 'Beautiful tree wrapping with warm white LED lights',
      image_url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="%23000" width="400" height="300"/><ellipse fill="%23006600" cx="200" cy="250" rx="80" ry="60"/><ellipse fill="%23006600" cx="200" cy="200" rx="60" ry="50"/><ellipse fill="%23006600" cx="200" cy="150" rx="40" ry="40"/><ellipse fill="%23006600" cx="200" cy="100" rx="20" ry="30"/><circle fill="%23FFD700" cx="180" cy="220" r="2"/><circle fill="%23FFD700" cx="200" cy="220" r="2"/><circle fill="%23FFD700" cx="220" cy="220" r="2"/><circle fill="%23FFD700" cx="190" cy="180" r="2"/><circle fill="%23FFD700" cx="210" cy="180" r="2"/><circle fill="%23FFD700" cx="180" cy="140" r="2"/><circle fill="%23FFD700" cx="200" cy="140" r="2"/><circle fill="%23FFD700" cx="220" cy="140" r="2"/><circle fill="%23FFD700" cx="200" cy="100" r="2"/></svg>',
      category: 'landscaping'
    },
    {
      id: 5,
      title: 'Historic Home Lighting',
      description: 'Elegant lighting design for a historic Stillwater home',
      image_url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="%23000" width="400" height="300"/><rect fill="%23888" x="80" y="180" width="240" height="100"/><rect fill="%23666" x="120" y="140" width="160" height="40"/><rect fill="%23444" x="140" y="120" width="120" height="20"/><circle fill="%23FFD700" cx="140" cy="130" r="2"/><circle fill="%23FFD700" cx="160" cy="130" r="2"/><circle fill="%23FFD700" cx="180" cy="130" r="2"/><circle fill="%23FFD700" cx="200" cy="130" r="2"/><circle fill="%23FFD700" cx="220" cy="130" r="2"/><circle fill="%23FFD700" cx="240" cy="130" r="2"/><circle fill="%23FFD700" cx="260" cy="130" r="2"/></svg>',
      category: 'residential'
    },
    {
      id: 6,
      title: 'Modern LED Installation',
      description: 'Contemporary LED lighting system with smart controls',
      image_url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="%23000" width="400" height="300"/><rect fill="%23CCC" x="60" y="200" width="280" height="80"/><rect fill="%23AAA" x="100" y="160" width="200" height="40"/><rect fill="%23888" x="120" y="140" width="160" height="20"/><circle fill="%2300FF00" cx="140" cy="150" r="2"/><circle fill="%2300FF00" cx="160" cy="150" r="2"/><circle fill="%2300FF00" cx="180" cy="150" r="2"/><circle fill="%2300FF00" cx="200" cy="150" r="2"/><circle fill="%2300FF00" cx="220" cy="150" r="2"/><circle fill="%2300FF00" cx="240" cy="150" r="2"/><circle fill="%2300FF00" cx="260" cy="150" r="2"/></svg>',
      category: 'commercial'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'landscaping', label: 'Landscaping' }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(image => image.category === selectedCategory);

  return (
    <div className="gallery">
      {/* Hero Section */}
      <section 
        className="hero"
        style={{
          backgroundImage: `url('/images/hero/image1.jpeg')`
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Our Gallery</h1>
          <p className="hero-subtitle">
            Explore our beautiful Christmas lights installations and get inspired for your own project. 
            From residential homes to commercial buildings, see the magic we create.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="section" style={{ paddingTop: '40px', paddingBottom: '20px' }}>
        <div className="container">
          <div className="category-filter">
            {categories.map((category) => (
              <button
                key={category.value}
                className={`filter-btn ${selectedCategory === category.value ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section" style={{ paddingTop: '20px' }}>
        <div className="container">
          {loading ? (
            <div className="loading-message">
              <h3>Loading gallery images...</h3>
            </div>
          ) : (
            <div className="gallery-grid">
              {filteredImages.map((image) => (
                <div key={image.id} className="gallery-item">
                  <div className="gallery-image">
                    <img 
                      src={image.image_url} 
                      alt={image.title}
                      style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  </div>
                  <div className="gallery-info">
                    <h3 className="gallery-title">{image.title}</h3>
                    <p className="gallery-description">{image.description}</p>
                    <span className="gallery-category">{image.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="section" style={{ backgroundColor: 'var(--light-gray)' }}>
        <div className="container">
          <div className="gallery-cta">
            <h2 className="section-title">Ready to Create Your Own Magic?</h2>
            <p className="section-subtitle">
              Let us transform your property into a beautiful winter wonderland. 
              Contact us today for a free quote and consultation.
            </p>
            
            <div className="cta-buttons">
              <a href="/contact" className="btn btn-primary">Get Free Quote</a>
              <a href="tel:5551234567" className="btn btn-secondary">Call (555) 123-4567</a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">
            Don't just take our word for it - hear from our satisfied customers.
          </p>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Absolutely beautiful work! Our home looks magical this holiday season. The team was professional, efficient, and the lights are perfectly placed."</p>
              </div>
              <div className="testimonial-author">
                <strong>Sarah M.</strong>
                <span>Bayport, MN</span>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"We've used Up-Down-Lighting for three years now. Their attention to detail and customer service is outstanding. Highly recommend!"</p>
              </div>
              <div className="testimonial-author">
                <strong>Mike & Lisa R.</strong>
                <span>Stillwater, MN</span>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Professional, reliable, and beautiful results. They transformed our business into a holiday destination. Our customers love it!"</p>
              </div>
              <div className="testimonial-author">
                <strong>Jennifer K.</strong>
                <span>Woodbury, MN</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After */}
      <section className="section" style={{ backgroundColor: 'var(--light-gray)' }}>
        <div className="container">
          <h2 className="section-title">Before & After</h2>
          <p className="section-subtitle">
            See the dramatic transformation our Christmas lights installations can achieve.
          </p>
          
          <div className="before-after-grid">
            <div className="before-after-item">
              <div className="before-after-image">
                <div className="image-placeholder">
                  <h4>Before</h4>
                  <p>Plain house exterior</p>
                </div>
              </div>
              <div className="before-after-image">
                <div className="image-placeholder">
                  <h4>After</h4>
                  <p>Magical Christmas display</p>
                </div>
              </div>
            </div>
            
            <div className="before-after-item">
              <div className="before-after-image">
                <div className="image-placeholder">
                  <h4>Before</h4>
                  <p>Dark commercial building</p>
                </div>
              </div>
              <div className="before-after-image">
                <div className="image-placeholder">
                  <h4>After</h4>
                  <p>Festive business attraction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
