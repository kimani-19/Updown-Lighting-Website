const {
  authorizeAdmin,
  createAdminSupabaseClient,
} = require('../server/adminAuth');

module.exports = async (req, res) => {
  res.setHeader('Allow', 'GET');
  res.setHeader('Cache-Control', 'private, no-store, max-age=0');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const supabase = createAdminSupabaseClient();
  const authorization = await authorizeAdmin(
    supabase,
    req.headers.authorization
  );
  if (!authorization.user) {
    return res.status(authorization.status).json({ error: authorization.error });
  }

  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Admin contact query failed:', error.message);
      return res.status(500).json({ error: 'Unable to load contact messages.' });
    }

    return res.status(200).json(data || []);
  } catch (error) {
    console.error('Admin contact query failed:', error.message);
    return res.status(500).json({ error: 'Unable to load contact messages.' });
  }
};
