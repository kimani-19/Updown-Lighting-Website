import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/reviews');
        if (Array.isArray(response.data)) {
          const sorted = [...response.data].sort((a, b) => {
            const aTime = typeof a?.time === 'number' ? a.time : 0;
            const bTime = typeof b?.time === 'number' ? b.time : 0;
            return bTime - aTime;
          });
          setReviews(sorted);
          setCurrentIndex(0);
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
    const normalizedRating = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < normalizedRating) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else {
        stars.push(<span key={i} className="star">☆</span>);
      }
    }
    return stars;
  };

  const totalReviews = reviews.length;
  const currentReview = totalReviews > 0 ? reviews[currentIndex] : null;

  const goPrevious = () => {
    if (totalReviews <= 1) return;
    setCurrentIndex((idx) => (idx - 1 + totalReviews) % totalReviews);
  };

  const goNext = () => {
    if (totalReviews <= 1) return;
    setCurrentIndex((idx) => (idx + 1) % totalReviews);
  };

  return (
    <div className="google-reviews-section">
      <div className="reviews-title-row">
        <h2 className="section-title">What Our Clients Say</h2>
        <a
          className="btn btn-primary"
          href="/api/leave-review"
          target="_blank"
          rel="noreferrer"
        >
          Leave a Google Review
        </a>
      </div>
      {loading ? (
        <p>Loading reviews...</p>
      ) : error ? (
        <p>{error}</p>
      ) : currentReview ? (
        <>
          <div className="reviews-carousel" aria-label="Google reviews carousel">
            <button
              type="button"
              className="btn btn-secondary reviews-nav"
              onClick={goPrevious}
              disabled={totalReviews <= 1}
              aria-label="Previous review"
            >
              Prev
            </button>

            <div className="review-card">
              <div className="review-header">
                {currentReview.profile_photo_url ? (
                  <img
                    src={currentReview.profile_photo_url}
                    alt={currentReview.author_name || 'Reviewer'}
                    className="review-author-img"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : null}
                <div className="review-author-info">
                  <p className="review-author-name">{currentReview.author_name || 'Anonymous'}</p>
                  <div className="review-rating">{renderStars(currentReview.rating)}</div>
                </div>
              </div>
              <p className="review-text">{currentReview.text}</p>
              <p className="review-time">{currentReview.relative_time_description}</p>
            </div>

            <button
              type="button"
              className="btn btn-secondary reviews-nav"
              onClick={goNext}
              disabled={totalReviews <= 1}
              aria-label="Next review"
            >
              Next
            </button>
          </div>

          <p className="reviews-counter" aria-label="Review position">
            {currentIndex + 1} of {totalReviews}
          </p>
        </>
      ) : (
        <p>No reviews available at the moment.</p>
      )}
    </div>
  );
};

export default GoogleReviews;
