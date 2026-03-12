import { Metadata } from 'next';
import { env } from '@/lib/config';

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
  locale?: string;
}

export function generateMetadata({
  title,
  description,
  image,
  url,
  type = 'website',
  locale = 'en',
}: SeoProps): Metadata {
  const siteName = env.siteUrl.replace(/^https?:\/\//, '');
  const defaultTitle = title ? `${title} | ${siteName}` : siteName;

  return {
    title: defaultTitle,
    description,
    openGraph: {
      title: defaultTitle,
      description,
      type,
      url: url ? `${env.siteUrl}${url}` : env.siteUrl,
      siteName: siteName,
      images: image
        ? [
            {
              url: image.startsWith('http') ? image : `${env.siteUrl}${image}`,
              width: 1200,
              height: 630,
            },
          ]
        : [],
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: defaultTitle,
      description,
      images: image ? [image] : [],
    },
    alternates: {
      canonical: url ? `${env.siteUrl}${url}` : env.siteUrl,
      languages: {
        en: `${env.siteUrl}/en${url ?? ''}`,
        vi: `${env.siteUrl}/vi${url ?? ''}`,
      },
    },
  };
}

export function generateJsonLd({
  type,
  data,
}: {
  type: 'Organization' | 'WebSite' | 'Article' | 'BreadcrumbList';
  data: Record<string, unknown>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };
}
