import { useEffect, useRef, useState } from 'react';
import { useHotkeys } from '@mantine/hooks';
import { Button, Divider, Group, LoadingOverlay, Modal, Paper, TextInput, Title } from '@mantine/core';
import { Search as SearchIcon } from 'tabler-icons-react';
import { getModelManager } from '../../shared/schema/src/models/manager/model-manager';
import { filter } from '../../shared/tools/helpers';
import { TeamsTable } from './TeamsTable';
import { LeaguesSelect } from '@/shared/shared-frontend/components/LeaguesSelect/LeaguesSelect';
import { League } from '@/shared/schema/src/models/league.model';

export const TeamsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showInactiveTeams, setShowInactiveTeams] = useState(false);
  const [operationInProgress, setOperationInProgress] = useState(false);
  const teamForm = useRef();
  const [league, setLeague] = useState<League>();

  useHotkeys([['ctrl+A', () => setModalOpen(true)]]);
  useEffect(() => {
    if (!league) {
      getModelManager().then(m => {
        m.getModel('League', 1).then(l => {
          setLeague(l);
        });
      });
    }
  });

  const teams = league ? filter(league.teams, searchQuery, ['name']) : null;

  return (
    <Paper withBorder px={'sm'} my={'md'}>
      <Group position={'apart'} py={'md'}>
        <Title order={4}>Teams</Title>
        <Button onClick={() => setModalOpen(true)} size={'xs'}>
          Create Team (Ctrl+A)
        </Button>
      </Group>
      <Divider variant={'dashed'} />
      <Group>
        <TextInput size={'xs'} icon={<SearchIcon size={14} />} placeholder={'Search'} my={'xs'} style={{ flex: 1 }} onChange={e => setSearchQuery(e.currentTarget.value)} />
        <LeaguesSelect onLeagueChange={l => setLeague(l)} />
      </Group>
      <Divider variant={'dashed'} mb={'sm'} />
      {/*<Switch value={showInactiveTeams} onChange={() => setShowInactiveTeams(!Boolean(showInactiveTeams))} label={'Show inactive team'} size={'xs'} />*/}
      <Divider variant={'dashed'} my={'sm'} />
      <TeamsTable teams={teams} />
      <Modal centered opened={modalOpen} title={'Create team'} onClose={() => setModalOpen(false)} size={'lg'} overflow={'inside'}>
        <LoadingOverlay visible={operationInProgress} />
        {/*<TeamForm ref={teamForm} />*/}
        <Divider variant={'dashed'} mt={'md'} />
        {/*<Button fullWidth onClick={() => createTeam(teamForm.current.getValue())} mt={'lg'}>*/}
        {/*  Create team*/}
        {/*</Button>*/}
      </Modal>
    </Paper>
  );
};
