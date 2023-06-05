import { forwardRef, useState } from 'react';
import { Game } from '@/shared/schema/src/models/game.model';
import s from './IgraphicsCoverPhotoComponent.module.scss';
import { PhotoLoader } from '@/shared/shared-frontend/components/PhotoLoader/PhotoLoader';
import BorderIcon from '@public/icons/border.svg';
import { IgrBackground } from '@/pages-components/igraphics/components/shared-components/IgrBackground';
import { IgrSubtitle } from '@/pages-components/igraphics/components/shared-components/IgrSubtitle';
import { IgrAflRegion } from '@/pages-components/igraphics/components/shared-components/IgrAflRegion';
import AutosizeInput from 'react-input-autosize';
import { IgrTeamLogo } from '@/pages-components/igraphics/components/shared-components/IgrTeamLogo';
import { Textarea } from '@mantine/core';
import dayjs from 'dayjs';
import { userState } from 'ftb-models';
require('dayjs/locale/ru');

export const IgraphicsCoverPhotoComponent = forwardRef(({ game, schema, pattern }: { game: Game; schema: any; pattern: any }, ref) => {
  const [firstText, setFirstText] = useState('Прямая');
  const [secondText, setSecondText] = useState('Трансляция');
  const [date, setDate] = useState(dayjs(game.date).isValid() ? dayjs(game.date).locale(userState.language).format('DD MMMM YYYY') : '27 may 2022');

  const [awayTeam, setAwayTeam] = useState(game.away.team.name);
  const [homeTeam, setHomeTeam] = useState(game.home.team.name);
  const [stadium, setStadium] = useState(game.stadium?.name);
  const [time, setTime] = useState(dayjs(game.date).isValid() ? dayjs(game.date).locale(userState.language).format('HH:mm') : '12:00');

  return (
    <div className={s.tableWrapper}>
      <div className={s.container}>
        <IgrBackground className={s.background} schema={schema} pattern={pattern} key={'bg' + game._id} />
        <IgrSubtitle light first={game.champ.name} second={game.season.name} schema={schema} key={'sub' + game._id} />
        <div className={s.name}>
          <div className={s.first} style={{ color: schema.colors.linkFont, background: schema.colors.titleBg }}>
            <AutosizeInput onChange={e => setFirstText(e.target.value)} value={firstText} inputStyle={{ fontSize: 150, color: schema.colors.titleFont }} />
          </div>
          <div className={s.second} style={{ color: schema.colors.linkFont, background: schema.colors.titleBg }}>
            <AutosizeInput onChange={e => setSecondText(e.target.value)} value={secondText} inputStyle={{ fontSize: 150, color: schema.colors.titleFont }} />
          </div>
          <div className={s.date} style={{ color: schema.colors.linkFont, background: schema.colors.titleBg }}>
            <AutosizeInput onChange={e => setDate(e.target.value)} value={date} inputStyle={{ fontSize: 100, color: schema.colors.titleFont }} />
          </div>
        </div>
        <div className={s.content}>
          <div style={{ background: schema.colors.cardWrapperBg }} className={s.info}>
            <div className={s.team}>
              <IgrTeamLogo height={550} logo={game.home.team.logo} />
              <Textarea
                maxRows={3}
                autosize
                ref={el => el?.style?.setProperty('--textAreaColor', schema.colors.rowFont)}
                style={{ color: 'red' }}
                className={s.quoteText}
                onChange={e => setHomeTeam(e.target.value)}
                value={homeTeam}
              />
            </div>
            <div className={s.score}>
              <div style={{ backgroundColor: schema.colors.titleBg }} className={s.time}>
                <input style={{ color: schema.colors.titleFont }} onChange={e => setTime(e.target.value)} value={time} />
              </div>
              <input style={{ color: schema.colors.rowFont }} className={s.stadium} onChange={e => setStadium(e.target.value)} value={stadium} />
            </div>
            <div className={s.team}>
              <IgrTeamLogo height={550} logo={game.away.team.logo} />
              <Textarea
                maxRows={3}
                autosize
                ref={el => el?.style?.setProperty('--textAreaColor', schema.colors.rowFont)}
                style={{ color: 'red' }}
                className={s.quoteText}
                onChange={e => setAwayTeam(e.target.value)}
                value={awayTeam}
              />
            </div>
          </div>
        </div>
        <IgrAflRegion light league={game.league} schema={schema} />
      </div>
      <div className={s.playerPhoto}>
        <PhotoLoader className={s.photo} defaultUrl={'/igraphics/demo/messi.jpg'} onImg={() => {}} height={3500} width={3500} />
        <BorderIcon style={{ fill: schema.colors.bar }} className={s.borderIcon} />
      </div>
    </div>
  );
});
