import { Button, Divider, Group, Modal, Paper, Switch, Table, TextInput, Title } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import s from './CountryChampsForm.module.scss';
import { Country } from '@/shared/schema/src/models/country.model';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { Eye as EyeIcon, EyeOff as EyeOffIcon, Search as SearchIcon } from 'tabler-icons-react';
import { Champ } from '@/shared/schema/src/models/champ.model';

export const CountryChampsForm = ({ country }: { country: Country }) => {
  const router = useRouter();
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [query, setQuery] = useState('');
  useHotkeys([['ctrl+A', () => setModalOpened(true)]]);

  return (
    <Paper withBorder px={'sm'} my={'md'}>
      <Group position={'apart'} p={'md'}>
        <Title order={4}>Champs</Title>
        <Button onClick={() => setModalOpened(true)} size={'xs'}>
          Add champ (Ctrl + A)
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
            <th className={s.narrowTd}>Show</th>
            <th className={s.nameTd}>Name</th>
          </tr>
        </thead>
        <tbody>
          {country.champs.map((champ: Champ) => (
            <tr className={s.tableRow} onClick={() => router.push(router.asPath + `/champs/${champ._id}`)} key={country._id}>
              <td className={s.narrowTd}>{country?.show ? <EyeIcon /> : <EyeOffIcon />}</td>
              <td className={s.nameTd}>{champ.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal size="45%" centered withCloseButton={false} opened={modalOpened} onClose={() => setModalOpened(false)}>
        {/*<ChampForm formType={'modal'} />*/}
      </Modal>
    </Paper>
  );
};
