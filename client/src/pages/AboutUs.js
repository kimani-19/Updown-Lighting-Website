import React from 'react';
import { Link } from 'react-router-dom';
import aboutImage from '../assets/images/about-image.jpeg';

const AboutUs = () => {
  const Owner = [
    {
      name: 'Kj Munn',
      role: 'Founder & Lead Installer',
      experience: '5+ years',
      specialties: ['Commercial installations', 'Custom designs', 'LED systems'],
      image: '👨‍🔧'
    },

  ];

  const companyValues = [
    {
      icon: '🎯',
      title: 'Quality First',
      description: 'We never compromise on quality. Every installation is completed to the highest standards with attention to detail.'
    },
    {
      icon: '🤝',
      title: 'Customer Satisfaction',
      description: 'Your satisfaction is our priority. We work closely with you to ensure your vision becomes reality.'
    },
    {
      icon: '⚡',
      title: 'Innovation',
      description: 'We stay current with the latest lighting technology and techniques to provide the best solutions.'
    },
    {
      icon: '🌱',
      title: 'Sustainability',
      description: 'We promote energy-efficient LED lighting and sustainable practices to protect our environment.'
    },
    {
      icon: '🛡️',
      title: 'Safety',
      description: 'Safety is paramount in all our operations. We follow strict safety protocols and maintain full insurance.'
    },
    {
      icon: '🏆',
      title: 'Excellence',
      description: 'We strive for excellence in every project, from small residential installations to large commercial displays.'
    }
  ];

  const milestones = [
    {
      year: '2024',
      event: 'Company Founded',
      description: 'Started Up-Down-Lighting with a vision to bring professional Christmas lighting to Bayport and surrounding areas.'
    },
    {
      year: '2024',
      event: 'First Customers Served',
      description: 'Completed our first residential and commercial Christmas lighting installations, earning 5-star reviews from local clients.'
    },
    
    {
      year: '2024',
      event: 'Expanded Service Area',
      description: 'Started serving the entire 25-mile radius around Bayport, including Stillwater, Lake Elmo, Woodbury, and more.'
    },
  
  ];

  return (
    <div className="about-us">
      {/* Hero Section */}
      <section 
        className="hero"
        style={{
          backgroundImage: `url('/images/hero/image1.jpeg')`
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">About Up-Down-Lighting</h1>
          <p className="hero-subtitle">
            Professional Christmas lights installation service dedicated to making your holidays bright in Bayport, Minnesota and surrounding areas.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center', gap: '60px' }}>
            <div>
              <h2 className="section-title">Our Story</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '20px' }}>
              Up-Down-Lighting was founded in 2024 out of a desire to bring joyful, professional Christmas lighting to Bayport and neighboring communities. Our story began when we noticed the magic that a well-lit home brings to a neighborhood, and set out to help others experience that same holiday cheer.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '20px' }}>
                Our mission is simple: to transform homes and businesses into magical winter wonderlands while providing 
                exceptional customer service and maintaining the highest standards of quality and safety.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '30px' }}>
                We believe that Christmas lights are more than just decorations – they're a way to bring joy, create 
                memories, and spread holiday cheer throughout our community.
              </p>
              <Link to="/contact" className="btn btn-primary">Get to Know Us Better</Link>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <div className="placeholder-content">
                  <img 
                    src={aboutImage} 
                    alt="Up-Down-Lighting owner at work" 
                    style={{
                      width: '100%',
                      height: '260px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.13)'
                    }}
                  />
                  <p>Beautiful Christmas Light Installations</p>
                  <p>Since 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section" style={{ backgroundColor: 'var(--light-gray)' }}>
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <p className="section-subtitle">
            The principles that guide everything we do and shape our commitment to excellence.
          </p>
          
          <div className="grid grid-3">
            {companyValues.map((value, index) => (
              <div key={index} className="card text-center">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Meet Our Owner</h2>
          <p className="section-subtitle">
            Kj Munn is the dedicated owner of UpDown Lighting, bringing expert leadership and a passion for creating magical holiday displays throughout the Twin Cities East Metro.
          </p>
          
          <div className="grid grid-2">
            {Owner.map((member, index) => (
              <div key={index} className="card team-member-card">
                <div className="member-image">{member.image}</div>
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-experience">{member.experience} of experience</p>
                
                <div className="member-specialties">
                  <h4>Specialties:</h4>
                  <ul>
                    {member.specialties.map((specialty, idx) => (
                      <li key={idx}>{specialty}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Certifications & Insurance */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Licensed, Insured & Certified</h2>
          <p className="section-subtitle">
            Your peace of mind is important to us. We maintain all necessary licenses, insurance, and certifications.
          </p>
          
          <div className="grid grid-3">
            <div className="card text-center">
              <div className="cert-icon">📜</div>
              <h3>Licensed Electrician</h3>
              <p>Fully licensed electrical contractor in the state of Minnesota</p>
            </div>
            
            <div className="card text-center">
              <div className="cert-icon">🛡️</div>
              <h3>Fully Insured</h3>
              <p>General liability and workers' compensation insurance coverage</p>
            </div>
            
            <div className="card text-center">
              <div className="cert-icon">✅</div>
              <h3>Bonded</h3>
              <p>Bonded contractor providing additional protection for our clients</p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="section" style={{ backgroundColor: 'var(--primary-blue)', color: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'white', marginBottom: '20px' }}>Ready to Work With Us?</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
              Join the line of satisfied customers who trust Up-Down-Lighting for their Christmas lighting needs.
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-secondary">Get Free Quote</Link>
              <a href="tel:6514979609" className="btn btn-secondary">Call (651) 497-9609</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
