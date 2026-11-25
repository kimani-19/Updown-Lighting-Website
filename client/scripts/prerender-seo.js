const fs = require('fs');
const path = require('path');
const locationPages = require('../src/locationPages.json');
const seoPages = require('../src/seoPages.json');

const buildDirectory = path.resolve(__dirname, '../build');
const template = fs.readFileSync(path.join(buildDirectory, 'index.html'), 'utf8');
const siteUrl = 'https://updownlighting.com';
const socialImage = `${siteUrl}/images/hero/team-installation-wide-banner.jpg`;
const locationPagesByPath = Object.fromEntries(
  Object.values(locationPages).map((page) => [page.path, page])
);
const pageMetadata = Object.fromEntries(
  Object.values(locationPages).map((page) => [
    page.path,
    { title: page.title, description: page.description },
  ])
);
const allPages = { ...seoPages, ...pageMetadata };

const escapeAttribute = (value) => value
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function replaceMeta(html, attribute, key, content) {
  const escapedKey = escapeRegExp(key);
  const tagPattern = new RegExp(
    `<meta\\s+${attribute}="${escapedKey}"\\s+content="[^"]*"\\s*\\/?>`,
    'i'
  );
  const tag = `<meta ${attribute}="${key}" content="${escapeAttribute(content)}"/>`;

  if (tagPattern.test(html)) {
    return html.replace(tagPattern, tag);
  }

  return html.replace('</head>', `  ${tag}\n</head>`);
}

function replaceCanonical(html, canonicalUrl) {
  const tag = `<link rel="canonical" href="${canonicalUrl}"/>`;
  const canonicalPattern = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i;

  return canonicalPattern.test(html)
    ? html.replace(canonicalPattern, tag)
    : html.replace('</head>', `  ${tag}\n</head>`);
}

function renderPage(templateHtml, { title, description, canonicalUrl }, locationPage) {
  let html = templateHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);

  html = replaceMeta(html, 'name', 'description', description);
  html = replaceMeta(html, 'property', 'og:title', title);
  html = replaceMeta(html, 'property', 'og:description', description);
  html = replaceMeta(html, 'property', 'og:url', canonicalUrl);
  html = replaceMeta(html, 'property', 'og:image', socialImage);
  html = replaceMeta(html, 'name', 'twitter:title', title);
  html = replaceMeta(html, 'name', 'twitter:description', description);
  html = replaceMeta(html, 'name', 'twitter:image', socialImage);

  html = replaceCanonical(html, canonicalUrl);

  if (locationPage) {
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${canonicalUrl}#service`,
      name: `Christmas light installation in ${locationPage.city}, Minnesota`,
      serviceType: 'Christmas light installation',
      description,
      provider: { '@id': `${siteUrl}/#business` },
      areaServed: {
        '@type': 'City',
        name: `${locationPage.city}, Minnesota`,
      },
      url: canonicalUrl,
    };
    const schemaScript = `<script type="application/ld+json" data-location-service-schema="true">${JSON.stringify(serviceSchema)}</script>`;
    html = html.replace('</head>', `  ${schemaScript}\n</head>`);
  }

  return html;
}

function writeRoutePage(route, html) {
  const outputDirectory = path.join(buildDirectory, route.replace(/^\/+|\/+$/g, ''));
  fs.mkdirSync(outputDirectory, { recursive: true });
  fs.writeFileSync(path.join(outputDirectory, 'index.html'), html);
}

for (const [route, metadata] of Object.entries(allPages)) {
  if (route === '/') continue;

  const canonicalUrl = `${siteUrl}${route}`;
  writeRoutePage(
    route,
    renderPage(template, { ...metadata, canonicalUrl }, locationPagesByPath[route])
  );
}

const privateHtml = renderPage(template, {
  title: 'Administrator Sign In | UpDown Lighting',
  description: 'Private administrator access for UpDown Lighting.',
  canonicalUrl: `${siteUrl}/admin`,
})
  .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, '')
  .replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i, '')
  .replace(/<meta\s+(?:property="og:[^"]+"|name="twitter:[^"]+")[^>]*\/?>/gi, '')
  .replace('</head>', '  <meta name="robots" content="noindex, nofollow"/>\n</head>');

writeRoutePage('/admin', privateHtml);
writeRoutePage('/admin/dashboard', privateHtml);

console.log(`Generated SEO metadata for ${Object.keys(allPages).length} public routes and administrator pages.`);
