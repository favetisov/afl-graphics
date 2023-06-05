import s from './IgrTeamLogo.module.scss';
import { useMemo, useState } from 'react';
import { TeamLogo } from '@/shared/shared-frontend/components/TeamLogo/TeamLogo';
import { Divider, Modal, TextInput } from '@mantine/core';
import useSwr from 'swr';
import { FtbTable } from '@/shared/shared-frontend/components/FtbTable/FtbTable';
import { getPlain } from '@/shared/schema/src/models/manager/manager.client';

export const IgrTeamLogo = ({ logo, height }: any) => {
  const [team, setTeam] = useState({ logo });
  const [modalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [tableContainerRef, setTableContainerRef] = useState<any>();
  const { data } = useSwr('logos', () => getPlain('/logos'));

  const logos = useMemo(() => {
    return data?.filter(l => l?.toLowerCase().includes(query.toLowerCase().trim()));
  }, [data, query]);

  return (
    <>
      <div className={s.teamLogo} onClick={() => setModalOpen(true)}>
        <TeamLogo key={team?.logo} team={team} height={height} />
      </div>
      <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title={'select logo'}>
        <Divider variant={'dashed'} my={'md'} />
        <TextInput onChange={e => setQuery(e.target.value)} placeholder={'Search logo'} data-autofocus />
        <Divider variant={'dashed'} my={'md'} />
        <div className={s.tableWrapper} ref={el => setTableContainerRef(el)}>
          <FtbTable
            key={JSON.stringify(logos)}
            scrollableParent={tableContainerRef}
            entities={logos}
            columns={[
              {
                name: 'Logo',
                className: s.logoTd,
                render: logo => <TeamLogo team={{ logo }} height={30} />,
              },
              {
                name: 'Name',
                className: s.nameTd,
                render: logo => logo.split('_')[0],
              },
            ]}
            rowHeight={50}
            onRowClick={logo => {
              setTeam({ logo });
              setModalOpen(false);
            }}
            className={''}
          />
        </div>
      </Modal>
    </>
  );
};
