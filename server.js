require('isomorphic-fetch');
const next = require('next');
const routes = require('./routes');
const isDev = process.env.NODE_ENV !== 'production';
const app = next({ dev: isDev });
const handler = routes.getRequestHandler(app);
const port = process.env.PORT || 3000;
const url = require('url');
const { join } = require('path');

const staticFiles = ['/img/fefaq-cover-facebook.png'];

const favicons = [
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/manifest.json',
  '/safari-pinned-tab.svg',
  '/splash-iphone-8.png',
  '/mstile-144x144.png',
  '/android-chrome-512x512.png',
  '/android-chrome-192x192.png',
];

function getPathname(req) {
  const { pathname } = url.parse(req.url);
  return pathname;
}

function getPathForStaticResource(pathname) {
  if (favicons.includes(pathname)) {
    return join(__dirname, 'static', 'favicons', pathname);
  } else if (staticFiles.includes(pathname)) {
    return join(__dirname, 'static', pathname);
  } else if (pathname === '/robots.txt') {
    return join(__dirname, 'static', isDev ? 'robots.dev.txt' : 'robots.prod.txt');
  }
}

function generateSitemap(req) {
  const sm = require('sitemap');

  const { hostname } = req;
  const urls = [
    { url: '/', changefreq: 'hourly', priority: 1 },
    { url: '/questions', changefreq: 'hourly', priority: 0.9 },
    { url: '/questions/html', changefreq: 'hourly', priority: 0.6 },
    { url: '/questions/js', changefreq: 'hourly', priority: 0.6 },
    { url: '/questions/css', changefreq: 'hourly', priority: 0.6 },
    { url: '/questions/react', changefreq: 'hourly', priority: 0.6 },
    { url: '/questions/angular', changefreq: 'hourly', priority: 0.6 },
    { url: '/questions/git', changefreq: 'hourly', priority: 0.6 },
    { url: '/questions/other', changefreq: 'hourly', priority: 0.6 },
    { url: '/selected-questions', changefreq: 'weekly', priority: 0.3 },
    { url: '/about', changefreq: 'weekly', priority: 0.5 },
    { url: '/authors', changefreq: 'weekly', priority: 0.5 },
    { url: '/regulations', changefreq: 'monthly', priority: 0.1 },
  ];

  const sitemap = sm.createSitemap({
    hostname: `https://${hostname}`,
    cacheTime: 600000,
    urls,
  });

  return sitemap.toString();
}

// With express
const express = require('express');
app.prepare().then(() => {
  express()
    .use((req, res, next) => {
      const pathname = getPathname(req);

      if (pathname === '/sitemap.xml') {
        const sitemap = generateSitemap(req);
        return res.header('Content-Type', 'application/xml').send(sitemap);
      }
      const staticPath = getPathForStaticResource(pathname);
      if (staticPath) {
        return app.serveStatic(req, res, staticPath);
      }
      generateSitemap(req);
      return handler(req, res, next);
    })
    .listen(port, () => console.log('Server listening at localhost:3000'));
});
