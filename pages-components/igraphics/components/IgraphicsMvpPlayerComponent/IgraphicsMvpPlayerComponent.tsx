import { IgrBackground } from '../shared-components/IgrBackground';
import { IgrTeamLogo } from '../shared-components/IgrTeamLogo';
import s from './IgraphicsMvpPlayerComponent.module.scss';
import { IgrAflRegion } from '@/pages-components/igraphics/components/shared-components/IgrAflRegion';
import { IgrElContainer } from '@/pages-components/igraphics/components/shared-components/IgrElContainer';
import { PhotoLoader } from '@/shared/shared-frontend/components/PhotoLoader/PhotoLoader';
import { forwardRef, useEffect, useState } from 'react';
import AutosizeInput from 'react-input-autosize';

export const IgraphicsMvpPlayerComponent = forwardRef(({ league, schema, pattern, mode }: any, ref) => {
  const [title, setTitle] = useState('MVP ТУРА');
  const [hidden, setHidden] = useState(false);

  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');

  const [playerName, setPlayerName] = useState('Лео Месси');
  const [teamName, setTeamName] = useState('Barcelona');

  const getWidthWord = (value: string) => (value.length > 10 ? (180 - value.length) * 1.1 : 180);

  useEffect(() => {
    setTimeout(() => {
      setFirstValue('Дивизион');
      setSecondValue('Тур');
    }, 100);
  }, []);

  return (
    <div className={s.tableWrapper}>
      <IgrBackground schema={schema} pattern={pattern} />
      <div className={s.region}>
        <div className={s.regionContent}>
          <IgrAflRegion light league={league} schema={schema} />
        </div>
      </div>

      <div className={s.content}>
        <div className={s.title} style={{ color: schema.colors.linkFont, background: schema.colors.titleBg }}>
          <input onChange={e => setTitle(e.target.value)} value={title} style={{ color: schema.colors.titleFont, width: `${title.length * getWidthWord(title)}px` }} />
        </div>
        <div key={schema?.value} style={{ background: schema.colors.cardWrapperBg }} className={s.info}>
          <IgrTeamLogo height={350} logo={'Барселона'} />

          <div className={s.name}>
            <AutosizeInput
              onChange={e => {
                setPlayerName(e.target.value);
              }}
              value={playerName}
              className={s.player}
              inputStyle={{ fontSize: 160, color: schema.colors.rowFont }}
            />
            <AutosizeInput
              onChange={e => {
                setTeamName(e.target.value);
              }}
              value={teamName}
              className={s.team}
              inputStyle={{ fontSize: 160, color: schema.colors.rowFont }}
            />
          </div>
        </div>
        <div className={s.division}>
          <div className={s.divisionContent}>
            <div className={s.subtitle + ' ' + (hidden ? s.hidden : null)}>
              <IgrElContainer onClose={() => setHidden(true)}>
                <div style={{ backgroundColor: schema.colors.bg }} className={s.row}>
                  <AutosizeInput
                    onChange={e => {
                      setFirstValue(e.target.value);
                    }}
                    value={firstValue}
                    inputStyle={{ fontSize: 100, color: schema.colors.titleFont }}
                  />
                  <div className={s.delimiter} style={{ backgroundColor: schema.colors.subTitleDelimiter }} />
                  <AutosizeInput
                    onChange={e => {
                      setSecondValue(e.target.value);
                    }}
                    value={secondValue}
                    inputStyle={{ fontSize: 100, color: schema.colors.titleFont }}
                  />
                </div>
              </IgrElContainer>
            </div>
          </div>
        </div>
      </div>

      <div className={s.photo}>
        <svg className={s.svg}>
          <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
            <path d="M0.231,0.852 C0.338,0.931,0.456,1,0.503,1 C0.549,0.999,0.666,0.93,0.773,0.851 C0.879,0.773,0.981,0.681,0.996,0.637 C1,0.592,0.982,0.457,0.941,0.329 C0.901,0.2,0.845,0.071,0.808,0.043 C0.771,0.015,0.635,0,0.503,0 C0.369,0,0.232,0.013,0.193,0.041 L0.192,0.041 C0.155,0.07,0.099,0.198,0.058,0.327 C0.018,0.455,-0.011,0.591,0.004,0.635 C0.019,0.68,0.123,0.773,0.231,0.852"></path>
          </clipPath>
        </svg>
        <div className={s.clipped}>
          <PhotoLoader defaultUrl={'/igraphics/demo/messi.jpg'} onImg={() => {}} height={5000} width={5000} />
        </div>
      </div>
    </div>
  );
});
