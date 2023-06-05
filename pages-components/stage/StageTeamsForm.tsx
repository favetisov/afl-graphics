import s from './StageTeamsForm.module.scss';
import { Stage } from '@/shared/schema/src/models/stage.model';
import { Group, Paper, Title, Button, Divider, Table, Modal } from '@mantine/core';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { filter } from '@/shared/tools/helpers';
import { TeamLogo } from '@/shared/shared-frontend/components/TeamLogo/TeamLogo';

export const StageTeamsForm = ({ stage }: { stage: Stage }) => {
  const [query, setQuery] = useState('');
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  const router = useRouter();

  stage.calculate();

  return (
    <Paper withBorder px={'sm'} my={'md'}>
      <Group position={'apart'} py={'md'}>
        <Group noWrap>
          <Title order={4}>Teams</Title>
        </Group>
        <Button onClick={() => setModalOpened(true)} size={'xs'}>
          Add team
        </Button>
      </Group>

      <Divider variant={'dashed'} />
      <Table className={s.table} fontSize={'xs'} verticalSpacing={'sm'} highlightOnHover={true}>
        <thead>
          <tr>
            <th className={s.logoTd}>Name</th>
            <th className={s.nameTd}>Format</th>
          </tr>
        </thead>
        <tbody>
          {filter(Object.values(stage.calculated.teamsStatsMap), query, ['name']).map(teamStats => {
            const team = teamStats.team;
            return (
              <tr className={s.tableRow} onClick={() => router.push(`/teams/${team._id}`)} key={team._id}>
                <td className={s.logoTd}>
                  <TeamLogo team={team} width={25} height={25} />
                </td>
                <td className={s.nameTd}>{team.name}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal size="45%" centered withCloseButton={false} opened={modalOpened} onClose={() => setModalOpened(false)}>
        team
      </Modal>
    </Paper>
  );
};
