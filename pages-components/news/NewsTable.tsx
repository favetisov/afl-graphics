import { Post } from '@/shared/schema/src/models/post.model';
import { FtbTable } from '@/shared/shared-frontend/components/FtbTable/FtbTable';

import s from '@/pages-components/news/NewsTable.module.scss';
import { PostPhoto } from '@/shared/shared-frontend/components/PostPhoto/PostPhoto';
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from 'tabler-icons-react';
import React from 'react';
import { userState } from 'ftb-models';
require('dayjs/locale/ru');

export const NewsTable = ({ news }: { news: Post[] }) => {
  return (
    <FtbTable
      entities={news}
      className={s.table}
      rowHeight={55}
      rowHref={row => '/news/' + row._id}
      columns={[
        {
          name: 'Show',
          className: s.showTd,
          render: row => (row?.show ? <EyeIcon /> : <EyeOffIcon />),
        },
        {
          name: 'Photo',
          className: s.photoTd,
          render: row => (
            <div className={s.photo}>
              <PostPhoto post={row} height={40} />
            </div>
          ),
        },
        {
          name: 'Title',
          className: s.titleTd,
          render: (row: Post) => row.title,
        },
        {
          name: 'Date',
          className: s.dateTd,
          render: row => (
            <div>
              <div>{row.dt.locale(userState.language).format('DD MMM')}</div>
              <div>{row.dt.locale(userState.language).format('HH:mm')}</div>
            </div>
          ),
        },
      ]}
    />
  );
};
