/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "assets.uat.ordering-iamthegardener-v4.ekbana.net", 
      "api.uat.ordering-iamthegardener-v4.ekbana.net", 
      "assets.qa.ordering-iamthegardener-v4.ekbana.net", 
      "qa.ordering-iamthegardener.ekbana.net", 
      'api.uat.ordering-merokishan.ekbana.net', 
      "assets.iamthegardener.com",
      "https://assets.iamthegardener.com/",
  ],
  },
};

module.exports = nextConfig;
