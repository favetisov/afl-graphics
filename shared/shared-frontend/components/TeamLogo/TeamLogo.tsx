import { useState } from 'react';
import { ShieldChevron as ShieldIcon } from 'tabler-icons-react';
import { env } from '@/shared/env/env';

export const TeamLogo = ({ team, height, className }: any) => {
  const width = height;
  const [error, setError] = useState(false);

  // const url = (size: 'min' | 'min2x' | 'middle' | 'max', format: 'webp' | 'png' = 'webp') => {
  //   return 'https://storage.yandexcloud.net' + `/ftb-logos/${team.logo}-max-` + size + '.' + format + `?logoId=${team.logoId}`;
  // };

  const url = (size: 'min' | 'middle' | 'max' | 'min2x', format: 'webp' | 'png' = 'png') => {
    return env.imgHost + `img/logos/${team.logo}-` + size + '.' + format + `?logoId=${team?.logoId || 1}`;
  };

  const onImgFail = (el: HTMLImageElement) => {
    el.style.display = 'none';
    setError(true);
  };

  const onImgLoad = (el: HTMLImageElement) => {
    el.style.opacity = '1';
  };

  const render = () => {
    let size: 'min' | 'max' | 'middle' = 'min';

    if (height > 400) {
      size = 'middle';
    } else if (height > 600) {
      size = 'max';
    }

    if (team && !error) {
      return (
        <picture style={{ height: height + 'px', width: width + 'px' }}>
          {/*<source srcSet={url(size) + ', ' + url('min2x') + ' 2x'} style={{ height: height + 'px', width: width + 'px' }} />*/}
          <source srcSet={url(size)} style={{ height: height + 'px', width: width + 'px' }} />
          <img
            src={url(size, 'png')}
            alt={team.name}
            title={team.name}
            onError={e => onImgFail(e.target as HTMLImageElement)}
            onLoad={e => onImgLoad(e.target as HTMLImageElement)}
            style={{ height: height + 'px', width: width + 'px', opacity: 0 }}
          />
          <source srcSet={url(size)} style={{ height: height + 'px', width: width + 'px' }} />
        </picture>
      );
    } else {
      return <ShieldIcon style={{ width, height }} className={className} />;
    }
  };
  return (
    <div className={className} style={{ height: height + 'px', width: width + 'px' }} key={team._id}>
      {render()}
    </div>
  );
};
