import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/reviews');
        if (Array.isArray(response.data)) {
          setReviews(response.data);
        } else {
          setError('Could not load reviews at this time.');
          console.error('Received non-array response for reviews:', response.data);
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        const serverError = err.response && err.response.data ? err.response.data.error : 'Failed to fetch reviews.';
        const errorDetails = err.response && err.response.data ? err.response.data.details : null;
        
        let displayError = serverError;
        if (errorDetails) {
          try {
            const parsedDetails = JSON.parse(errorDetails);
            if(parsedDetails.error_message) {
              displayError = `Error from Google: ${parsedDetails.error_message}`;
            }
          } catch (e) {
            // Ignore if parsing fails
          }
        }
        
        setError(displayError);
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
      ) : error ? (
        <p>{error}</p>
      ) : reviews.length > 0 ? (
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
      ) : (
        <p>No reviews available at the moment.</p>
      )}
    </div>
  );
};

export default GoogleReviews;
