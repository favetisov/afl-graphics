import { forwardRef, useState } from 'react';
import { IgrTeamLogo } from './IgrTeamLogo';

import s from './IgrTopPLayersRow.module.scss';

export const IgrTopPLayersRow = forwardRef(({ playerStats, schema, category, big }: any, ref) => {
  const [playerName, setPlayerName] = useState(`${playerStats.player.lastName} ${playerStats.player.firstName[0]}.`);
  const [stats, setStats] = useState(playerStats[category]);

  return (
    <div style={{ background: schema.colors.rowEven }} className={`${s.player} ${big ? s.big : ''}`}>
      <IgrTeamLogo height={120} logo={Object.values(playerStats?.teams)[0]['logo']} />
      <input style={{ color: schema.colors.rowFont }} className={s.name} value={playerName} onChange={e => setPlayerName(e.target.value)} />
      <input style={{ color: schema.colors.rowFont }} className={s.stats} value={stats} onChange={e => setStats(e.target.value)} />
    </div>
  );
});
