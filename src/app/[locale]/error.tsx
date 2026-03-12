'use client';

import { useEffect } from 'react';
import { Button, Heading, Text, Container } from '@/components/ui';
import { useTranslations } from 'next-intl';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('errors');

  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <Container className="flex min-h-screen flex-col items-center justify-center text-center">
          <Heading level={1} className="mb-4">
            {t('serverError')}
          </Heading>
          <Text variant="muted" className="mb-8 max-w-md">
            {error.message || t('serverError')}
          </Text>
          <Button onClick={reset}>{t('retry')}</Button>
        </Container>
      </body>
    </html>
  );
}
