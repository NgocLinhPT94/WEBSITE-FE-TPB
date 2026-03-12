import { Metadata } from 'next';
import { unstable_setRequestLocale as setRequestLocale } from 'next-intl/server';
import { Container, Heading, Text, Button } from '@/components/ui';
import { blogPostService } from '@/services';
import { locales } from '@/config/i18n';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: {
      default: 'Blog',
      template: '%s | Blog',
    },
    description: 'Latest news and updates',
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

async function getBlogPosts(locale: string) {
  try {
    const result = await blogPostService.getBlogPosts(locale, {
      page: 1,
      pageSize: 6,
      sort: 'publishedAt:desc',
    });
    return result.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = await getBlogPosts(locale);

  return (
    <Container>
      <section className="py-12">
        <Heading level={1} className="mb-4">
          Blog
        </Heading>
        <Text variant="muted" className="mb-12 max-w-2xl">
          Latest news and updates from our team.
        </Text>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                {post.coverImage?.url && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.coverImage.url}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <Heading level={3} className="mb-2 line-clamp-2">
                    {post.title}
                  </Heading>
                  <Text variant="muted" size="sm" className="mb-4 line-clamp-3">
                    {post.excerpt}
                  </Text>
                  <div className="flex items-center justify-between">
                    <Text size="sm" variant="muted">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </Text>
                    <Link href={`/blog/${post.slug}`}>
                      <Button size="sm">Read more</Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Text variant="muted">No posts found.</Text>
          </div>
        )}
      </section>
    </Container>
  );
}
