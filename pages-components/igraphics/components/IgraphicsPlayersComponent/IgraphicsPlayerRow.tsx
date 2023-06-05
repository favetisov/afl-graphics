import { forwardRef, useState } from 'react';
import s from '@/pages-components/igraphics/components/IgraphicsPlayersComponent/IgraphicsPlayersComponent.module.scss';
import { PlayerPhoto } from '@/shared/shared-frontend/components/PlayerPhoto/PlayerPhoto';
import BorderIcon from '@public/icons/border.svg';
import { IgrTeamLogo } from '@/pages-components/igraphics/components/shared-components/IgrTeamLogo';
import { IgrElContainer } from '@/pages-components/igraphics/components/shared-components/IgrElContainer';
import { Team } from '@/shared/schema/src/models/team.model';

export const IgraphicsPlayerRow = forwardRef(({ category, row, schema }: any, ref) => {
  const [hidden, setHidden] = useState(false);

  const [teamName, setTeamName] = useState((Object.values(row.teams) as Team[])[0].name);
  const [playerName, setPlayerName] = useState(row.player.lastName + ' ' + row.player.firstName[0] + '.');
  const [value, setValue] = useState(row[category]);

  return (
    <div className={hidden ? s.hidden : null}>
      <IgrElContainer onClose={() => setHidden(true)}>
        <div className={`${s.player} ${hidden ? s.hidden : null}`} style={{ backgroundColor: schema.colors.rowOdd }}>
          <div className={s.playerPhoto}>
            <PlayerPhoto fill={schema.colors.bar} player={row.player} />
            <BorderIcon style={{ fill: schema.colors.bar }} className={s.borderIcon} />
            <BorderIcon style={{ fill: schema.colors.bar }} className={s.borderIconSecond} />
          </div>
          <div className={s.info}>
            <input style={{ color: schema.colors.rowFont }} value={playerName} onChange={e => setPlayerName(e.target.value)} className={s.playerName} />
            <div className={s.team}>
              <IgrTeamLogo logo={(Object.values(row.teams) as Team[])[0].logo} height={50} key={(Object.values(row.teams)[0] as any)._id} />
              <input style={{ color: schema.colors.rowFont }} value={teamName} onChange={e => setTeamName(e.target.value)} className={s.playerTeam} />
            </div>
          </div>
          <input style={{ color: schema.colors.rowFont, borderColor: schema.colors.rowBorder }} value={value} onChange={e => setValue(e.target.value)} className={s.value} />
        </div>
      </IgrElContainer>
    </div>
  );
});
