import { Stadium } from '@/shared/schema/src/models/stadium.model';
import { Divider, Paper, Title } from '@mantine/core';
import { FtbTable } from '@/shared/shared-frontend/components/FtbTable/FtbTable';
import s from './StadiumPitches.module.scss';

export const StadiumPitches = ({ stadium }: { stadium: Stadium }) => {
  return (
    <Paper withBorder p={'md'} style={{ position: 'relative' }}>
      <Title order={4}>Pitches</Title>
      <Divider my={'md'} variant={'dashed'} />

      <FtbTable
        entities={stadium?.pitches}
        className={s.table}
        rowHeight={60}
        columns={[
          {
            name: 'Name',
            className: s.nameTd,
            render: p => p.name,
          },
          {
            name: 'Description',
            className: s.descriptionTd,
            render: p => p.description,
          },
        ]}
      />
    </Paper>
  );
};
