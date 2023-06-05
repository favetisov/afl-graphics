import s from './StageGamesForm.module.scss';
import { Stage } from '@/shared/schema/src/models/stage.model';
import { useState } from 'react';
import { Button, Divider, Group, Paper, Table, TextInput, Title } from '@mantine/core';
import { useRouter } from 'next/router';

import { Search as SearchIcon } from 'tabler-icons-react';
import { filter } from '@/shared/tools/helpers';
import { Game } from '@/shared/schema/src/models/game.model';

export const StageGamesForm = ({ stage }: { stage: any }) => {
  const [query, setQuery] = useState('');
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  const router = useRouter();

  return (
    <Paper withBorder px={'sm'} my={'md'}>
      <Group position={'apart'} py={'md'}>
        <Group noWrap>
          <Title order={4}>Games</Title>
        </Group>
        <Button onClick={() => setModalOpened(true)} size={'xs'}>
          Add game
        </Button>
      </Group>

      <Divider variant={'dashed'} />

      <Group>
        <TextInput size={'xs'} icon={<SearchIcon size={14} />} placeholder={'Search'} my={'xs'} style={{ flex: 1 }} onChange={e => setQuery(e.currentTarget.value)} />
      </Group>

      <Divider variant={'dashed'} />

      <Table className={s.table} fontSize={'xs'} verticalSpacing={'sm'} highlightOnHover={true}>
        <thead>
          <tr>
            <th className={s.narrowTd}>Tour</th>
            <th className={s.nameTd}>Teams</th>
          </tr>
        </thead>
        <tbody>
          {filter(stage?.games?.items || [], query, ['team.home.name', 'team.home.away'])?.map((game: Game) => (
            <tr className={s.tableRow} onClick={() => router.push(`/games/${game._id}`)} key={game._id}>
              <td className={s.newerTd}>{game.tourNumber}</td>
              <td className={s.nameTd}>
                {game.home.team.name} {game.home.score.ft}-{game.away.score.ft} {game.away.team.name}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
};
