import { forwardRef, useEffect, useState } from 'react';
import s from './IgrPlayerPhoto.module.scss';
import { useDebouncedState } from '@mantine/hooks';
import { PlayerPhoto } from '@/shared/shared-frontend/components/PlayerPhoto/PlayerPhoto';
import { TeamLogo } from '@/shared/shared-frontend/components/TeamLogo/TeamLogo';
import { Modal, Divider, TextInput } from '@mantine/core';
import { FtbTable } from '@/shared/shared-frontend/components/FtbTable/FtbTable';
import { Player } from '@/shared/schema/src/models/player.model';
import { getModelManager } from '@/shared/schema/src/models/manager/model-manager';
import { League } from '@/shared/schema/src/models/league.model';

export const IgrPlayerPhoto = forwardRef(
  ({ className, schema, player, onChangePlayer, league }: { className?: string; schema: any; player: any; onChangePlayer?: (p) => void; league?: League }, ref) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [tableContainerRef, setTableContainerRef] = useState<any>();
    const [players, setPlayers] = useState<Player[]>([]);
    const [query, setQuery] = useDebouncedState('', 500);
    const [manager, setManager] = useState(null);

    const loadPlayers = async () => {
      const resp = await manager.search(query);
      let allPlayers = resp['Player'];

      if (league) {
        allPlayers = allPlayers?.filter(pl => pl?.league?._id == league?._id);
      }

      setPlayers(allPlayers);
    };

    useEffect(() => {
      getModelManager().then(m => {
        setManager(m);
      });
    });

    useEffect(() => {
      if (manager) {
        loadPlayers();
      }
    }, [query]);

    return (
      <>
        <span className={s.photoWrapper} onClick={() => setModalOpen(true)}>
          {player?._id ? <PlayerPhoto className={className} fill={schema.colors.bar} player={player} /> : <div className={`${s.photoForm} ${className}`} />}
        </span>
        <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title={'Select player'}>
          <Divider variant={'dashed'} my={'md'} />
          <TextInput onChange={e => setQuery(e.target.value)} placeholder={'Search player'} data-autofocus />
          <Divider variant={'dashed'} my={'md'} />
          <div className={s.tableWrapper} ref={el => setTableContainerRef(el)}>
            {query.length ? (
              <FtbTable
                className={''}
                scrollableParent={tableContainerRef}
                entities={players}
                columns={[
                  {
                    name: 'Photo',
                    className: s.photoTd,
                    render: pl => <PlayerPhoto className={s.playerPhoto} player={pl} height={40} />,
                  },
                  {
                    name: 'Name',
                    className: s.nameTd,
                    render: pl => (
                      <div className={s.info}>
                        <p className={s.name}>{`${pl?.lastName} ${pl?.firstName}`}</p>
                        <p className={s.description}>
                          {Boolean(pl?.teams?.length) && (
                            <div className={s.teams}>
                              {pl?.teams?.map(t => (
                                <TeamLogo height={20} key={t._id} team={t.team} />
                              ))}
                            </div>
                          )}
                          <span>{pl?.league?.name}</span>
                        </p>
                      </div>
                    ),
                  },
                ]}
                rowHeight={60}
                onRowClick={pl => {
                  console.log(pl);
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
  },
);
