import { Burger, Group, Header, MediaQuery, Title, Text } from '@mantine/core';
import s from './HeaderLayout.module.scss';

import AflLogoIcon from '@/public/icons/afl-logo.svg';

export default function HeaderLayout({ menuOpened, setMenuOpened }: { menuOpened: boolean; setMenuOpened: (o: boolean) => void }) {
  return (
    <>
      <Header height={70} p="sm" className={s.header}>
        <Group>
          <MediaQuery largerThan="lg" styles={{ display: 'none' }}>
            <Burger opened={menuOpened} onClick={() => setMenuOpened(!menuOpened)} size="sm" mr="xl" className={s.headerBurgrer} />
          </MediaQuery>
          <div className={s.headerLogo}>
            <AflLogoIcon fill={'#fff'} width={60} height={60} />
          </div>
          <Title order={3} className={s.headerTitle}>
            <Text size={'xs'} style={{ display: 'inline' }}></Text>
          </Title>
        </Group>
      </Header>
    </>
  );
}
