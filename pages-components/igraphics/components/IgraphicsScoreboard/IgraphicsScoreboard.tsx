import s from './IgraphicsScoreboard.module.scss';
import { forwardRef, useState } from 'react';
import { TeamLogo } from '@/shared/shared-frontend/components/TeamLogo/TeamLogo';
import BorderFormIcon from '@public/icons/fill-form.svg';
import { IgrVideoResultsRow } from '@/pages-components/igraphics/components/shared-components/IgrVideoResultsRow';
import { Team } from '@/shared/schema/src/models/team.model';
import { GameEventType } from '@/shared/schema/src/models/helper-models/game-event-type.model';

import range from 'lodash/range';
import sortBy from 'lodash/sortBy';
import { IgrAflRegion } from '../shared-components/IgrAflRegion';

export const IgraphicsScoreboard = forwardRef(({ game, schema, homeColor, awayColor }: any, ref) => {
  const filterEvents = (team: Team) => game.events.filter(e => e.type == GameEventType.F_GOAL && e.team?._id == team._id);
  const homeEvents = sortBy(filterEvents(game.home.team), ['minute']);
  const awayEvents = sortBy(filterEvents(game.away.team), ['minute']);

  const [homeTeam, setHomeTeam] = useState(game.home.team.name);
  const [awayTeam, setAwayTeam] = useState(game.away.team.name);
  const [score, setScore] = useState(`${game.home.score.ft}:${game.away.score.ft}`);
  const [title, setTitle] = useState('конец матча');

  return (
    <div className={s.tableWrapper}>
      <div className={s.content}>
        <div className={s.region}>
          <IgrAflRegion light league={game.league} schema={schema} />
        </div>
        <div style={{ background: schema.colors.cardWrapperBg }} className={s.head}>
          <div className={`${s.team} ${s.home}`}>
            <BorderFormIcon fill={homeColor} height={235} width={235} className={`${s.borderForm} ${s.teamColor}`} />
            <BorderFormIcon fill={schema.colors.scoreBg} height={235} width={235} className={s.borderForm} />
            <TeamLogo className={s.teamLogo} team={game.home.team} height={200} />
            <input style={{ color: schema.colors.rowFont }} className={s.inputTeamName} onChange={e => setHomeTeam(e.target.value)} value={homeTeam} />
          </div>
          <div style={{ background: schema.colors.rowBg }} className={s.score}>
            <input style={{ color: schema.colors.r }} className={s.inputScore} onChange={e => setScore(e.target.value)} value={score} />
          </div>
          <div className={`${s.team} ${s.away}`}>
            <input style={{ color: schema.colors.rowFont }} className={s.inputTeamName} onChange={e => setAwayTeam(e.target.value)} value={awayTeam} />
            <TeamLogo className={s.teamLogo} team={game.away.team} height={200} />
            <BorderFormIcon fill={schema.colors.scoreBg} height={235} width={235} className={s.borderForm} />
            <BorderFormIcon fill={awayColor} height={235} width={235} className={`${s.borderForm} ${s.teamColor}`} />
          </div>
        </div>
        <div style={{ background: schema.colors.bg }} className={s.body}>
          <div className={s.bodyTitle}>
            <input value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          {range(0, Math.max(homeEvents.length, awayEvents.length)).map(idx => {
            const eventHome = homeEvents[idx];
            const eventAway = awayEvents[idx];
            return <IgrVideoResultsRow key={idx} eventHome={eventHome} eventAway={eventAway} schema={schema} idx={idx} />;
          })}
        </div>
      </div>
    </div>
  );
});
