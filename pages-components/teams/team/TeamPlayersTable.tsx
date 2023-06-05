import s from './TeamPlayersTable.module.scss';
import { Player } from '@/shared/schema/src/models/player.model';
import { FtbTable } from '@/shared/shared-frontend/components/FtbTable/FtbTable';
import { PlayerPhoto } from '@/shared/shared-frontend/components/PlayerPhoto/PlayerPhoto';
import { userState } from 'ftb-models';
require('dayjs/locale/ru');

export const TeamPlayersTable = ({ players, teamId }: { players: Player[]; teamId: number }) => {
  return (
    <FtbTable
      entities={players}
      className={s.table}
      rowHeight={70}
      // onRowClick={onPlayerClick}
      columns={[
        {
          name: '#',
          className: s.numberTd,
          render: p => p.teamsWithNumbers?.find(pit => pit.team._id == teamId)?.number,
        },
        {
          name: 'Name',
          className: s.nameTd,
          render: p => (
            <div className={s.info}>
              <div className={s.photoWrapper}>
                <PlayerPhoto className={s.photo} player={p} height={60} />
              </div>
              <div>
                <div className={s.name}>
                  {p.lastName} {p.firstName} {p.middleName}
                </div>
                <div>
                  {p.position} {p.birthday ? ', ' + p.birthday.locale(userState.language).format('DD.MM.YYYY') : ''}
                </div>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
};
