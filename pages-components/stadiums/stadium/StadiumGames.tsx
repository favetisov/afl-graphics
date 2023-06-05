import { Stadium } from '@/shared/schema/src/models/stadium.model';
import { Divider, Paper, Title, TextInput } from '@mantine/core';
import { FtbTable } from '@/shared/shared-frontend/components/FtbTable/FtbTable';
import { Game } from '@/shared/schema/src/models/game.model';
import { TeamLogo } from '@/shared/shared-frontend/components/TeamLogo/TeamLogo';
import { Search as SearchIcon } from 'tabler-icons-react';
import s from './StadiumGames.module.scss';
import { useState } from 'react';
import { filter } from '@/shared/tools/helpers';
import { userState } from 'ftb-models';
require('dayjs/locale/ru');

export const StadiumGames = ({ stadium }: { stadium: Stadium }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Paper withBorder p={'md'} style={{ position: 'relative' }}>
      <Title order={4}>Games</Title>
      <Divider my={'md'} variant={'dashed'} />

      <TextInput size={'xs'} icon={<SearchIcon size={14} />} placeholder={'Search'} my={'xs'} style={{ flex: 1 }} onChange={e => setSearchQuery(e.currentTarget.value)} />

      <FtbTable
        entities={filter(stadium?.games, searchQuery, ['home.team.name', 'away.team.name'])}
        className={s.table}
        rowHeight={60}
        columns={[
          {
            name: 'Teams',
            className: s.teamsTd,
            render: (g: Game) => (
              <div className={s.teams}>
                <div className={s.team}>
                  <TeamLogo height={30} team={g.home.team} />
                  {g.home.team.shortName}
                </div>
                -
                <div className={s.team}>
                  <TeamLogo height={30} team={g.away.team} />
                  {g.away.team.shortName}
                </div>
              </div>
            ),
          },
          {
            name: 'Tournament',
            className: s.tournamentTd,
            render: (g: Game) => g?.champ?.name + ' - ' + g?.season?.name,
          },
          {
            name: 'Date',
            className: s.dateTd,
            render: (g: Game) => g.dt?.locale(userState.language).format('DD MMM YYYY'),
          },
        ]}
      />
    </Paper>
  );
};
