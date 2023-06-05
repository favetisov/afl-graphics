import { useEffect, useState } from 'react';
import { Stadium } from '@/shared/schema/src/models/stadium.model';
import { Button, Divider, Group, Modal, Paper, TextInput, Title } from '@mantine/core';
import { Search as SearchIcon } from 'tabler-icons-react';
import { getModelManager } from '@/shared/schema/src/models/manager/model-manager';
import { StadiumsTable } from '@/pages-components/stadiums/StadiumsTable';
import { filter } from '@/shared/tools/helpers';
import { LeaguesSelect } from '@/shared/shared-frontend/components/LeaguesSelect/LeaguesSelect';

export const StadiumsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [stadiums, setStadiums] = useState<Stadium[]>();

  useEffect(() => {
    getModelManager().then(m => {
      m.getModel('League', 394).then(l => {
        setStadiums(l.stadiums);
      });
    });
  }, []);

  return (
    <Paper withBorder px={'sm'} my={'md'}>
      <Group position={'apart'} p={'md'}>
        <Title order={4}>Stadiums</Title>
        <Button onClick={() => setModalOpen(true)} size={'xs'}>
          Create new stadium (Ctrl + A)
        </Button>
      </Group>
      <Divider variant={'dashed'} />
      <Group>
        <TextInput icon={<SearchIcon size={14} />} placeholder={'Search'} size={'xs'} my={'xs'} style={{ flex: 1 }} onChange={e => setSearchQuery(e.currentTarget.value)} />
        <LeaguesSelect onLeagueChange={l => console.log(l)} />
      </Group>

      <Divider variant={'dashed'} mb={'sm'} />

      <StadiumsTable stadiums={filter(stadiums, searchQuery, ['name'])} />

      <Modal centered opened={modalOpen} title={'Create post'} onClose={() => setModalOpen(false)} size={'lg'} overflow={'inside'}></Modal>
    </Paper>
  );
};
