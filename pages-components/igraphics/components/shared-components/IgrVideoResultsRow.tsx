import s from './IgrVideoResultsRow.module.scss';
import { GameEvent } from '@/shared/schema/src/models/game-event.model';
import { GameEventExtra, GameEventType } from '@/shared/schema/src/models/helper-models/game-event-type.model';
import { Player } from '@/shared/schema/src/models/player.model';
import { forwardRef, useEffect, useState } from 'react';
import AutosizeInput from 'react-input-autosize';

export const IgrVideoResultsRow = forwardRef(({ eventHome, eventAway, schema, idx }: any, ref) => {
  const [homePlayer, setHomePlayer] = useState('');
  const [awayPlayer, setAwayPlayer] = useState('');
  const [homeMinute, setHomeMinute] = useState(eventHome?.minute ? `${eventHome.minute}’` : ' ');
  const [awayMinute, setAwayMinute] = useState(eventAway?.minute ? `${eventAway.minute}’` : ' ');
  const [awayTime, setAwayTime] = useState(eventAway ? eventAway?.minute + '’' : ' ');

  useEffect(() => {
    if (eventHome) {
      if (eventHome?.extra == GameEventExtra.OWN_GOAL) {
        setHomePlayer('Автогол');
      } else if (eventHome?.firstPlayer) {
        setHomePlayer(getPlayerName(eventHome.firstPlayer));

        if (eventHome?.secondPlayer) {
          setHomePlayer(prev => `${prev} (${getPlayerName(eventHome.secondPlayer)})`);
        }
      } else if (!eventHome?.firstPlayer) {
        setHomePlayer('Неизвестен');
      }
    }
    if (eventAway) {
      if (eventAway?.extra == GameEventExtra.OWN_GOAL) {
        setAwayPlayer('Автогол');
      } else if (eventAway?.firstPlayer) {
        setAwayPlayer(getPlayerName(eventAway.firstPlayer));

        if (eventAway?.secondPlayer) {
          setAwayPlayer(prev => `${prev} (${getPlayerName(eventAway.secondPlayer)})`);
        }
      } else if (!eventAway?.firstPlayer) {
        setAwayPlayer('Неизвестен');
      }
    }
  }, [eventHome, eventAway]);

  function getPlayerName(player: Player) {
    return `${player?.firstName[0]}. ${player?.lastName}`;
  }

  return (
    <div className={s.row}>
      <div className={`${s.side}`}>
        {eventHome && (
          <>
            <AutosizeInput
              onChange={e => {
                setHomePlayer(e.target.value);
              }}
              value={homePlayer}
              inputStyle={{ fontSize: 50, color: '#fff' }}
            />
            {eventHome?.minute && (
              <span className={s.time}>
                <input style={{ color: '#fff' }} className={s.inputRowScore} onChange={e => setHomeMinute(e.target.value)} value={homeMinute} />
              </span>
            )}
            {renderCards(eventHome)}
          </>
        )}
      </div>
      <div className={`${s.side} ${s.away}`}>
        {eventAway && (
          <>
            <input style={{ color: '#fff' }} className={s.inputRowName} value={awayPlayer} onChange={e => setAwayPlayer(e.target.value)} />
            <span className={s.time}>
              <AutosizeInput
                onChange={e => {
                  setAwayTime(e.target.value);
                }}
                value={awayTime}
                inputStyle={{ fontSize: 50, color: '#fff' }}
              />
            </span>
            {renderCards(eventAway)}
          </>
        )}
      </div>
    </div>
  );

  function renderCards(event: GameEvent) {
    return (
      <>
        {[GameEventType.F_YELLOW, GameEventType.F_SECOND_YELLOW].includes(event.type) && <div className={`${s.card} ${s.yellow}`} />}
        {[GameEventType.F_RED, GameEventType.F_SECOND_YELLOW].includes(event.type) && <div className={`${s.card} ${s.red}`} />}
      </>
    );
  }
});
