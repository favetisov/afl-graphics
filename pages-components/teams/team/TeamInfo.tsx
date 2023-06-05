import { Team } from '@/shared/schema/src/models/team.model';
import { Button, Divider, Group, Paper, Title } from '@mantine/core';
import { useRef, useState } from 'react';
import { TeamForm } from '@/pages-components/teams/TeamForm';

export const TeamInfo = ({ team }: { team: Team }) => {
  const [operationInProgress, setOperationInProgress] = useState(false);
  // const userUiStore = useUserUiStore();
  // const teamDataStore = useTeamsDataStore();
  const teamForm = useRef<any>();

  const editTeam = async v => {
    // if (!v) return;
    // setOperationInProgress(true);
    // try {
    //   v._id = teamId;
    //   v.league = userUiStore.u?.league;
    //
    //   await teamDataStore.editTeam(v);
    //   showNotification({ color: 'green', message: 'Team info saved' });
    // } catch (e) {
    //   console.error(e);
    //   const message = e.json ? (await e.json()).error : 'team edit failed';
    //   showNotification({ message, color: 'red' });
    // }
    // setOperationInProgress(false);
  };

  return (
    <Paper withBorder px={'sm'} my={'md'}>
      <Title order={4} py={'md'}>
        Team info
      </Title>
      <Divider variant={'dashed'} my={'xs'} />
      <TeamForm team={team} ref={teamForm} />
      <Divider variant={'dashed'} my={'xs'} />
      <Group position={'right'} mt={'md'}>
        <Button mb={'md'} onClick={() => editTeam(teamForm?.current?.getValue())} disabled={operationInProgress}>
          Save info
        </Button>
      </Group>
    </Paper>
  );
};
