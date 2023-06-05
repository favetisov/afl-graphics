import { forwardRef } from 'react';

import s from './IgrCardWrapper.module.scss';

export const IgrCardWrapper = forwardRef(({ schema, children }: any, ref) => {
  return (
    <div style={{ background: schema.colors.cardWrapperBg }} className={s.card}>
      {children}
    </div>
  );
});
