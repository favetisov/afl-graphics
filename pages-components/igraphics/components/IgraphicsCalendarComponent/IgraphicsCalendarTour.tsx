import { Game } from 'shared/schema/src/models/game.model';
import { IgrElContainer } from '../shared-components/IgrElContainer';
import s from './IgraphicsCalendarTour.module.scss';
import { IgraphicsCalendarTourRow } from './IgraphicsCalendarTourRow';
import { forwardRef, useState } from 'react';
import { StageFormat } from '@/shared/schema/src/models/stage.model';
import { translations, userState } from 'ftb-models';

export const IgraphicsCalendarTour = forwardRef(({ games, schema }: { games: Game[]; schema: any }, ref) => {
  const game = games[0];

  const [hidden, setHidden] = useState(false);
  const [title, setTitle] = useState(
    game.stage.format === StageFormat.cup ? translations.cup_rounds[userState.language][game.tourNumber] : game.tourNumber + ' ' + translations.round[userState.language],
  );

  return (
    <div className={`${s.container} ${hidden ? s.hidden : null}`}>
      <IgrElContainer onClose={() => setHidden(true)}>
        <div className={`${s.table}`}>
          <div className={s.tableHead}>
            <input onChange={e => setTitle(e.target.value)} className={s.inputTitle} value={title} />
          </div>
          <div style={{ background: schema.colors.rowEven }} className={s.tableBody}>
            {games.map((game: Game, idx) => {
              return <IgraphicsCalendarTourRow key={idx} idx={idx} game={game} schema={schema} />;
            })}
          </div>
        </div>
      </IgrElContainer>
    </div>
  );
});
