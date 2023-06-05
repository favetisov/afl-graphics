import s from './IgraphicsTop5PlayerComponent.module.scss';
import { IgraphicsTop5PlayerPhotoComponent } from '@/pages-components/igraphics/components/IgraphicsTop5PlayersComponent/IgraphicsTop5PlayerPhotoComponent';
import { IgrElContainer } from '@/pages-components/igraphics/components/shared-components/IgrElContainer';
import { IgrTeamLogo } from '@/pages-components/igraphics/components/shared-components/IgrTeamLogo';
import { Team } from '@/shared/schema/src/models/team.model';
import { useEffect, useState } from 'react';

export const IgraphicsTop5PlayerComponent = ({ schema, playerStats, category, season }: any) => {
  const [hidden, setHidden] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [value, setValue] = useState('');
  const [statsPlayer, setStatsPlayer] = useState(null);

  const onChangePlayer = pl => {
    setStatsPlayer(pl);
  };

  useEffect(() => {
    if (statsPlayer) {
      setPlayerName(statsPlayer.player.firstName + ' ' + statsPlayer.player.lastName);
      setTeamName((Object.values(statsPlayer.teamsMap) as Team[])[0]?.name);
      setValue(statsPlayer[category]);
    }
  }, [statsPlayer]);

  useEffect(() => {
    setPlayerName(playerStats.player.firstName + ' ' + playerStats.player.lastName);
    setTeamName((Object.values(playerStats.teamsMap) as Team[])[0]?.name);
    setValue(playerStats[category]);
  }, [playerStats]);

  return (
    <div className={hidden ? s.hidden : null}>
      <IgrElContainer onClose={() => setHidden(true)}>
        <div className={s.player} style={{ backgroundColor: schema.colors.rowOdd }}>
          <IgraphicsTop5PlayerPhotoComponent
            schema={schema}
            playerStats={statsPlayer ? statsPlayer : playerStats}
            category={category}
            season={season}
            onChangePlayer={onChangePlayer}
          />
          <div className={s.info}>
            <input style={{ color: schema.colors.rowFont }} value={playerName} onChange={e => setPlayerName(e.target.value)} className={s.playerName} />
            <div className={s.team}>
              <IgrTeamLogo
                logo={statsPlayer ? (Object.values(statsPlayer.teamsMap) as Team[])[0]?.logo : (Object.values(playerStats.teamsMap) as Team[])[0]?.logo}
                height={100}
                key={statsPlayer ? (Object.values(statsPlayer.teamsMap) as Team[])[0]?._id : (Object.values(playerStats.teamsMap) as Team[])[0]?._id}
              />
              <input style={{ color: schema.colors.rowFont }} value={teamName} onChange={e => setTeamName(e.target.value)} className={s.playerTeam} />
            </div>
          </div>
          <div className={s.value}>
            <input style={{ color: schema.colors.rowFont }} value={value} onChange={e => setValue(e.target.value)} className={s.playerTeam} />
          </div>
        </div>
      </IgrElContainer>
    </div>
  );
};
