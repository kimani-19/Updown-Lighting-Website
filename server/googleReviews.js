const axios = require('axios');

const FIELD_MASK = 'displayName,rating,userRatingCount,reviews,googleMapsUri';

const getText = (value) => (
  typeof value === 'string' ? value : value?.text || ''
);

const normalizeReview = (review) => {
  const publishedAt = Date.parse(review?.publishTime || '');

  return {
    author_name: review?.authorAttribution?.displayName || 'Anonymous',
    profile_photo_url: review?.authorAttribution?.photoUri || null,
    author_url: review?.authorAttribution?.uri || null,
    rating: review?.rating ?? 0,
    text: getText(review?.text) || getText(review?.originalText),
    relative_time_description: review?.relativePublishTimeDescription || '',
    time: Number.isFinite(publishedAt) ? Math.floor(publishedAt / 1000) : 0,
  };
};

const fetchGoogleReviews = async ({ apiKey, placeId }) => {
  const response = await axios.get(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
    {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': FIELD_MASK,
      },
      timeout: 10_000,
    }
  );

  const place = response.data || {};
  const reviews = place.reviews ?? [];
  if (!Array.isArray(reviews)) {
    throw new Error('Google Places API returned an invalid reviews list.');
  }

  return {
    rating: typeof place.rating === 'number' ? place.rating : null,
    userRatingCount: typeof place.userRatingCount === 'number'
      ? place.userRatingCount
      : null,
    googleMapsUri: place.googleMapsUri || null,
    reviews: reviews.map(normalizeReview),
  };
};

module.exports = { fetchGoogleReviews };
