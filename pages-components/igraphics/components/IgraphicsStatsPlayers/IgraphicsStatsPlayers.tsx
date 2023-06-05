import { forwardRef } from 'react';
import { IgrBackground } from '../shared-components/IgrBackground';
import { IgrAflRegion } from '../shared-components/IgrAflRegion';

import s from './IgraphicsStatsPlayers.module.scss';

export const IgraphicsStatsPlayers = forwardRef(({ game, schema, pattern }: any, ref) => {
  return (
    <div className={s.tableWrapper}>
      <IgrBackground schema={schema} pattern={pattern} />
      <IgrAflRegion light league={game.league} schema={schema} />

      <div className={s.content}>
        <div className={s.header}>
          <div className={s.title} style={{ color: schema.colors.linkFont }}>
            <input defaultValue={'топ-3 бомбардиры'} style={{ color: schema.colors.titleFont }} />
          </div>
          <div className={s.division}></div>
        </div>
      </div>
    </div>
  );
});
