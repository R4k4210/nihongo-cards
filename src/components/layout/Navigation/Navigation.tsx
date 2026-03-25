'use client';

import { usePathname, useRouter } from 'next/navigation';
import { SNav, SNavButton } from './Navigation.styles';

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
    </SNav>
  );
}
