import type { Metadata } from 'next';
import { Providers } from '~/providers';

export const metadata: Metadata = {
  title: 'NihongoCards - Flashcards de Japonés',
  description: 'Aplicación de flashcards para aprender vocabulario japonés con furigana',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='es'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
