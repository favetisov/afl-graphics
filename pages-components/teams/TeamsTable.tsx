import { FtbTable } from '@/shared/shared-frontend/components/FtbTable/FtbTable';
import { TeamLogo } from '@/shared/shared-frontend/components/TeamLogo/TeamLogo';
import { Skeleton, Switch, Table } from '@mantine/core';
import { range } from '@mantine/hooks';
import Link from 'next/link';
import s from './TeamsTable.module.scss';

export const TeamsTable = ({ teams }: any) => {
  return (
    <FtbTable
      entities={teams}
      className={s.table}
      rowHeight={50}
      rowHref={row => '/teams/' + row._id}
      columns={[
        {
          name: 'Logo',
          className: s.logoTd,
          render: row => (
            <div className={s.photo}>
              <TeamLogo team={row} height={30} />
            </div>
          ),
        },
        {
          name: 'Short',
          className: s.shortNameTd,
          render: row => row.shortName,
        },
        {
          name: 'Name',
          className: s.nameTd,
          render: row => row.name,
        },
        {
          name: 'Rating',
          className: s.ratingTd,
          render: row => row.rating,
        },
      ]}
    />
  );

  const renderBody = () => {
    if (!teams) {
      return range(0, 4).map(i => (
        <tr key={i}>
          <td>
            <Skeleton height={30} my={6} width="70%" radius="xl" />
          </td>
        </tr>
      ));
    }
    if (!teams.length)
      return (
        <tr>
          <td>Nothing found</td>
        </tr>
      );
    return teams.map(team => (
      <Link key={team._id} href={`/teams/${team._id}`}>
        <tr className={s.teamsTableRow} key={team._id}>
          <td className={s.teamsTableRowNarrow}>
            <Switch size={'xs'} checked={team.show} />
          </td>
          <td className={s.teamsTableRowPhoto}>
            <TeamLogo team={team} width={40} height={40} />
          </td>
          <td className={s.teamsTableRowName}>{team?.name || '-'}</td>
          <td className={s.teamsTableRowShortName}>{team?.shortName || '-'}</td>
          <td className={s.teamsTableRowNarrow}>{team?.rating || '-'}</td>
        </tr>
      </Link>
    ));
  };

  return (
    <Table className={s.teamsTable} fontSize={'xs'} verticalSpacing={'sm'} highlightOnHover={true}>
      <thead>
        <tr className={s.teamsTableRow}>
          <th className={s.teamsTableRowNarrow}>Show</th>
          <th className={s.teamsTableRowPhoto}>Logo</th>
          <th className={s.teamsTableRowName}>Name</th>
          <th className={s.teamsTableRowShortName}>Short name</th>
          <th className={s.teamsTableRowNarrow}>Rating</th>
        </tr>
      </thead>
      <tbody>{renderBody()}</tbody>
    </Table>
  );
};
