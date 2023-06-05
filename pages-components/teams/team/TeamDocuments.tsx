import { Button, Paper, Title, Center, Text, Group } from '@mantine/core';
import s from './TeamDocuments.module.scss';

export const TeamDocuments = () => {
  const onDocumentLoad = e => {
    console.log(e);
  };

  return (
    <Paper withBorder px={'sm'} my={'md'}>
      <Group position={'apart'} py={'md'}>
        <Title order={4}>Documents</Title>
        <Button size={'xs'} className={s.newDocButton}>
          <input type={'file'} accept=".pdf, .doc, .docx, xls, xlsx, .odt, .ods, .odp" onChange={e => onDocumentLoad(e)} />
          Add document
        </Button>
      </Group>
      <Center py={'md'}>
        <Text size={'xs'}>No documents added</Text>
      </Center>
    </Paper>
  );
};
