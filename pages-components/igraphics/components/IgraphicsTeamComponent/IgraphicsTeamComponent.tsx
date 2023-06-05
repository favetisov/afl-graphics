import s from './IgraphicsTeamComponent.module.scss';
import { IgrBackground } from '@/pages-components/igraphics/components/shared-components/IgrBackground';
import { IgrTitle } from '@/pages-components/igraphics/components/shared-components/IgrTitle';
import { IgrSubtitle } from '@/pages-components/igraphics/components/shared-components/IgrSubtitle';
import { IgrAflRegion } from '@/pages-components/igraphics/components/shared-components/IgrAflRegion';
import FieldBg from '@/public/icons/field.svg';
import { IgraphicsTeamPlayer } from './IgraphicsTeamPlayer';
import { forwardRef } from 'react';

export const IgraphicsTeamComponent = forwardRef(({ league, schema, pattern, mode }: any, ref) => {
  if (!schema) return;

  return (
    <div className={s.tableWrapper}>
      <IgrBackground schema={schema} pattern={pattern} />
      <IgrSubtitle light first={'Дивизион'} second={'тур'} schema={schema} />
      <IgrTitle light title={'команда недели'} schema={schema}></IgrTitle>

      <div
        key={schema?.value}
        ref={el => {
          el?.style?.setProperty('--field-background', schema.colors.fieldBg);
          el?.style?.setProperty('--field-stroke', schema.colors.fieldBorder);
        }}
        className={s.fieldWrapper}
      >
        <FieldBg className={s.fieldBg} width={3500} height={3200} />
        {['GK', 'RB', 'CB', 'LB', 'CM', 'LM', 'RM', 'CF'].map((position, idx) => (
          <IgraphicsTeamPlayer schema={schema} position={position} key={idx} league={league} />
        ))}
      </div>

      <IgrAflRegion light league={league} schema={schema} />
    </div>
  );
});
