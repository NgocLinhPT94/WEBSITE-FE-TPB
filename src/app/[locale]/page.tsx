import { Metadata } from 'next';
import { unstable_setRequestLocale as setRequestLocale } from 'next-intl/server';
import { Container, Heading, Text } from '@/components/ui';
import { locales } from '@/config/i18n';

type Props = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: {
      default: 'Ngân hàng TMCP TPBank',
      template: '%s | Website TPBank',
    },
    description: 'Trang chủ Khách hàng cá nhân',
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Container>
      <section className="py-20 text-center">
        <Heading level={1} className="mb-4">
          Welcome to Our Enterprise
        </Heading>
        <Text size="lg" variant="muted" className="max-w-2xl mx-auto mb-8">
          Building the future together with innovative solutions for your business.
        </Text>
      </section>

      <section className="py-16">
        <Heading level={2} className="mb-8 text-center">
          Our Features
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Scalable Solutions', 'Enterprise Security', '24/7 Support'].map((feature) => (
            <div key={feature} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Heading level={3} className="mb-2">
                {feature}
              </Heading>
              <Text variant="muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
