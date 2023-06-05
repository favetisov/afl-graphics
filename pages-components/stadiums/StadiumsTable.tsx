import { Stadium } from '@/shared/schema/src/models/stadium.model';
import { FtbTable } from '@/shared/shared-frontend/components/FtbTable/FtbTable';
import s from './StadiumsTable.module.scss';
import { StadiumPhoto } from '@/shared/shared-frontend/components/StadiumPhoto/StadiumPhoto';

import { Eye as EyeIcon } from 'tabler-icons-react';
import { EyeOff as EyeOffIcon } from 'tabler-icons-react';

export const StadiumsTable = ({ stadiums }: { stadiums: Stadium[] }) => {
  return (
    <FtbTable
      entities={stadiums}
      className={s.table}
      rowHeight={55}
      rowHref={row => '/stadiums/' + row._id}
      columns={[
        {
          name: 'Show',
          className: s.showTd,
          render: row => <div className={s.show}>{row?.show ? <EyeIcon /> : <EyeOffIcon />}</div>,
        },
        {
          name: 'Photo',
          className: s.photoTd,
          render: row => (
            <div className={s.photo}>
              <StadiumPhoto stadium={row} height={50} />
            </div>
          ),
        },
        {
          name: 'Name',
          className: s.nameTd,
          render: (row: Stadium) => row.name,
        },
        {
          name: 'Address',
          className: s.addressTd,
          render: row => row.address,
        },
      ]}
    />
  );
};
