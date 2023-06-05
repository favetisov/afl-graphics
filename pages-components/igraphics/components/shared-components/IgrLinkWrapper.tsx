import s from './IgrLinks.module.scss';
import { IgrElContainer } from './IgrElContainer';
import { FC, PropsWithChildren, useState } from 'react';

export const IgrLinkWrapper: FC<PropsWithChildren> = ({ children }) => {
  const [hidden, setHidden] = useState(false);

  return (
    <div className={`${s.linkWrapper} ${hidden ? s.hidden : null}`}>
      <IgrElContainer onClose={() => setHidden(true)}>
        <div className={s.link}>{children}</div>
      </IgrElContainer>
    </div>
  );
};
