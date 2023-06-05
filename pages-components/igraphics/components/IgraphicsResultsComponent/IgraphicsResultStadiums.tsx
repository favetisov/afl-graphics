import s from '@/pages-components/igraphics/components/shared-components/IgrDayGames.module.scss';
import { IgrElContainer } from '@/pages-components/igraphics/components/shared-components/IgrElContainer';
import { IgrGame } from '@/pages-components/igraphics/components/shared-components/IgrGame';
import { Game } from '@/shared/schema/src/models/game.model';
import { userState } from 'ftb-models';
import sortBy from 'lodash-es/sortBy';
import { useState } from 'react';

require('dayjs/locale/ru');

export const IgraphicsResultStadiums = ({ schema, games, gamesPitch, mode }) => {
  const [hidden, setHidden] = useState(false);
  const [date, setDate] = useState(games[0]?.dt?.locale(userState.language).format('DD MMMM (dddd)'));
  const [stadium, setStadium] = useState(
    (gamesPitch[0]?.stadium ? gamesPitch[0]?.stadium.name : 'Стадинон не задан') + ' ' + (gamesPitch[0]?.pitch?._id ? ', ' + gamesPitch[0]?.pitch?.name : ''),
  );

console.log(schema.colors.rowEven);

  return (
    <IgrElContainer onClose={() => setHidden(true)}>
      <div className={s.table + ' ' + (hidden ? s.hidden : '')}>
        <div style={{ background: schema.colors.rowEven }} className={s.tableHead}>
          <input style={{ color: schema.colors.rowFont }} value={date} onChange={e => setDate(e.target.value)} />
          <input style={{ color: schema.colors.bar }} value={stadium} onChange={e => setStadium(e.target.value)} />
        </div>
        <div className={s.tableBody}>
          {sortBy(gamesPitch, [g => g.dt]).map((game: Game, idx) => {
            return <IgrGame key={game._id} idx={idx} game={game} schema={schema} mode={mode} />;
          })}
        </div>
      </div>
    </IgrElContainer>
  );
};
