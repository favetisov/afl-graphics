import { Button, Divider, Group, Modal, Paper, Table, TextInput, Title } from '@mantine/core';
import { Search as SearchIcon } from 'tabler-icons-react';
import { Eye as EyeIcon } from 'tabler-icons-react';
import { EyeOff as EyeOffIcon } from 'tabler-icons-react';
import s from '@/pages/countries/index.module.scss';
import React, { useEffect, useState } from 'react';
import { useHotkeys } from '@mantine/hooks';
import { filter } from '@/shared/tools/helpers';
import { Country } from '@/shared/schema/src/models/country.model';
import { useRouter } from 'next/router';
import { getModelManager } from '@/shared/schema/src/models/manager/model-manager';
import { Flag } from '@/shared/shared-frontend/components/Flag/Flag';
import { LeaguesSelect } from '@/shared/shared-frontend/components/LeaguesSelect/LeaguesSelect';
import { League } from '@/shared/schema/src/models/league.model';

export const CountriesPage = () => {
  useHotkeys([['ctrl+A', () => setModalOpened(true)]]);
  const [leagueId, setLeagueId] = useState();
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [league, setLeague] = useState<League>();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!league) {
      getModelManager().then(m => {
        m.getModel('League', 1).then(l => {
          setLeague(l);
        });
      });
    }
  });

  return (
    <>
      <Paper withBorder px={'sm'} my={'md'}>
        <Group position={'apart'} p={'md'}>
          <Title order={4}>Countries</Title>
          <Button onClick={() => setModalOpened(true)} size={'xs'}>
            Add country (Ctrl + A)
          </Button>
        </Group>

        <Divider variant={'dashed'} />
        <Group>
          <TextInput icon={<SearchIcon size={14} />} placeholder={'Search'} my={'xs'} size={'xs'} style={{ flex: 1 }} onChange={e => setSearchQuery(e.currentTarget.value)} />
          <LeaguesSelect onLeagueChange={l => setLeague(l)} />
        </Group>

        <Divider variant={'dashed'} />

        <Table className={s.table} fontSize={'xs'} verticalSpacing={'sm'} highlightOnHover={true}>
          <thead>
            <tr>
              <th className={s.narrowTd}>Show</th>
              <th className={s.photoTd}>Flag</th>
              <th className={s.nameTd}>Name</th>
            </tr>
          </thead>
          <tbody>
            {filter(league?.countries, searchQuery, ['name'])?.map((country: Country) => (
              <tr className={s.tableRow} onClick={() => router.push(`/countries/${country._id}`)} key={country._id}>
                <td className={s.narrowTd}>{country?.show ? <EyeIcon /> : <EyeOffIcon />}</td>
                <td className={s.photoTd}>
                  <Flag flag={country.flag} height={30} width={50} />
                </td>
                <td className={s.nameTd}>{country.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>

      <Modal size="40%" centered withCloseButton={false} opened={modalOpened} onClose={() => setModalOpened(false)}>
        {/*<CountryForm formType={'modal'} />*/}
      </Modal>
    </>
  );
};
