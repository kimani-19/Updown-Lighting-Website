import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else {
        stars.push(<span key={i} className="star">☆</span>);
      }
    }
    return stars;
  };

  return (
    <div className="google-reviews-section">
      <h2 className="section-title">What Our Clients Say</h2>
      {loading ? (
        <p>Loading reviews...</p>
      ) : (
        <div className="reviews-container">
          {reviews.map((review) => (
            <div key={review.time} className="review-card">
              <div className="review-header">
                <img src={review.profile_photo_url} alt={review.author_name} className="review-author-img" />
                <div className="review-author-info">
                  <p className="review-author-name">{review.author_name}</p>
                  <div className="review-rating">{renderStars(review.rating)}</div>
                </div>
              </div>
              <p className="review-text">{review.text}</p>
              <p className="review-time">{review.relative_time_description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GoogleReviews;
