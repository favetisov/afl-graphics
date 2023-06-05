import { PageLayout } from '@/layout/PageLayout';
import { GamesPage } from '@/pages-components/games/GamesPage';
import { NextPage } from 'next';

const page: NextPage = () => {
  return (
    <PageLayout>
      <GamesPage />
    </PageLayout>
  );
};

export default page;
