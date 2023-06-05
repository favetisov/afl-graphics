import React, { useState } from 'react';
import { useHotkeys } from '@mantine/hooks';
import { Button, Divider, Group, Modal, Paper, Table, TextInput, Title } from '@mantine/core';
import { Search as SearchIcon } from 'tabler-icons-react';
import s from './ChampSeasonsForm.module.scss';
import { Champ } from '@/shared/schema/src/models/champ.model';
import { filter } from '@/shared/tools/helpers';
import { useRouter } from 'next/router';

export const ChampSeasonsForm = ({ champ }: { champ: Champ }) => {
  useHotkeys([['ctrl+a', () => setModalOpened(true)]]);
  const [query, setQuery] = useState('');
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  const router = useRouter();

  return (
    <Paper withBorder px={'sm'} my={'md'}>
      <Group position={'apart'} p={'md'}>
        <Group noWrap>
          <Title order={4}>Seasons</Title>
        </Group>
        <Button onClick={() => setModalOpened(true)} size={'xs'}>
          Add season (Ctrl + A)
        </Button>
      </Group>

      <Divider variant={'dashed'} />
      <Group>
        <TextInput icon={<SearchIcon size={14} />} placeholder={'Search'} my={'xs'} style={{ flex: 1 }} onChange={e => setQuery(e.currentTarget.value)} />
      </Group>

      <Divider variant={'dashed'} />

      <Table className={s.table} fontSize={'xs'} verticalSpacing={'sm'} highlightOnHover={true}>
        <thead>
          <tr>
            <th className={s.narrowTd}>Show</th>
            <th className={s.nameTd}>Name</th>
          </tr>
        </thead>
        <tbody>
          {filter(champ.seasons, query, ['name']).map((season: any) => (
            <tr className={s.tableRow} onClick={() => router.push(router.asPath + `/seasons/${season._id}`)} key={season._id}>
              <td className={s.narrowTd}>{/*<AdminShowIndicator show={season.show} />*/}</td>
              <td className={s.nameTd}>{season.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal size="45%" centered withCloseButton={false} opened={modalOpened} onClose={() => setModalOpened(false)}>
        {/*<SeasonForm formType={'modal'} />*/}
      </Modal>
    </Paper>
  );
};
