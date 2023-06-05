import { useState } from 'react';
import { Stadium } from '@/shared/schema/src/models/stadium.model';

import s from './StadiumPhoto.module.scss';

import StadiumIcon from '@/public/icons/afl-stadium.svg';

export const StadiumPhoto = ({ stadium, height }: { stadium: Stadium; height: number }) => {
  const [error, setError] = useState(false);
  const width = height * 1.75;

  if (!error) {
    const src = 'https://storage.yandexcloud.net/img/stadiums-photos/' + stadium._id + '.jpg?version=' + stadium.photoId;
    return (
      <div className="image-border-container">
        <img style={{ height: height + 'px', width: width + 'px' }} src={src} alt={stadium.name} onError={() => setError(true)} />
      </div>
    );
  } else {
    return (
      <div style={{ height: height + 'px', width: width + 'px' }} className={`post-placeholder ${s.stadiumIcon}`}>
        <StadiumIcon style={{ height: height / 2 + 'px', width: width / 2 + 'px' }} />
      </div>
    );
  }
};
