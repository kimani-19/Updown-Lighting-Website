import React, { useCallback, useEffect, useRef, useState } from 'react';

const WRITE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJ19uOFe_TRQsR-y0rXt2k7mQ';
const VIEW_REVIEWS_URL = 'https://maps.google.com/?cid=7272931718924545531';

const GoogleMark = ({ className = '' }) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    aria-hidden="true"
    focusable="false"
  >
    <path fill="#4285F4" d="M43.6 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11.1c-.5 2.7-2 5-4.3 6.5v5.3h7c4.1-3.8 6.8-9.3 6.8-15.8z" />
    <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-7-5.3c-1.8 1.2-4 2-6.5 2-5 0-9.3-3.4-10.8-8H6v5.5C9.4 39.7 16.2 44 24 44z" />
    <path fill="#FBBC05" d="M13.2 28c-.4-1.2-.7-2.6-.7-4s.3-2.8.7-4v-5.5H6C4.5 17.4 3.7 20.6 3.7 24s.8 6.6 2.3 9.5l7.2-5.5z" />
    <path fill="#EA4335" d="M24 12c3 0 5.7 1 7.8 3.1l6-6C34.1 5.7 29.5 4 24 4 16.2 4 9.4 8.3 6 14.5l7.2 5.5c1.5-4.6 5.8-8 10.8-8z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <path d="M11 3h6v6M17 3 9 11M15 11v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
  </svg>
);

const MessageIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5 8 8 0 0 1-3.6-.9L4 20l1.9-4.5a7.5 7.5 0 1 1 14.1-4Z" />
    <path d="M8.5 11.5h.01M12.5 11.5h.01M16.5 11.5h.01" />
  </svg>
);

const ArrowIcon = ({ direction }) => (
  <svg
    viewBox="0 0 20 20"
    aria-hidden="true"
    focusable="false"
    className={direction === 'next' ? 'gr-arrow-icon is-next' : 'gr-arrow-icon'}
  >
    <path d="M12.5 4.5 7 10l5.5 5.5M7.5 10h9" />
  </svg>
);

const ReviewStars = ({ rating }) => {
  const hasRating = typeof rating === 'number' && Number.isFinite(rating);
  const value = hasRating ? Math.max(0, Math.min(5, rating)) : 0;

  return (
    <span
      className="gr-stars"
      role="img"
      aria-label={hasRating ? `${value.toFixed(1)} out of 5 stars` : 'Rating unavailable'}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < Math.round(value) ? 'is-filled' : ''}>
          ★
        </span>
      ))}
    </span>
  );
};

const getInitials = (name) => {
  const words = (name || 'Anonymous').trim().split(/\s+/).filter(Boolean);
  return words.slice(0, 2).map((word) => word[0].toUpperCase()).join('') || 'A';
};

const ReviewerAvatar = ({ name, photoUrl }) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <span className="gr-reviewer-avatar">
      {photoUrl && !imageFailed ? (
        <img
          src={photoUrl}
          alt={`Google reviewer ${name || 'profile'}`}
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span aria-hidden="true">{getInitials(name)}</span>
      )}
    </span>
  );
};

const formatReviewDate = (review) => {
  const timestamp = Number(review.time);
  if (Number.isFinite(timestamp) && timestamp > 0) {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(timestamp * 1000));
  }
  return review.relative_time_description || 'Date unavailable';
};

const GoogleReviews = ({ reviewData, loading, error }) => {
  const reviews = Array.isArray(reviewData?.reviews) ? reviewData.reviews : [];
  const rating = typeof reviewData?.rating === 'number' ? reviewData.rating : null;
  const reviewCount = typeof reviewData?.userRatingCount === 'number'
    ? reviewData.userRatingCount
    : null;
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState({});
  const reviewsTrackRef = useRef(null);

  const updateCarouselControls = useCallback(() => {
    const track = reviewsTrackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanScrollPrevious(track.scrollLeft > 2);
    setCanScrollNext(track.scrollLeft < maxScroll - 2);
  }, []);

  useEffect(() => {
    const track = reviewsTrackRef.current;
    if (!track) return undefined;

    updateCarouselControls();
    window.addEventListener('resize', updateCarouselControls);
    return () => window.removeEventListener('resize', updateCarouselControls);
  }, [reviews.length, updateCarouselControls]);

  const scrollReviews = (direction) => {
    const track = reviewsTrackRef.current;
    if (!track) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({
      left: direction * track.clientWidth,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  const toggleReviewText = (index) => {
    setExpandedReviews((expanded) => ({
      ...expanded,
      [index]: !expanded[index],
    }));
  };

  const formattedRating = rating === null ? '—' : rating.toFixed(1);
  const formattedReviewCount = reviewCount === null
    ? '—'
    : new Intl.NumberFormat('en-US').format(reviewCount);

  return (
    <section
      id="google-reviews"
      className="google-reviews-section"
      aria-labelledby="gr-heading"
    >
      <div className="gr-container">
        <header className="gr-heading">
          <span className="gr-eyebrow">Our Reputation</span>
          <h2 id="gr-heading">Exceptional Service. Trusted Results.</h2>
          <p>
            Our commitment to quality, reliability and customer satisfaction is reflected
            in the experiences of those we serve.
          </p>
        </header>

        <div className="gr-reputation-summary">
          <div className="gr-summary-rating">
            <div className="gr-google-label">
              <GoogleMark className="gr-google-mark" />
              <span>Google Reviews</span>
            </div>
            <div className="gr-rating-details">
              <strong className="gr-rating-number">{formattedRating}</strong>
              <div>
                <ReviewStars rating={rating} />
                <p className="gr-review-count">
                  {formattedReviewCount} customer reviews
                </p>
              </div>
            </div>
          </div>

          <div className="gr-summary-actions">
            <a
              className="gr-write-button"
              href={WRITE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Write a Review
              <ExternalLinkIcon />
            </a>
            <a
              className="gr-view-link"
              href={VIEW_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              View All Google Reviews
              <ExternalLinkIcon />
            </a>
          </div>
        </div>

        {loading ? (
          <p className="gr-status" role="status">Loading customer reviews…</p>
        ) : error ? (
          <p className="gr-status" role="alert">
            Google reviews are temporarily unavailable. Please visit Google to read them.
          </p>
        ) : reviews.length === 0 ? (
          <p className="gr-status" role="status">No written reviews are available right now.</p>
        ) : (
          <>
            <div className="gr-carousel-toolbar">
              <span className="gr-carousel-label">Customer experiences</span>
              <div className="gr-carousel-controls">
                <button
                  type="button"
                  className="gr-carousel-button"
                  onClick={() => scrollReviews(-1)}
                  disabled={!canScrollPrevious}
                  aria-label="Show previous reviews"
                >
                  <ArrowIcon direction="previous" />
                </button>
                <button
                  type="button"
                  className="gr-carousel-button"
                  onClick={() => scrollReviews(1)}
                  disabled={!canScrollNext}
                  aria-label="Show more reviews"
                >
                  <ArrowIcon direction="next" />
                </button>
              </div>
            </div>

            <div
              className="gr-reviews-track"
              ref={reviewsTrackRef}
              onScroll={updateCarouselControls}
              role="region"
              aria-label="Google customer reviews"
              aria-roledescription="carousel"
              tabIndex="0"
            >
              {reviews.map((review, index) => {
                const authorName = review.author_name || 'Anonymous';
                const reviewText = review.text || '';
                const isExpanded = Boolean(expandedReviews[index]);
                const canExpand = reviewText.length > 240;

                return (
                  <article
                    className="gr-review-card"
                    key={`${index}-${authorName}`}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Review ${index + 1} of ${reviews.length}`}
                  >
                    <div className="gr-review-card-top">
                      <ReviewStars rating={review.rating} />
                      <svg
                        className="gr-quote-mark"
                        viewBox="0 0 40 32"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M4 28V17C4 8 9 3 17 2v5c-4 1-6 3-6 7h6v14H4Zm19 0V17c0-9 5-14 13-15v5c-4 1-6 3-6 7h6v14H23Z" />
                      </svg>
                    </div>

                    <div className="gr-review-copy">
                      <p className={`gr-review-text${isExpanded ? ' is-expanded' : ''}`}>
                        {reviewText || 'No written comment provided.'}
                      </p>
                      {canExpand && (
                        <button
                          type="button"
                          className="gr-expand-button"
                          onClick={() => toggleReviewText(index)}
                          aria-expanded={isExpanded}
                        >
                          {isExpanded ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </div>

                    <footer className="gr-reviewer">
                      <ReviewerAvatar name={authorName} photoUrl={review.profile_photo_url} />
                      <div className="gr-reviewer-details">
                        {review.author_url ? (
                          <a
                            href={review.author_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {authorName}
                          </a>
                        ) : (
                          <strong>{authorName}</strong>
                        )}
                        <span>{formatReviewDate(review)}</span>
                      </div>
                      <span className="gr-attribution">
                        <GoogleMark className="gr-attribution-mark" />
                        Google review
                      </span>
                    </footer>
                  </article>
                );
              })}
            </div>
          </>
        )}

        <div className="gr-feedback">
          <div>
            <h3>Your Experience Matters.</h3>
            <p>
              Worked with our team? We welcome your feedback and appreciate the
              opportunity to serve you.
            </p>
          </div>
          <a
            className="gr-feedback-button"
            href={WRITE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageIcon />
            Share Your Experience
            <ExternalLinkIcon />
          </a>
        </div>
      </div>
    </section>
  );
};

export { GoogleMark };
export default GoogleReviews;
