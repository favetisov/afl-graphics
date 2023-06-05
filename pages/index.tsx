import type { NextPage } from 'next';
import { PageLayout } from '../layout/PageLayout';
import { Title, Box } from '@mantine/core';

const page: NextPage = () => {
  return (
    <PageLayout>
      <Title order={2} my={'sm'}>
        Welcome to AFL Admin
      </Title>
      <Box py={'sm'}>Here will be some docs and tutorials how to use new admin panel</Box>
      <Box>We are in heavy development mode at the moment</Box>
    </PageLayout>
  );
};

export default page;
