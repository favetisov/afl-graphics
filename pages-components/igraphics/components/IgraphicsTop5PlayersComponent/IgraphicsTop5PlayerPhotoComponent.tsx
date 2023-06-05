import { PlayerPhoto } from '@/shared/shared-frontend/components/PlayerPhoto/PlayerPhoto';
import BorderIcon from '@public/icons/border.svg';
import { useState } from 'react';
import { Divider, Modal, TextInput } from '@mantine/core';
import { FtbTable } from '@/shared/shared-frontend/components/FtbTable/FtbTable';
import { TeamLogo } from '@/shared/shared-frontend/components/TeamLogo/TeamLogo';
import { filter } from 'ftb-models';
import s from './IgraphicsTop5PlayerPhotoComponent.module.scss';

export const IgraphicsTop5PlayerPhotoComponent = ({ schema, playerStats, category, onChangePlayer, season }: any) => {
  const [tableContainerRef, setTableContainerRef] = useState<any>();
  const [modalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState('');

  const players = filter(Object.values(season.playersStats), query, ['player.firstName', 'player.lastName']);

  return (
    <>
      <div onClick={() => setModalOpen(true)} className={s.photo}>
        <PlayerPhoto fill={schema.colors.bar} player={playerStats.player} key={playerStats.player._id + schema.colors.bar} />
        <BorderIcon style={{ fill: schema.colors.bar }} className={s.borderIcon} />
      </div>
      <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title={'Select player'}>
        <Divider variant={'dashed'} my={'md'} />
        <TextInput value={query} onChange={e => setQuery(e.target.value)} placeholder={'Search player'} autoFocus />
        <Divider variant={'dashed'} my={'md'} />
        <div className={s.tableWrapper} ref={el => setTableContainerRef(el)}>
          {query.length ? (
            <FtbTable
              key={players.length}
              className={''}
              scrollableParent={tableContainerRef}
              entities={players}
              columns={[
                {
                  name: 'Photo',
                  className: s.photoTd,
                  render: pl => <PlayerPhoto className={s.playerPhoto} player={pl.player} height={40} />,
                },
                {
                  name: 'Name',
                  className: s.nameTd,
                  render: pl => (
                    <div className={s.info}>
                      <p className={s.name}>{`${pl.player?.lastName} ${pl.player?.firstName}`}</p>
                      <p className={s.description}>
                        {Boolean(pl.player?.teams?.length) && (
                          <div className={s.teams}>
                            {pl.player?.teams?.map(t => (
                              <TeamLogo height={20} key={t._id} team={t.team} />
                            ))}
                          </div>
                        )}
                        <span>{pl.player?.league?.name}</span>
                      </p>
                    </div>
                  ),
                },
              ]}
              rowHeight={60}
              onRowClick={pl => {
                onChangePlayer(pl);
                setModalOpen(false);
              }}
            />
          ) : (
            <p>Search players by name</p>
          )}
        </div>
      </Modal>
    </>
  );
};
