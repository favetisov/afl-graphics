import { Stage } from '@/shared/schema/src/models/stage.model';
import { Divider, Paper, Title } from '@mantine/core';
import { StageForm } from './StageForm';

export const StageInfoForm = ({ stage }: { stage: Stage }) => {
  return (
    <Paper withBorder px={'sm'} my={'md'}>
      <Title order={4} py={'md'}>
        Stage info
      </Title>
      <Divider variant={'dashed'} />
      <StageForm stage={stage} />
    </Paper>
  );
};
