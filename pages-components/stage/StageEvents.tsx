import { Stage } from '@/shared/schema/src/models/stage.model';
import { Paper, Group, Button, Divider, Title, Modal, Text } from '@mantine/core';
import { useState } from 'react';

export const StageEvents = ({ stage }: { stage: Stage }) => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  return (
    <Paper withBorder px={'sm'} my={'md'}>
      <Group position={'apart'} py={'md'}>
        <Group noWrap>
          <Title order={4}>Event</Title>
        </Group>
        <Button onClick={() => setModalOpened(true)} size={'xs'}>
          Add event
        </Button>
      </Group>
      <Divider variant={'dashed'} />

      <Group my={'md'}>
        {stage.events?.length ? (
          ''
        ) : (
          <Text m={'sm'} size={'sm'} align={'center'}>
            По этому турниру ещё не было совершено действий. Вы можете заменить, оштрафовать или дисквалифицровать команду нажав "Добавить действие"
          </Text>
        )}
      </Group>

      <Divider variant={'dashed'} />

      <Modal size="45%" centered withCloseButton={false} opened={modalOpened} onClose={() => setModalOpened(false)}>
        event
      </Modal>
    </Paper>
  );
};
