import s from './IgrVideoPlayer.module.scss';
import { GameEvent } from '@/shared/schema/src/models/game-event.model';
import { GameEventType } from '@/shared/schema/src/models/helper-models/game-event-type.model';
import { TeamLogo } from '@/shared/shared-frontend/components/TeamLogo/TeamLogo';
import BorderFormIcon from '@public/icons/fill-form.svg';
import { forwardRef, useEffect, useState } from 'react';
import AutosizeInput from 'react-input-autosize';

export const IgrVideoPlayer = forwardRef(({ event, schema, color }: { event: GameEvent; schema: any; color: string }, ref) => {
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    if (event.firstPlayer) {
      setPlayerName(`${event.firstPlayer?.firstName[0]}.${event.firstPlayer.lastName} ${event.minute ? event.minute : ''}’`);
    }
  }, []);

  return (
    <div style={{ background: schema.colors.playerBarBg }} className={s.playerPlate}>
      <BorderFormIcon style={{ fill: color }} height={280} width={280} className={`${s.borderForm} ${s.teamColor}`} />
      <BorderFormIcon style={{ fill: schema.colors.playerBarBg }} height={280} width={280} className={s.borderForm} />
      <div className={s.logoContainer}>{event.team && <TeamLogo className={s.teamLogo} team={event.team} height={160} />}</div>
      <div className={s.names}>
        <div className={s.playerName}>
          {event.firstPlayer && (
            <AutosizeInput
              inputStyle={{ color: schema.colors.playerBarName, fontSize: '80px', fontWeight: 700, maxWidth: '900px', overflow: 'hidden' }}
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
            />
          )}
          {[GameEventType.F_YELLOW, GameEventType.F_SECOND_YELLOW].includes(event.type) && <div className={`${s.card} ${s.yellow}`} />}
          {[GameEventType.F_RED, GameEventType.F_SECOND_YELLOW].includes(event.type) && <div className={`${s.card} ${s.red}`} />}
        </div>
        <div style={{ color: schema.colors.playerBarTeam }} className={s.teamName}>
          {event.team?.name}
        </div>
      </div>
    </div>
  );
});
