import s from './IgrSubtitle.module.scss';
import { forwardRef, useEffect, useState } from 'react';
import { IgrElContainer } from './IgrElContainer';
import AutosizeInput from 'react-input-autosize';

export const IgrSubtitle = forwardRef(({ schema, first, second, light }: { first: string; second: string; schema: any; light?: boolean }, ref) => {
  const [hidden, setHidden] = useState(false);
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');

  useEffect(() => {
    if (first || second) {
      setFirstValue(first);
      setSecondValue(second);
    }
  }, [first, second]);

  let color = schema.colors.subTitleFont;

  if (light) {
    color = '#fff';
  }

  return (
    <div className={s.subtitle + ' ' + (hidden ? s.hidden : null)}>
      <IgrElContainer onClose={() => setHidden(true)}>
        <div className={s.row}>
          <AutosizeInput
            onChange={e => {
              setFirstValue(e.target.value);
            }}
            value={firstValue}
            inputStyle={{ fontSize: 100, color: color }}
          />
          <div className={s.delimiter} style={{ backgroundColor: light ? schema.colors.subTitleDelimiterLight : schema.colors.subTitleDelimiter }} />
          <AutosizeInput
            onChange={e => {
              setSecondValue(e.target.value);
            }}
            value={secondValue}
            inputStyle={{ fontSize: 100, color: color }}
          />
        </div>
      </IgrElContainer>
    </div>
  );
});
