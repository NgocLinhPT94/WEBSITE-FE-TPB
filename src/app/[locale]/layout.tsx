export const dynamic = 'force-dynamic';

import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale as setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { locales, type Locale } from '@/config/i18n';
import { MainLayout } from '@/components/layout';

import './globals.css';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <MainLayout>{children}</MainLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
