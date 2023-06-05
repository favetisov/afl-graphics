import type { NextPage } from 'next';
import { PageLayout } from '@/layout/PageLayout';
import { IgraphicsStatsPage } from '@/pages-components/igraphics/IgraphicsStatsPage';

const page: NextPage = () => {
  return (
    <PageLayout>
      <IgraphicsStatsPage />
    </PageLayout>
  );
};

export default page;
