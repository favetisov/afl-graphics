import { IgrElContainer } from '../shared-components/IgrElContainer';
import { IgrTeamLogo } from '../shared-components/IgrTeamLogo';
import s from './IgraphicsCalendarTourRow.module.scss';
import { forwardRef, useState } from 'react';
import { Game } from 'shared/schema/src/models/game.model';

export const IgraphicsCalendarTourRow = forwardRef(({ game, schema, idx }: { game: Game; schema: any; idx: number }, ref) => {
  const [hidden, setHidden] = useState(false);
  const [homeTeam, setHomeTeam] = useState(game.home.team.name);
  const [awayTeam, setAwayTeam] = useState(game.away.team.name);
  const [score, setScore] = useState(game.hasFinished() ? `${game.home.score.ft}:${game.away.score.ft}` : `-:-`);

  return (
    <div className={`${s.container} ${hidden ? s.hidden : null}`}>
      <IgrElContainer onClose={() => setHidden(true)}>
        <div style={{ backgroundColor: idx % 2 ? schema.colors.rowEven : schema.colors.rowOdd }} className={s.row}>
          <div className={`${s.team} ${s.home}`}>
            <IgrTeamLogo logo={game.home?.team.logo} height={90} />
            <input style={{ color: schema.colors.rowFont }} className={s.inputName} value={homeTeam} onChange={e => setHomeTeam(e.target.value)} />
          </div>
          <div className={s.score}>
            <input style={{ color: schema.colors.rowFont }} value={score} onChange={e => setScore(e.target.value)} />
          </div>
          <div className={`${s.team} ${s.away}`}>
            <input style={{ color: schema.colors.rowFont }} className={s.inputName} value={awayTeam} onChange={e => setAwayTeam(e.target.value)} />
            <IgrTeamLogo logo={game.away?.team.logo} height={90} />
          </div>
        </div>
      </IgrElContainer>
    </div>
  );
});
