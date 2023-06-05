import { forwardRef, useEffect, useState } from 'react';
import AflLogo from '@public/icons/afl-logo.svg';
import s from './IgrRegion.module.scss';
import AutosizeInput from 'react-input-autosize';
import { City } from '@/shared/schema/src/models/city.model';
import { League } from '@/shared/schema/src/models/league.model';

export const IgrAflRegion = forwardRef(({ city, schema, light, league }: { city?: City; schema: any; light?: boolean; league?: League }, ref) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (city) {
      setValue(city?.name);
    }
    if (league) {
      let leagueName = league.name.slice(0, 3) == 'AFL' ? league.name.substring(4) : league.name;
      setValue(leagueName);
    }
  }, [city]);

  return (
    <div className={s.region}>
      <AflLogo fill={light ? schema?.colors?.titleFont : schema?.colors?.subTitleFont} height={180} width={230} className={s.logo} />
      <AutosizeInput
        className={s.input}
        onChange={e => {
          setValue(e.target.value);
        }}
        value={value}
        inputStyle={{ fontSize: 100, color: light ? schema?.colors?.titleFont : schema?.colors?.subTitleFont }}
      />
    </div>
  );
});
