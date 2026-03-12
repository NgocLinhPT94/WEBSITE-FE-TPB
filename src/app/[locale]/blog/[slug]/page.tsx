import { Metadata } from 'next';
import { unstable_setRequestLocale as setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Container, Heading, Text } from '@/components/ui';
import { blogPostService } from '@/services';
import { locales } from '@/config/i18n';
import Image from 'next/image';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export const revalidate = 600;

export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await blogPostService.getBlogPostBySlug(slug, locale);
  
  if (!post) {
    return {
      title: 'Not Found',
      description: 'Page not found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: post.coverImage?.url ? [post.coverImage.url] : [],
    },
  };
}

async function getBlogPost(slug: string, locale: string) {
  try {
    const post = await blogPostService.getBlogPostBySlug(slug, locale);
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await getBlogPost(slug, locale);

  if (!post) {
    notFound();
  }

  return (
    <Container>
      <article className="py-12">
        <header className="mb-8">
          <Heading level={1} className="mb-4">
            {post.title}
          </Heading>
          <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
            {post.author?.name && (
              <Text size="sm">By {post.author.name}</Text>
            )}
            <Text size="sm">
              {new Date(post.publishedAt).toLocaleDateString()}
            </Text>
          </div>
        </header>

        {post.coverImage?.url && (
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.coverImage.url}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <Text size="lg">{post.content}</Text>
        </div>
      </article>
    </Container>
  );
}
