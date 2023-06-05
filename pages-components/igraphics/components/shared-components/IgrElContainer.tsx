import s from './IgrElContainer.module.scss';
import { CircleX as XIcon } from 'tabler-icons-react';

export const IgrElContainer = ({ onClose, children }) => {
  return (
    <div className={'color ' + s.containerWrapper}>
      <XIcon onClick={() => onClose()} className={s.closeIcon} />
      {children}
    </div>
  );
};
