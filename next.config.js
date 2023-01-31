/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        source: '/(.*)?', // Matches all pages
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(),fullscreen=self'
          },
          {
            key: 'Content-Security-Policy',
            value: `object-src 'none'; frame-ancestors 'none'` //The object-src directive is set to 'none' to prevent plugins from being loaded.
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
