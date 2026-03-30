module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).send('Method Not Allowed');
  }

  const placeId = process.env.PLACE_ID;

  if (!placeId) {
    return res.status(500).send('PLACE_ID is not configured on the server.');
  }

  const reviewUrl = `https://search.google.com/local/writereview?placeid=${encodeURIComponent(
    placeId
  )}`;

  res.statusCode = 302;
  res.setHeader('Location', reviewUrl);
  res.end();
};
