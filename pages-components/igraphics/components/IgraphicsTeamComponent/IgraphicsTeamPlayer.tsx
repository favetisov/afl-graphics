import { useEffect, useState } from 'react';
import s from './IgraphicsTeamPlayer.module.scss';
import { IgrTeamLogo } from '@/pages-components/igraphics/components/shared-components/IgrTeamLogo';
import BorderIcon from '@public/icons/border.svg';
import { IgrElContainer } from '@/pages-components/igraphics/components/shared-components/IgrElContainer';
import { IgrPlayerPhoto } from '@/pages-components/igraphics/components/shared-components/IgrPlayerPhoto';

export const IgraphicsTeamPlayer = ({ league, position, mode, schema }: any) => {
  const [hidden, setHidden] = useState(false);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [lastMouseCoord, setLastMouseCoord] = useState({ x: 0, y: 0 });
  const [grabbing, setGrabbing] = useState(false);
  const [scale, setScale] = useState<number>();
  const [player, setPlayer] = useState<any>();
  const [playerName, setPlayerName] = useState('Player Name');

  const getScale = el => {
    if (!scale && el) {
      const transform = el.closest('.igr-container').style.transform;
      if (transform) {
        setScale(transform.split('(')[1].split(')')[0]);
        // el.parentElement.addEventListener('mousemove', (e) => onMouseMove(e));
        // el.parentElement.addEventListener('mouseup', (e) => onMouseUp(e));
      }
    }
  };

  useEffect(() => {
    setPlayerName(player?._id ? `${player?.firstName[0]}. ${player?.lastName}` : 'Player Name');
  }, [player]);

  const onMouseDown = e => {
    setGrabbing(true);
    setLastMouseCoord({ x: e.clientX, y: e.clientY });
  };

  const onMouseUp = e => {
    setGrabbing(false);
  };

  const onMouseMove = e => {
    if (grabbing) {
      const diffX = (lastMouseCoord.x - e.clientX) / scale;
      const diffY = (lastMouseCoord.y - e.clientY) / scale;
      setTranslate({ x: translate.x - diffX, y: translate.y - diffY });
      setLastMouseCoord({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <div
      ref={getScale}
      className={`${s.player} ${position} ${grabbing ? 'grabbing' : ''}  ${hidden ? s.hidden : null}`}
      style={{ transform: `translate(${translate.x}px, ${translate.y}px)` }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      <div className={`${s.info} ${hidden ? s.hidden : null}`}>
        <IgrElContainer onClose={() => setHidden(true)}>
          <div className={s.infoContent}>
            <div className={`${s.shirt} ${s.playerPhoto} ${hidden ? s.hidden : null}`}>
              <IgrPlayerPhoto league={league} className={s.photo} schema={schema} player={player} onChangePlayer={pl => setPlayer(pl)} />
              <BorderIcon style={{ fill: schema.colors.fieldPlayer }} className={s.borderIcon} />
            </div>

            <div className={s.name}>
              ig
              <div style={{ background: schema.colors.bar }} className={s.logo}>
                <IgrTeamLogo key={player?._id} logo={player?._id ? player?.teams[0]?.team?.logo : 'Барселона'} height={100} />
              </div>
              <input
                key={player?._id}
                style={{ color: schema.colors.rowFont, background: schema.colors.rowOdd }}
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
                className={s.nameInput}
              />
            </div>
          </div>
        </IgrElContainer>
      </div>
    </div>
  );
};
