'use client';

import { usePathname, useRouter } from 'next/navigation';
import { GearIcon } from '~/components/common/Icons';
import { SNav, SNavButton, SSettingsButton } from './Navigation.styles';

const routes = [
  { path: '/create', label: 'Crear' },
  { path: '/cards', label: 'Colección' },
  { path: '/study', label: 'Estudiar' },
];

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <SNav>
      {routes.map((route) => (
        <SNavButton key={route.path} $active={pathname === route.path} onClick={() => router.push(route.path)}>
          {route.label}
        </SNavButton>
      ))}
      <SSettingsButton $active={pathname === '/settings'} onClick={() => router.push('/settings')} aria-label='Ajustes'>
        <GearIcon size={36} />
      </SSettingsButton>
    </SNav>
  );
}
