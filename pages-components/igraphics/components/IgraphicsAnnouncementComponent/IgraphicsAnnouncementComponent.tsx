import s from './IgraphicsAnnouncementComponent.module.scss';
import { forwardRef, useState } from 'react';
import { IgrBackground } from '../shared-components/IgrBackground';

export const IgraphicsAnnouncementComponent = forwardRef(({ schema, pattern, mode }: any, ref) => {
  const [value, setValue] = useState('Дети 2015');

  return (
    <div className={s.tableWrapper}>
      <IgrBackground schema={schema} pattern={pattern} />
      <div className={s.title}>
        <input value={value} onChange={e => setValue(e.target.value)} className={s.text} />
      </div>
    </div>
  );
});
