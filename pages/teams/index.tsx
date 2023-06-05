import type { NextPage } from 'next';
import { TeamsPage } from '@/pages-components/teams/TeamsPage';
import { PageLayout } from '@/layout/PageLayout';

const page: NextPage = () => {
  return (
    <PageLayout>
      <TeamsPage />
    </PageLayout>
  );
};

export default page;
