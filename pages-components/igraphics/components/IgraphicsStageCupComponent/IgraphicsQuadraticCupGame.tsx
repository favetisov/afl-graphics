import s from './IgraphicsQuadraticCupGame.module.scss';
import { IgraphicsQuadraticCupGameRow } from '@/pages-components/igraphics/components/IgraphicsStageCupComponent/IgraphicsQuadraticCupGameRow';
import { forwardRef, useEffect, useState } from 'react';

export const IgraphicsQuadraticCupGame = forwardRef(({ slot, schema }: any, ref) => {
  const [tour, setTour] = useState('');

  useEffect(() => {
    setTour(slot.tour);
  }, [slot]);

  return (
    <div className={s.game} id={slot.tour}>
      <input className={s.tour} value={tour} onChange={e => setTour(e.target.value)} />
      <div className={s.slot} ref={el => (slot.el = el)}>
        <IgraphicsQuadraticCupGameRow
          key={'home ' + slot.netPosition}
          schema={schema}
          teamLogo={slot.teamHome.logo}
          teamName={slot.teamHome.shortName}
          teamScore={slot.scoreHome}
          team={slot.teamHome}
        />
        <IgraphicsQuadraticCupGameRow
          key={'away ' + slot.netPosition}
          schema={schema}
          teamLogo={slot.teamAway.logo}
          teamName={slot.teamAway.shortName}
          teamScore={slot.scoreAway}
          team={slot.teamAway}
        />
      </div>
    </div>
  );
});
