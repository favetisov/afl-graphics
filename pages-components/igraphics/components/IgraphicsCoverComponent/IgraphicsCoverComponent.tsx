import s from './IgraphicsCoverComponent.module.scss';
import { IgrBackground } from '@/pages-components/igraphics/components/shared-components/IgrBackground';
import { IgrSubtitle } from '@/pages-components/igraphics/components/shared-components/IgrSubtitle';
import { IgrTitle } from '@/pages-components/igraphics/components/shared-components/IgrTitle';
import { IgrCardWrapper } from '../shared-components/IgrCardWrapper';
import { IgrAflRegion } from '@/pages-components/igraphics/components/shared-components/IgrAflRegion';
import { Game } from '@/shared/schema/src/models/game.model';
import { forwardRef, useState } from 'react';
import dayjs from 'dayjs';
import { IgrTeamLogo } from '@/pages-components/igraphics/components/shared-components/IgrTeamLogo';
import { Team } from '@/shared/schema/src/models/team.model';
import { Textarea } from '@mantine/core';
import { League } from '@/shared/schema/src/models/league.model';
import { userState } from 'ftb-models';
require('dayjs/locale/ru');

export const IgraphicsCoverComponent = forwardRef(({ game, schema, pattern, league }: { game: Game; league?: League; schema: any; pattern: any }) => {
  const [awayTeam, setAwayTeam] = useState(game.away.team.name);
  const [homeTeam, setHomeTeam] = useState(game.home.team.name);
  const [stadium, setStadium] = useState(game.stadium?.name);
  const [date, setDate] = useState(dayjs(game.date).locale(userState.language).format('DD MMMM YYYY'));
  const [time, setTime] = useState(dayjs(game.date).locale(userState.language).format('HH:mm'));

  const getFormColor = (team: Team, game: Game) => {
    const side = game.getTeamSide(team);
    if (side?.isWinner) {
      return '#00FF00';
    } else if (side?.isLoser) {
      return '#FF0000';
    } else {
      return '#FFFF00';
    }
  };

  return (
    <div className={s.tableWrapper}>
      <IgrCardWrapper schema={schema}>
        <IgrBackground schema={schema} pattern={pattern} key={'bg' + game._id} />
        <IgrSubtitle first={game.champ.name} second={game.season.name} schema={schema} key={'sub' + game._id} />
        <IgrTitle title={'День матча'} schema={schema} key={'ttl' + game._id} />
        <div className={s.content}>
          <div style={{ borderColor: schema.colors.bar }} className={s.info}>
            <div className={s.team}>
              <IgrTeamLogo height={700} logo={game.home.team.logo} />
              <Textarea
                maxRows={3}
                autosize
                ref={el => el?.style?.setProperty('--textAreaColor', schema.colors.rowFont)}
                style={{ color: 'red' }}
                className={s.quoteText}
                onChange={e => setHomeTeam(e.target.value)}
                value={homeTeam}
              />
            </div>
            <div className={s.score}>
              <input style={{ color: schema.colors.rowFont }} className={s.date} onChange={e => setDate(e.target.value)} value={date} />
              <div style={{ backgroundColor: schema.colors.titleBg }} className={s.time}>
                <input style={{ color: schema.colors.titleFont }} onChange={e => setTime(e.target.value)} value={time} />
              </div>
              <input style={{ color: schema.colors.rowFont }} className={s.stadium} onChange={e => setStadium(e.target.value)} value={stadium} />
            </div>
            <div className={s.team}>
              <IgrTeamLogo height={700} logo={game.away.team.logo} />
              <Textarea
                maxRows={3}
                autosize
                ref={el => el?.style?.setProperty('--textAreaColor', schema.colors.rowFont)}
                style={{ color: 'red' }}
                className={s.quoteText}
                onChange={e => setAwayTeam(e.target.value)}
                value={awayTeam}
              />
            </div>
          </div>
          {/*<div className={s.lastGames}>*/}
          {/*  <div className={s.home}>*/}
          {/*    {game.home.team.games.slice(0, 5).map(g => (*/}
          {/*      <ColorInput key={g._id} className={s.formIndicator} classNames={{ root: s.formIndicatorRoot }} defaultValue={getFormColor(game.home.team, g)} />*/}
          {/*    ))}*/}
          {/*  </div>*/}
          {/*  <div className={s.away}>*/}
          {/*    {game.home.team.games.slice(0, 5).map(g => (*/}
          {/*      <ColorInput key={g._id} className={s.formIndicator} classNames={{ root: s.formIndicatorRoot }} defaultValue={getFormColor(game.away.team, g)} />*/}
          {/*    ))}*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        <IgrAflRegion league={league} schema={schema} />
      </IgrCardWrapper>
    </div>
  );
});
