import s from './IgraphicsAchievementTeamComponent.module.scss';
import { forwardRef, useState } from 'react';
import { IgrSubtitle } from '../shared-components/IgrSubtitle';

export const IgraphicsAchievementTeamComponent = forwardRef(({ schema, pattern, mode }: any, ref) => {
  const [teamName, setTeamName] = useState('FC CHELSEA');

  return (
    <div className={s.tableWrapper}>
      <IgrSubtitle first={'CL'} second={'WINNERS'} schema={schema} />

      <div className={s.title}>
        <input className={s.playerName} value={teamName} onChange={e => setTeamName(e.target.value)} />
      </div>
    </div>
  );
});
