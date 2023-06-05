import { Divider, Grid, Paper, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getModelManager } from '../../../shared/schema/src/models/manager/model-manager';
import { TeamInfo } from '@/pages-components/teams/team/TeamInfo';
import { TeamDocuments } from '@/pages-components/teams/team/TeamDocuments';
import { TeamPlayersTable } from '@/pages-components/teams/team/TeamPlayersTable';
import { Team } from '@/shared/schema/src/models/team.model';

export const TeamPage = ({ teamId }: { teamId: number }) => {
  const [team, setTeam] = useState<Team>();

  useEffect(() => {
    if (!team && teamId) {
      getModelManager().then(m => {
        m.getModel('Team', teamId).then(t => {
          setTeam(t);
        });
      });
    }
  });

  if (!team) {
    return null;
  }

  team.calculate();

  const players = Object.values(team.calculated.playersStatsMap).map(playerStats => playerStats.player);

  return (
    <>
      <Grid>
        <Grid.Col md={6} sm={12}>
          <TeamInfo team={team} />
          <TeamDocuments />
        </Grid.Col>
        <Grid.Col md={6} sm={12}>
          <Paper withBorder px={'sm'} my={'md'}>
            <Title order={4} py={'md'}>
              Players
            </Title>
            <Divider variant={'dashed'} my={'xs'} />
            <TeamPlayersTable players={players} teamId={teamId} />
          </Paper>
        </Grid.Col>
      </Grid>
    </>
  );
};
