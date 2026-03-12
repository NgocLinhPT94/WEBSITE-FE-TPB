'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

export function Header() {
  const t = useTranslations('common');
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/blog', label: t('blog') },
    { href: '/contact', label: t('contact') },
  ];

  const switchLocale = useCallback((newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  }, [pathname]);

  const getLocaleFromPathname = useCallback(() => {
    const segments = pathname.split('/');
    return segments[1] || 'en';
  }, [pathname]);

  const currentLocale = getLocaleFromPathname();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <Container>
        <nav className="flex items-center justify-between h-16">
          <a href="/" className="text-xl font-bold text-primary-600">
            Enterprise
          </a>
          <ul className="flex items-center space-x-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <div className="flex items-center space-x-2">
                <a
                  href={switchLocale('en')}
                  className={`px-2 py-1 rounded ${
                    currentLocale === 'en'
                      ? 'bg-primary-100 text-primary-600'
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  EN
                </a>
                <a
                  href={switchLocale('vi')}
                  className={`px-2 py-1 rounded ${
                    currentLocale === 'vi'
                      ? 'bg-primary-100 text-primary-600'
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  VI
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
