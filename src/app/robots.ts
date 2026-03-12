import { MetadataRoute } from 'next';
import { env } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = env.siteUrl;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
