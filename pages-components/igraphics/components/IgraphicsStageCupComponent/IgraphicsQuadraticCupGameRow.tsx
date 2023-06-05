import s from '@/pages-components/igraphics/components/IgraphicsStageCupComponent/IgraphicsQuadraticCupGame.module.scss';
import { IgrTeamLogo } from '@/pages-components/igraphics/components/shared-components/IgrTeamLogo';
import { forwardRef, useEffect, useState } from 'react';

export const IgraphicsQuadraticCupGameRow = forwardRef(({ game, schema, teamLogo, teamName, teamScore, team }: any, ref) => {
  const [name, setName] = useState('');
  const [scoreResult, setScoreResult] = useState([]);

  useEffect(() => {
    setName(teamName);
    setScoreResult(teamScore);
  }, [team]);

  const onChangeScore = (value, score, idx, type: 'pen' | 'ft') => {
    let prevScore = scoreResult;
    prevScore[idx][type] = value;
    setScoreResult([...prevScore]);
  };

  if (!team) {
    return <div className={s.team} style={{ backgroundColor: schema.colors.rowOdd }} />;
  }

  return (
    <div className={s.team} style={{ backgroundColor: schema.colors.rowOdd }}>
      <IgrTeamLogo logo={teamLogo} />
      <div className={s.name}>
        <input onChange={e => setName(e.target.value)} value={name} style={{ color: schema.colors.rowFont }} />
      </div>
      {scoreResult.map((sc, idx) => (
        <div key={idx} ref={el => el?.style?.setProperty('--borderColor', schema.colors.rowFont)} style={{ color: schema.colors.rowFont }} className={s.score}>
          <input style={{ color: schema.colors.rowFont }} onChange={e => onChangeScore(e.target.value, sc, idx, 'ft')} value={sc.ft} />
          {sc.hasPen && <input style={{ color: schema.colors.rowFont }} onChange={e => onChangeScore(e.target.value, sc, idx, 'pen')} value={sc.pen} className={s.scorePen} />}
        </div>
      ))}
    </div>
  );
});
