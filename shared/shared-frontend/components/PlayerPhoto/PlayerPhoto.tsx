import { useState } from 'react';
import { UserCircle as UserIcon } from 'tabler-icons-react';
import BorderIcon from '../../../../public/icons/border.svg';
import s from './PlayerPhoto.module.scss';
import { env } from '@/shared/env/env';

export const PlayerPhoto = ({ player, height, className, fill }: any) => {
  const width = height;
  const [error, setError] = useState(false);

  // const url = () => {
  //   return 'https://storage.yandexcloud.net' + '/ftb-players/' + player?.photoUrl + '.jpg?version=' + player?.photoId;
  // };
  const url = () => {
    return env.imgHost + '/img/players/' + player._id + '.jpg?version=' + player.photoId;
  };

  const onImgFail = (el: HTMLImageElement) => {
    el.style.display = 'none';
    setError(true);
  };

  const onImgLoad = (el: HTMLImageElement) => {
    el.style.opacity = '1';
  };

  const playerName = `${player?.firstName} ${player?.lastName}`;

  const render = () => {
    if (!player || !error) {
      return (
        <picture style={{ height: height + 'px', width: width + 'px' }}>
          <source srcSet={url()} style={{ height: height + 'px', width: width + 'px' }} />
          <img
            src={url()}
            alt={playerName}
            title={playerName}
            onError={e => onImgFail(e.target as HTMLImageElement)}
            onLoad={e => onImgLoad(e.target as HTMLImageElement)}
            style={{ height: height + 'px', width: width + 'px', opacity: 0 }}
          />
          {height > 50 && <source srcSet={url()} style={{ height: height + 'px', width: width + 'px' }} />}
          {height > 200 && <source srcSet={url()} style={{ height: height + 'px', width: width + 'px' }} />}
        </picture>
      );
    } else {
      return (
        <div className={s.userIconWrapper}>
          <UserIcon className={`${s.userIcon} user-icon ${className}`} />
        </div>
      );
    }
  };
  return (
    <div className={`${s.playerPhoto} ${className}`} style={{ height: height + 'px', width: width + 'px', overflow: 'hidden' }} key={player._id}>
      <BorderIcon style={{ fill }} className={s.borderIcon} key={fill} />
      <div className={s.photoWrapper}>{render()}</div>
    </div>
  );
};
