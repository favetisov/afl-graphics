import s from './IgrVideoScore.module.scss';
import { TeamLogo } from '@/shared/shared-frontend/components/TeamLogo/TeamLogo';
import { Game } from '@/shared/schema/src/models/game.model';
import BorderFormIcon from '@public/icons/fill-form.svg';
import { forwardRef, useState } from 'react';

export const IgrVideoScore = forwardRef(
  ({ game, home, away, schema }: { game: Game; home: { score: number; color: string }; away: { score: number; color: string }; schema: any; color?: string }, ref) => {
    const [homeTeam, setHomeTeam] = useState(game.home.team.shortName);
    const [awayTeam, setAwayTeam] = useState(game.away.team.shortName);
    const [score, setScore] = useState(`${home.score}:${away.score}`);

    return (
      <div style={{ backgroundColor: schema.colors.scoreBg }} className={s.scorePlate}>
        <div className={`${s.team} ${s.home}`}>
          <BorderFormIcon fill={home.color} height={150} width={150} className={`${s.borderForm} ${s.teamColor}`} />
          <BorderFormIcon fill={schema.colors.scoreBg} height={150} width={150} className={s.borderForm} />
          <TeamLogo team={game.home.team} height={120} />
          <input style={{ color: schema.colors.rowFont }} className={s.inputName} onChange={e => setHomeTeam(e.target.value)} value={homeTeam} />
        </div>
        <div className={s.score} style={{ background: schema.colors.titleBg }}>
          <input className={s.inputScore} onChange={e => setScore(e.target.value)} value={score} style={{ color: schema.colors.titleFont }} />
        </div>
        <div className={`${s.team} ${s.away}`}>
          <input style={{ color: schema.colors.rowFont }} className={s.inputName} onChange={e => setAwayTeam(e.target.value)} value={awayTeam} />
          <TeamLogo team={game.away.team} height={120} />
          <BorderFormIcon fill={schema.colors.scoreBg} height={150} width={150} className={s.borderForm} />
          <BorderFormIcon fill={away.color} height={150} width={150} className={`${s.borderForm} ${s.teamColor}`} />
        </div>
      </div>
    );
  },
);
