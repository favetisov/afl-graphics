import { useEffect, useState } from 'react';
import { Game } from '@/shared/schema/src/models/game.model';
import { Divider, Group, Paper, TextInput, Title } from '@mantine/core';
import { Search as SearchIcon } from 'tabler-icons-react';
import { getModelManager } from '@/shared/schema/src/models/manager/model-manager';

export const GamesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [games, setGames] = useState<Game[]>();

  useEffect(() => {
    getModelManager().then(m => {
      m.getModel('League', 1).then(l => {
        console.log(l);
      });
    });
  });

  return (
    <Paper withBorder px={'sm'} my={'md'}>
      <Group position={'apart'} p={'md'}>
        <Title order={4}>Games</Title>
      </Group>
      <Divider variant={'dashed'} />
      <Group>
        <TextInput icon={<SearchIcon size={14} />} placeholder={'Search'} size={'xs'} my={'xs'} style={{ flex: 1 }} onChange={e => setSearchQuery(e.currentTarget.value)} />
      </Group>
      <Divider variant={'dashed'} mb={'sm'} />
      {/*<NewsTable news={newsFiltered} />*/}
    </Paper>
  );
};
