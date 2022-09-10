/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    const pages = ['home', 'sacup', 'cansat', 'cubesat', 'archangel', 'contact', 'about'];
    const redirects = pages.map((page) => `/${page}/index.html`);
    const redirectObjects = [];
    redirects.forEach((redirect, i) => {
      redirectObjects.push({
        source: `/${pages[i]}`,
        destination: redirect,
        permanent: true,
      });
    });
    return [
      {
        source: '/',
        destination: '/home/index.html',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/posts',
        permanent: true,
      },
      ...redirectObjects,
    ]
  }
}

module.exports = nextConfig
