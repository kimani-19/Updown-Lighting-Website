import React, { useState, useEffect } from 'react';

const allImages = [
  {
    id: 1,
    title: 'Classic Warm White',
    description: "Elegant C9 LED bulbs outlining the roofline for a timeless holiday look.",
    image_url: '/images/gallery/gallery1.jpeg',
    category: 'residential'
  },
  {
    id: 2,
    title: "The Installation Process",
    description:  "A behind-the-scenes look at our professional installation process during the day.",
    image_url: '/images/gallery/gallery2.jpeg',
    category: 'residential'
  },
  {
    id: 3,
    title: 'Another beautiful home',
    description: 'Professional lighting installation for a Stillwater business',
    image_url: '/images/gallery/gallery3.jpeg',
    category: 'residential'
  },
  {
    id: 4,
    title:  "Vibrant & Colorful Display",
    description: "Dynamic, multi-colored LED lights bring a fun and festive spirit to this home.",
    image_url: '/images/gallery/gallery4.jpeg',
    category: 'landscaping'
  },
  {
    id: 5,
    title:  "Clean & Professional Install",
    description: 'Elegant lighting design for a historic Stillwater home',
    image_url: '/images/gallery/gallery5.jpeg',
    category: 'residential'
  }
];

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setImages(allImages);
    setLoading(false);
  }, []);

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'residential', label: 'Residential' },
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
              <a href="tel:6514974609" className="btn btn-secondary">Call (651)497-4609</a>
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
                <img src="/images/gallery/gallery2.jpeg" alt="Before installation" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                <h4>Before</h4>
              </div>
              <div className="before-after-image">
                <img src="/images/gallery/gallery1.jpeg" alt="After installation" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                <h4>After</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
