import s from './IgraphicsBirthdaysComponent.module.scss';
import { forwardRef, useState } from 'react';
import { IgrElContainer } from '../shared-components/IgrElContainer';
import { IgrTeamLogo } from '@/pages-components/igraphics/components/shared-components/IgrTeamLogo';
import { PlayerPhoto } from '@/shared/shared-frontend/components/PlayerPhoto/PlayerPhoto';
import BorderIcon from '@public/icons/border.svg';
import { Team } from '@/shared/schema/src/models/team.model';
import dayjs from 'dayjs';
import { userState } from 'ftb-models';
require('dayjs/locale/ru');

export const IgraphicsBirthdaysPlayer = forwardRef(({ playerStats, schema, idx }: any, ref) => {
  const [hidden, setHidden] = useState(false);

  const [playerName, setPlayerName] = useState(playerStats.player.firstName + ' ' + playerStats.player.lastName);
  const [teamName, setTeamName] = useState((Object.values(playerStats.teamsMap) as Team[])[0]?.name);
  const [date, setDate] = useState(dayjs(playerStats.player.birthdayDate).locale(userState.language).format('DD MMMM'));

  return (
    <div className={hidden ? s.hidden : null}>
      <IgrElContainer onClose={() => setHidden(true)}>
        <div className={s.player} style={{ backgroundColor: schema.colors.rowOdd }} key={idx}>
          <div className={s.playerPhoto}>
            <PlayerPhoto fill={schema.colors.bar} player={playerStats.player} key={playerStats.player._id} />
            <BorderIcon style={{ fill: schema.colors.bar }} className={s.borderIcon} />
          </div>
          <div className={s.info}>
            <input style={{ color: schema.colors.rowFont }} value={playerName} onChange={e => setPlayerName(e.target.value)} className={s.playerName} />
            <div className={s.team}>
              <IgrTeamLogo logo={(Object.values(playerStats.teamsMap) as Team[])[0]?.logo} height={100} key={(Object.values(playerStats.teamsMap) as Team[])[0]?._id} />
              <input style={{ color: schema.colors.rowFont }} value={teamName} onChange={e => setTeamName(e.target.value)} className={s.playerTeam} />
            </div>
          </div>
          <input style={{ color: schema.colors.rowFont, borderColor: schema.colors.rowBorder }} className={s.value} value={date} onChange={e => setDate(e.target.value)} />
        </div>
      </IgrElContainer>
    </div>
  );
});
