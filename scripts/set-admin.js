const path = require('path');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

dotenv.config({ path: path.resolve(__dirname, '../server/.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const email = process.argv[2]?.trim().toLowerCase();

if (!email) {
  console.error('Usage: npm run set-admin -- <email>');
  process.exit(1);
}

const supabaseUrl = process.env.SUPABASE_URL;
const secretKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !secretKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SECRET_KEY in server/.env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, secretKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

async function findUserByEmail(targetEmail) {
  let page = 1;

  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage: 100,
    });

    if (error) throw error;

    const user = data.users.find(
      (candidate) => candidate.email?.toLowerCase() === targetEmail
    );
    if (user) return user;

    if (data.users.length < 100) return null;
    page += 1;
  }
}

async function setAdmin() {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      console.error(`No Supabase user found for ${email}`);
      process.exit(1);
    }

    const { data, error } = await supabase.auth.admin.updateUserById(
      user.id,
      {
        app_metadata: {
          ...user.app_metadata,
          role: 'admin',
        },
      }
    );

    if (error) throw error;

    console.log(`Admin role set for ${data.user.email}`);
  } catch (error) {
    console.error('Unable to set admin role:', error.message || error);
    process.exit(1);
  }
}

setAdmin();
