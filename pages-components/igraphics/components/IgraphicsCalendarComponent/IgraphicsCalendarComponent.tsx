import { observer } from 'mobx-react-lite';
import { forwardRef } from 'react';
import s from './IgraphicsCalendarComponent.module.scss';
import { IgrBackground } from '../shared-components/IgrBackground';
import { IgrTitle } from '../shared-components/IgrTitle';
import { IgrSubtitle } from '../shared-components/IgrSubtitle';
import { groupBy } from 'lodash';
import { Game } from 'shared/schema/src/models/game.model';
import { IgraphicsCalendarTour } from './IgraphicsCalendarTour';
import { IgrAflRegion } from '@/pages-components/igraphics/components/shared-components/IgrAflRegion';

export const IgraphicsCalendarComponent = forwardRef(({ season, schema, pattern, mode }: any, ref) => {
  if (!season) return;
  if (!schema) return;

  const games: Game[] = season.stages.reduce((games, stage) => {
    // games.push(...season?.games);

    stage?.games?.forEach(g => {
      games.push(g);
    });

    return games;
  }, []);

  const calendar = groupBy(games, 'tourNumber');

  return (
    <div className={s.tableWrapper}>
      <IgrBackground schema={schema} pattern={pattern} key={'bg' + season._id} />
      <IgrSubtitle light first={season.champ.name} second={season.name} schema={schema} key={'sub' + season._id} />
      <IgrTitle light title={'Календарь'} schema={schema} key={'ttl' + mode + season._id} />

      <div className={s.container}>
        {Object.values(calendar).map((games: Game[], idx) => (
          <IgraphicsCalendarTour schema={schema} key={idx} games={games} />
        ))}
      </div>

      <IgrAflRegion light league={season.champ.country.league} schema={schema} />
    </div>
  );
});
