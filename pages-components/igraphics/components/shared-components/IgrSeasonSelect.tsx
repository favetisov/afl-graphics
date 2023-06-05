import { useState } from 'react';
import { TextInput } from '@mantine/core';
import { Tournament as TournamentIcon, ChevronDown as ChevronDownIcon } from 'tabler-icons-react';
import { useModel } from '@/tools/model-hooks';
import s from './IgrSeasonSelect.module.scss';
import { sortBy, orderBy, last } from 'lodash';
import { Modal } from '@mantine/core';
import { Flag } from '@/shared/shared-frontend/components/Flag/Flag';
import { League } from '@/shared/schema/src/models/league.model';

export const IgrSeasonSelect = ({ leagueId, onSeasonChange }: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [season, setSeason] = useState(null);
  const league: League = useModel('League', leagueId);

  if (season && league?._id != leagueId) {
    setSeason(null);
  }

  const onSeasonClick = season => {
    setModalOpen(false);
    setSeason(season);
    onSeasonChange(season);
  };

  const renderModal = () => {
    if (!league) return;

    return (
      <div className={s.list}>
        {sortBy(
          league.countries.filter(c => c.show),
          ['sortIdx'],
        ).map(c => (
          <div key={'c' + c._id} className={s.country + ' ' + s.countryOpen}>
            <div className={s.countryName}>
              <Flag flag={c.flag} height={25} width={35} /> {c.name}
            </div>
            <div className={s.champs}>
              {sortBy(
                c.champs.filter(c => c.show),
                ['sortIdx'],
              ).map(ch => (
                <div key={'ch' + ch._id} className={s.champ + ' ' + s.champOpen}>
                  <div className={s.champName}>
                    <div onClick={() => onSeasonClick(last(orderBy(ch.seasons, ['sortIdx'], ['desc'])))}>{ch.name}</div> [
                    {orderBy(
                      ch.seasons
                        .filter(c => c.show)
                        .map(sn => (
                          <div className={s.season} key={sn._id} onClick={() => onSeasonClick(sn)}>
                            {sn.name}
                          </div>
                        )),
                      ['sortIdx'],
                      ['desc'],
                    )}
                    ]
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div onClick={() => setModalOpen(true)}>
        <TextInput
          size={'xs'}
          mt={'xs'}
          mx={0}
          icon={<TournamentIcon size={20} />}
          placeholder={'Select season'}
          rightSection={<ChevronDownIcon size={14} />}
          defaultValue={season ? season?.champ?.country?.name + ' ' + season?.champ?.name + ' ' + season?.name : null}
          disabled={true}
          className={s.seasonSelect}
        />
      </div>
      <Modal centered opened={modalOpen} title={'Select tournament'} onClose={() => setModalOpen(false)} size={'lg'} overflow={'inside'}>
        {renderModal()}
      </Modal>
    </>
  );
};
