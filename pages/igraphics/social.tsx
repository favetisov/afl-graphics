import type { NextPage } from 'next';
import { PageLayout } from '@/layout/PageLayout';
import { IgraphicsSocialPage } from '@/pages-components/igraphics/IgraphicsSocialPage';

const page: NextPage = () => {
  return (
    <PageLayout>
      <IgraphicsSocialPage />
    </PageLayout>
  );
};

export default page;
