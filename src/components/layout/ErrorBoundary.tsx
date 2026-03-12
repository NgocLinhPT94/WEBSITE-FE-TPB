'use client';

import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useTranslations } from 'next-intl';
import { Button, Heading, Text, Container } from '@/components/ui';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const t = useTranslations('errors');

  return (
    <Container className="flex min-h-screen flex-col items-center justify-center text-center">
      <Heading level={1} className="mb-4">
        {t('serverError')}
      </Heading>
      <Text variant="muted" className="mb-8 max-w-md">
        {error instanceof Error ? error.message : t('serverError')}
      </Text>
      <Button onClick={resetErrorBoundary}>{t('retry')}</Button>
    </Container>
  );
}

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
