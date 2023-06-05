import { Stage } from '@/shared/schema/src/models/stage.model';
import { forwardRef } from 'react';
import s from './IgraphicsStageCupComponent.module.scss';
import { IgrAflRegion } from '../shared-components/IgrAflRegion';
import { IgrBackground } from '@/pages-components/igraphics/components/shared-components/IgrBackground';
import { IgrSubtitle } from '@/pages-components/igraphics/components/shared-components/IgrSubtitle';
import { IgrTitle } from '@/pages-components/igraphics/components/shared-components/IgrTitle';
import { IgraphicsQuadraticCupComponent } from '@/pages-components/igraphics/components/IgraphicsStageCupComponent/IgraphicsQuadraticCup.component';

export const IgraphicsStageCupComponent = forwardRef(({ schema, pattern, stage }: { schema: any; pattern: any; stage: Stage }, ref) => {
  return (
    <div className={s.tableWrapper}>
      <IgrBackground schema={schema} pattern={pattern} key={'bg' + stage._id} />
      <div className={s.title}>
        <IgrSubtitle light first={stage.season.champ.name} second={stage.season.name} schema={schema} key={'sub' + stage.season._id} />
        <IgrTitle light title={stage.name} schema={schema} key={'stg' + stage._id} />
      </div>

      <div className={s.container}>
        <IgraphicsQuadraticCupComponent schema={schema} stage={stage} />
      </div>
      <div className={s.region}>
        <IgrAflRegion light league={stage.season.champ.country.league} schema={{ colors: { titleFont: '#fff' } }} />
      </div>
    </div>
  );
});
