const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.API_KEY;
  const placeId = process.env.PLACE_ID;

  if (!apiKey || !placeId) {
    return res.status(500).json({
      error: 'API key or Place ID is not configured on the server.',
      details: 'Missing API_KEY and/or PLACE_ID env vars.',
    });
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
    placeId
  )}&fields=name,rating,reviews&key=${encodeURIComponent(apiKey)}`;

  try {
    const response = await axios.get(url, { timeout: 10_000 });

    if (response.data?.result?.reviews && Array.isArray(response.data.result.reviews)) {
      res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=86400');
      return res.status(200).json(response.data.result.reviews);
    }

    return res.status(500).json({
      error: 'Failed to process reviews from Google.',
      details: response.data,
    });
  } catch (error) {
    const details = error.response ? error.response.data : error.message;
    return res.status(500).json({
      error: 'Failed to fetch reviews from Google.',
      details,
    });
  }
};
