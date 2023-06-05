import s from './SeasonStagesForm.module.scss';
import { Season } from '@/shared/schema/src/models/season.model';
import { Button, Divider, Group, Modal, Switch, Table, TextInput, Title } from '@mantine/core';
import { Paper } from '@mantine/core';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useHotkeys } from '@mantine/hooks';

import { Eye as EyeIcon, EyeOff as EyeOffIcon, Search as SearchIcon } from 'tabler-icons-react';
import { Stage } from '@/shared/schema/src/models/stage.model';
import { filter } from '@/shared/tools/helpers';

export const SeasonStagesForm = ({ season }: { season: Season }) => {
  useHotkeys([['ctrl+A', () => setModalOpened(true)]]);

  const router = useRouter();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [query, setQuery] = useState('');

  return (
    <Paper withBorder px={'sm'} my={'md'}>
      <Group position={'apart'} p={'md'}>
        <Group noWrap>
          <Title order={4}>Stages</Title>
        </Group>
        <Button onClick={() => setModalOpened(true)} size={'xs'}>
          Add stage (Ctrl + A)
        </Button>
      </Group>

      <Divider variant={'dashed'} />
      <Group>
        <TextInput size={'xs'} icon={<SearchIcon size={14} />} placeholder={'Search'} my={'xs'} style={{ flex: 1 }} onChange={e => setQuery(e.currentTarget.value)} />
      </Group>

      <Divider variant={'dashed'} />

      <Table className={s.table} fontSize={'xs'} verticalSpacing={'sm'} highlightOnHover={true}>
        <thead>
          <tr className={s.tableRow}>
            <th className={s.narrowTd}>Show</th>
            <th className={s.nameTd}>Name</th>
            <th className={s.formatTd}>Format</th>
          </tr>
        </thead>
        <tbody>
          {filter(season.stages, query, ['name']).map((stage: Stage) => (
            <tr className={s.tableRow} onClick={() => router.push(router.asPath + `/stage/${stage._id}`)} key={stage._id}>
              <td className={s.narrowTd}>{stage?.show ? <EyeIcon /> : <EyeOffIcon />}</td>
              <td className={s.nameTd}>{stage.name}</td>
              <td className={s.formatTd}>{stage.format}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal size="45%" centered withCloseButton={false} opened={modalOpened} onClose={() => setModalOpened(false)}>
        {/*<StageForm />*/}
      </Modal>
    </Paper>
  );
};
