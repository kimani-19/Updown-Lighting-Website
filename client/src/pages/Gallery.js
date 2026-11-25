import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [beforeImage, setBeforeImage] = useState('/images/gallery/gallery2.jpeg');
  const [afterImage, setAfterImage] = useState('/images/gallery/gallery1.jpeg');

  useEffect(() => {
    let active = true;

    const loadImages = async () => {
      if (!supabase) {
        setLoadError('The gallery is not configured yet. Please check back soon.');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('gallery_images')
        .select('id, title, description, image_url, category, media_type, poster_url, created_at')
        .order('created_at', { ascending: false });

      if (!active) return;

      if (error) {
        console.error('Unable to load gallery images:', error);
        setLoadError('We could not load the gallery right now. Please try again later.');
      } else {
        setImages(data || []);
        const before = data?.find((image) =>
          image.media_type !== 'video' && image.title?.toLowerCase().includes('before')
        );
        const after = data?.find((image) =>
          image.media_type !== 'video' && image.title?.toLowerCase().includes('after')
        );
        if (before) setBeforeImage(before.image_url);
        if (after) setAfterImage(after.image_url);
      }
      setLoading(false);
    };

    loadImages();
    return () => {
      active = false;
    };
  }, []);

  const categories = [
    { value: 'all', label: 'All Projects' },
    ...Array.from(new Set(images.map((image) => image.category).filter(Boolean)))
      .sort()
      .map((category) => ({
        value: category,
        label: category.charAt(0).toUpperCase() + category.slice(1),
      })),
  ];

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(image => image.category === selectedCategory);

  return (
    <div className="gallery">
      {/* Hero Section */}
      <section 
        className="hero hero-business-photo"
        style={{
          backgroundImage: `url('/images/hero/team-installation-wide-banner.jpg')`
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
          ) : loadError ? (
            <div className="gallery-state gallery-state-error" role="alert">
              <h3>Gallery unavailable</h3>
              <p>{loadError}</p>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="gallery-state">
              <h3>{images.length ? 'No projects in this category yet' : 'New projects coming soon'}</h3>
              <p>Check back soon to see more of our holiday lighting work.</p>
            </div>
          ) : (
            <div className="gallery-grid">
              {filteredImages.map((image) => (
                <article key={image.id} className="gallery-item">
                  <div className="gallery-image">
                    {image.media_type === 'video' ? (
                      <video
                        src={image.image_url}
                        poster={image.poster_url || undefined}
                        controls
                        preload="metadata"
                        playsInline
                        aria-label={image.title || 'Holiday lighting video'}
                      />
                    ) : (
                      <img
                        src={image.image_url}
                        alt={image.title || 'Holiday lighting installation'}
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="gallery-info">
                    <h3 className="gallery-title">{image.title}</h3>
                    {image.description && <p className="gallery-description">{image.description}</p>}
                    {image.category && <span className="gallery-category">{image.category}</span>}
                  </div>
                </article>
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
              <Link to="/contact#quote-form" className="btn btn-primary">Get Free Quote</Link>
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
                <img src={beforeImage} alt="Home before Christmas light installation" loading="lazy" />
                <h4>Before</h4>
              </div>
              <div className="before-after-image">
                <img src={afterImage} alt="Home after Christmas light installation" loading="lazy" />
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
