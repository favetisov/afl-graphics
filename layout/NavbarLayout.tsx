import { Avatar, Badge, Divider, Group, Indicator, Navbar, ScrollArea, Text, Title, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import { BallFootball as BallIcon } from 'tabler-icons-react';
import { News as NewsIcon } from 'tabler-icons-react';
import { Photo as PhotoIcon } from 'tabler-icons-react';
import { Users as UsersIcon } from 'tabler-icons-react';
import { ReportMoney as MoneyIcon } from 'tabler-icons-react';
import { ChartArea as ChartIcon } from 'tabler-icons-react';
import { ArrowsExchange as TransferIcon } from 'tabler-icons-react';
import { Trophy as TrophyIcon } from 'tabler-icons-react';
import { UserOff as DisqualIcon } from 'tabler-icons-react';
import { User as UserIcon } from 'tabler-icons-react';
import s from './NavbarLayout.module.scss';
// import UserPhoto from '@shared-components/UserPhoto/UserPhoto';
// import { useRolesDataStore } from '@store/data/roles.data.store';

export const NavbarLayout = ({ opened }: { opened: boolean }) => {
  // const userUiStore = useUserUiStore();
  // const rolesDataStore = useRolesDataStore();
  // useSwr('access-requests', () => rolesDataStore.loadAccessRequests());

  const menuSections = [
    // {
    //   label: (
    //     <div className={s.navbarDividerTitle}>
    //       <BallIcon />
    //       <Text size={'xs'}>Games</Text>
    //     </div>
    //   ),
    //   items: [{ title: 'Games', href: '/games' }],
    // },
    // {
    //   label: (
    //     <div className={s.navbarDividerTitle}>
    //       <TrophyIcon />
    //       <Text size={'xs'}>Tournaments</Text>
    //     </div>
    //   ),
    //   items: [
    //     { title: 'Countries', href: '/countries', inactive: true },
    //     { title: 'Stadiums', href: '/stadiums' },
    //     // { title: 'Documents', href: '/documents' },
    //     // { title: 'Teams', href: '/teams' },
    //   ],
    // },
    // {
    //   label: (
    //     <div className={s.navbarDividerTitle}>
    //       <TransferIcon />
    //       <Text size={'xs'}>Transfers</Text>
    //     </div>
    //   ),
    //   items: [
    //     {
    //       title: (
    //         <Group>
    //           <Text size={'xs'}>Transfer requests</Text>
    //           {/*<Badge size={'sm'}>3</Badge>*/}
    //         </Group>
    //       ),
    //       href: '/transfers',
    //     },
    //   ],
    // },
    // {
    //   label: (
    //     <div className={s.navbarDividerTitle}>
    //       <UsersIcon />
    //       <Text size={'xs'}>Teams</Text>
    //     </div>
    //   ),
    //   items: [
    //     { title: 'Teams', href: '/teams' },
    //     // { title: 'Logos', href: '/logos' },
    //   ],
    // },
    // {
    //   label: (
    //     <div className={s.navbarDividerTitle}>
    //       <NewsIcon />
    //       <Text size={'xs'}>News</Text>
    //     </div>
    //   ),
    //   items: [{ title: 'News', href: '/news' }],
    // },

    // {
    //   label: (
    //     <div className={s.navbarDividerTitle}>
    //       <DisqualIcon />
    //       <Text size={'xs'}>Disqualifications</Text>
    //     </div>
    //   ),
    //   items: [
    //     { title: 'Diqualifications', href: '/disqualifications' },
    //     { title: 'Blacklist', href: '/blacklist' },
    //   ],
    // },
    {
      label: (
        <div className={s.navbarDividerTitle}>
          <PhotoIcon />
          <Text size={'xs'}>Infographics</Text>
        </div>
      ),
      items: [
        { title: 'Stats', href: '/igraphics/stats' },
        { title: 'Video', href: '/igraphics/video' },
        { title: 'Social', href: '/igraphics/social' },
      ],
    },
    // {
    //   label: (
    //     <div className={s.navbarDividerTitle}>
    //       <MoneyIcon />
    //       <Text size={'xs'}>Advertising</Text>
    //     </div>
    //   ),
    //   items: [
    //     { title: 'Banners', href: '/banners' },
    //   ],
    // },
    // {
    //   label: (
    //     <div className={s.navbarDividerTitle}>
    //       <ChartIcon />
    //       <Text size={'xs'}>Reports</Text>
    //     </div>
    //   ),
    //   items: [
    //     { title: 'Games', href: '/report_games' },
    //     { title: 'Players', href: '/report_players' },
    //     { title: 'Teams', href: '/report_teams' },
    //     { title: 'Staff', href: '/report_staff' },
    //   ],
    // },
  ];

  // if (userUiStore.authPair?.user?.roles.some(r => r.level == 'root' || r.level == 'head')) {
  //   menuSections.unshift({
  //     label: (
  //       <div className={s.navbarDividerTitle}>
  //         <UserIcon />
  //         <Text size={'xs'}>Admin</Text>
  //       </div>
  //     ),
  //     items: [
  //       {
  //         title: (
  //           <Group>
  //             <Text>User Roles</Text>
  //             {rolesDataStore.accessRequests?.length && <Badge size={'sm'}>{rolesDataStore.accessRequests?.length}</Badge>}
  //           </Group>
  //         ),
  //         href: '/user',
  //       },
  //       {
  //         title: (
  //           <Group>
  //             <Text>Cities</Text>
  //             {rolesDataStore.accessRequests?.length && <Badge size={'sm'}>{rolesDataStore.accessRequests?.length}</Badge>}
  //           </Group>
  //         ),
  //         href: '/cities',
  //       },
  //     ],
  //   });
  // }

  return (
    <Navbar hiddenBreakpoint="lg" hidden={!opened} width={{ sm: 270, lg: 270 }} className={s.navbar} px={'md'}>
      <Navbar.Section py={'md'} className={s.userSection}>
        {/*<a href={'/user/' + userUiStore.authPair.user?._id}>*/}
        {/*  <Group>*/}
        {/*    <Indicator inline size={22} position="top-end" color="red" withBorder label={'3'} disabled={true}>*/}
        {/*      <UserPhoto user={userUiStore.authPair.user || new User({})} height={60} />*/}
        {/*      /!*  <Avatar src={null} alt="no image here" size={'lg'} className={s.navbarAvatar} radius={'xl'} />*!/*/}
        {/*    </Indicator>*/}
        {/*    <div>*/}
        {/*      <Title order={5}>{userUiStore.authPair.user?.name || 'No user name'}</Title>*/}
        {/*      <Text size={'xs'}>{userUiStore.authPair?.user?.login}</Text>*/}
        {/*    </div>*/}
        {/*  </Group>*/}
        {/*</a>*/}
      </Navbar.Section>
      <Divider />

      <Navbar.Section grow component={ScrollArea} scrollbarSize={4} pt={'sm'}>
        {menuSections.map((section, idx) => (
          <div key={'section' + idx}>
            <Divider variant={'dashed'} label={section.label} my={'xs'} />
            {section.items.map(i => (
              <UnstyledButton key={i.href} className={s.navbarMenuButton} p={'sm'}>
                <Link href={i.href}>
                  <Text size={'xs'}>{i.title}</Text>
                </Link>
              </UnstyledButton>
            ))}
          </div>
        ))}
      </Navbar.Section>
    </Navbar>
  );
};
