'use client';

import { useMemo } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import en from '~/messages/en.json';
import es from '~/messages/es.json';
import { useLanguageStore } from '~/store/languageStore';

const messages = { en, es } as const;

export function IntlProvider({ children }: { children: React.ReactNode }) {
  const language = useLanguageStore((s) => s.language);
  const currentMessages = useMemo(() => messages[language], [language]);

  return (
    <NextIntlClientProvider locale={language} messages={currentMessages}>
      {children}
    </NextIntlClientProvider>
  );
}
