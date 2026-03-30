'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { GearIcon } from '~/components/common/Icons';
import { useLanguageStore } from '~/store/languageStore';
import { SLangButton, SNav, SNavButton, SSettingsButton } from './Navigation.styles';

export function Navigation() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage } = useLanguageStore();

  const routes = [
    { path: '/create', label: t('create') },
    { path: '/cards', label: t('collection') },
    { path: '/study', label: t('study') },
  ];

  const toggleLanguage = () => setLanguage(language === 'es' ? 'en' : 'es');

  return (
    <SNav>
      {routes.map((route) => (
        <SNavButton key={route.path} $active={pathname === route.path} onClick={() => router.push(route.path)}>
          {route.label}
        </SNavButton>
      ))}
      <SLangButton onClick={toggleLanguage} aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}>
        {language === 'es' ? 'EN' : 'ES'}
      </SLangButton>
      <SSettingsButton
        $active={pathname === '/settings'}
        onClick={() => router.push('/settings')}
        aria-label={t('settings')}
      >
        <GearIcon size={36} />
      </SSettingsButton>
    </SNav>
  );
}
