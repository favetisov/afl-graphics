import { Season } from '@/shared/schema/src/models/season.model';
import { Divider, Paper, Title } from '@mantine/core';
import { SeasonForm } from './SeasonForm';

export const SeasonInfoForm = ({ season }: { season: Season }) => {
  return (
    <Paper withBorder px={'sm'} my={'md'}>
      <Title order={4} py={'md'}>
        Season info
      </Title>
      <Divider variant={'dashed'} />
      <SeasonForm season={season} />
    </Paper>
  );
};
