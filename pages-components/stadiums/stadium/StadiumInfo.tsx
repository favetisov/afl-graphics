import { Stadium } from '@/shared/schema/src/models/stadium.model';
import { Button, Divider, Group, LoadingOverlay, Modal, Paper, Title, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { StadiumForm } from './StadiumForm';

export const StadiumInfo = ({ stadium }: { stadium: Stadium }) => {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [savingInfo, setSavingInfo] = useState(false);

  return (
    <Paper mb={'md'} withBorder p={'md'} style={{ position: 'relative' }}>
      <LoadingOverlay visible={savingInfo} />
      <Title order={4}>Edit stadium info</Title>
      <Divider my={'md'} variant={'dashed'} />
      <StadiumForm stadium={stadium} />
      <Divider my={'md'} variant={'dashed'} />
      <Group position={'apart'}>
        <Button onClick={() => setConfirmingDelete(true)} variant="subtle" color="red">
          Delete stadium
        </Button>
        <Button disabled={savingInfo}>Edit info</Button>
      </Group>
      <Modal centered opened={confirmingDelete} onClose={() => setConfirmingDelete(false)} title={'Confirm delete'}>
        <Text my={'md'} size={'xs'}>
          Do you really want to delete stadium?
        </Text>
        <Group position={'apart'} mt={'lg'}>
          <Button variant={'subtle'} onClick={() => setConfirmingDelete(false)}>
            Cancel
          </Button>
          <Button>Delete</Button>
        </Group>
      </Modal>
    </Paper>
  );
};
