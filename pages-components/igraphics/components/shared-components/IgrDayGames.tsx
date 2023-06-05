import { IgraphicsResultStadiums } from '@/pages-components/igraphics/components/IgraphicsResultsComponent/IgraphicsResultStadiums';
import { groupBy } from 'lodash';
import { forwardRef } from 'react';

export const IgrDayGames = forwardRef(({ games, schema, mode }: any, ref) => {
  const gamesByStadium = groupBy(games, g => g.stadium?._id);

  return (
    <>
      {Object.values(gamesByStadium).map((gamesStadium: any) => {
        const gamesByPitch = groupBy(gamesStadium, g => g.pitch?.name);
        return Object.values(gamesByPitch).map((gamesPitch: any, idx: number) => (
          <IgraphicsResultStadiums games={games} gamesPitch={gamesPitch} schema={schema} mode={mode} key={'irs' + idx} />
        ));
      })}
    </>
  );
});
