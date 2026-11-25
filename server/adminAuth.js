const { createClient } = require('@supabase/supabase-js');

const createAdminSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseSecretKey) return null;

  return createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
};

const authorizeAdmin = async (supabase, authorizationHeader) => {
  if (!supabase) {
    return {
      status: 500,
      error: 'Supabase is not configured on the server.',
    };
  }

  const token = typeof authorizationHeader === 'string' &&
    authorizationHeader.startsWith('Bearer ')
    ? authorizationHeader.slice('Bearer '.length)
    : null;

  if (!token) {
    return { status: 401, error: 'Authentication required.' };
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) {
      return { status: 401, error: 'Invalid or expired session.' };
    }

    if (data.user.app_metadata?.role !== 'admin') {
      return { status: 403, error: 'Administrator access required.' };
    }

    return { user: data.user };
  } catch (error) {
    console.error('Admin authentication error:', error.message);
    return { status: 401, error: 'Invalid or expired session.' };
  }
};

module.exports = { createAdminSupabaseClient, authorizeAdmin };
