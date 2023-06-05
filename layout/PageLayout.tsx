import { AppShell, Text } from '@mantine/core';
import { useState } from 'react';

import HeaderLayout from './HeaderLayout';
import { NavbarLayout } from './NavbarLayout';
import s from './PageLayout.module.scss';

export const PageLayout = ({ children }: any) => {
  const [navbarOpened, setNavbarOpened] = useState(false);

  return (
    <span className={s.main}>
      <AppShell
        fixed
        navbarOffsetBreakpoint="lg"
        header={<HeaderLayout menuOpened={navbarOpened} setMenuOpened={setNavbarOpened} />}
        navbar={<NavbarLayout opened={navbarOpened} />}
      >
        <Text className={s.contentInner} px={'xs'}>
          {children}
        </Text>
      </AppShell>
    </span>
  );
};
