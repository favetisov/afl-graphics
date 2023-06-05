import { Loader, Select } from '@mantine/core';
import { Trophy as TrophyIcon } from 'tabler-icons-react';
import { ChevronDown as ChevronIcon } from 'tabler-icons-react';

import s from './LeaguesSelect.module.scss';
import { useState } from 'react';
import { League } from '@/shared/schema/src/models/league.model';

import sortBy from 'lodash-es/sortBy';
import { useModel } from '@/tools/model-hooks';
import { getUiDb } from '@/shared/tools/load-user';

export const LeaguesSelect = ({ onLeagueChange }) => {
  const [league, setLeague] = useState<League>();
  const appClient: any = useModel('Appclient', 1);

  if (appClient && !league) {
    getUiDb()
      .get('leagueId')
      .then(row => {
        if (row?.leagueId) onLeagueIdChange(row.leagueId);
      });
  }

  const onLeagueIdChange = (leagueId: string) => {
    const league = appClient?.leagues?.find(l => l._id + '' == leagueId);
    setLeague(league);
    onLeagueChange(league);
    getUiDb().put({ category: 'leagueId', leagueId });
  };

  const rightSection = (() => {
    if (!appClient) {
      return <Loader size={14} />;
    } else {
      return <ChevronIcon size={14} />;
    }
  })();

  const leaguesOptions = appClient
    ? sortBy(appClient?.leagues, 'sortIdx').map(l => ({
        value: l._id + '',
        label: l.name,
        group: l.city?.name,
        model: l,
      }))
    : [];

  return (
    <Select
      size={'xs'}
      className={s.leagueSelect}
      placeholder={'Select league'}
      disabled={!appClient}
      icon={<TrophyIcon size={14} />}
      searchable
      value={league?._id + ''}
      data={leaguesOptions}
      filter={(value, item) => {
        return item.model.city?.name.toLowerCase().includes(value.toLowerCase().trim()) || item.model.name?.toLowerCase().includes(value.toLowerCase().trim());
      }}
      onChange={onLeagueIdChange}
      rightSection={rightSection}
    />
  );
};
