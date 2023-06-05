import { Divider, Paper, Title } from '@mantine/core';
import { ChampForm } from '@/pages-components/champs/ChampForm';
import { Champ } from '@/shared/schema/src/models/champ.model';

export const ChampInfoForm = ({ champ }: { champ: Champ }) => {
  return (
    <Paper withBorder px={'sm'} my={'md'}>
      <Title order={4} py={'md'}>
        Champ info
      </Title>
      <Divider variant={'dashed'} />
      <ChampForm champ={champ} />
    </Paper>
  );
};
