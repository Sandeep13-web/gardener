// pages/api/sitemap.js
import axios from 'axios';
import { createSitemap } from 'sitemap';

async function generateBlogListUrls() {
  const baseUrl = 'https://api.uat.ordering-iamthegardener-v4.ekbana.net/api/v4';
  const domainUrl = 'https://qa.ordering-iamthegardener-v4.ekbana.net';
  const apiKey = config.gateway.apiKey;

  try {
    const response = await axios.get(`${baseUrl}/blog?page=1&perPage=4`, {
      headers: {
        'Api-Key': apiKey,
      },
    });
    const products = response.data;
    const urls = products.data.map((product) => ({
      url: `${domainUrl}/blogs/${product.slug}`,
      changefreq: 'weekly',
      priority: 0.5,
    }));
    return urls;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default async function handler(req, res) {
  const baseUrl = 'https://api.uat.ordering-iamthegardener-v4.ekbana.net/api/v4';
  const dynamicUrls = await generateDynamicUrls();
  const blogListUrls = await generateBlogListUrls();
  console.log('All URLs:', blogListUrls );

  // Static URLs List
  const staticUrls = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/login', changefreq: 'weekly', priority: 0.8 },
    { url: '/offer', changefreq: 'weekly', priority: 0.8 },
    { url: '/login', changefreq: 'weekly', priority: 0.8 },
    { url: '/about-us', changefreq: 'weekly', priority: 0.8 },
    // Add more static URLs here based on your requirements
  ];

  // All dynamic and static URLs
  const allUrls = [...staticUrls, ...dynamicUrls, ...blogListUrls];
  console.log(allUrls)

  //Dynamic sitemap here
  const sitemap = createSitemap({
    hostname: baseUrl,
    urls: allUrls,
  });

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap.toString());
  res.end();
}

