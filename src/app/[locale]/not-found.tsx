import { notFound } from 'next/navigation';
import { Button, Heading, Text, Container } from '@/components/ui';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFound() {
  const t = useTranslations('errors');

  return (
    <Container className="flex min-h-screen flex-col items-center justify-center text-center">
      <Heading level={1} className="mb-4">
        {t('notFound')}
      </Heading>
      <Text variant="muted" className="mb-8">
        {t('notFound')}
      </Text>
      <Link href="/">
        <Button>{t('backToHome')}</Button>
      </Link>
    </Container>
  );
}
