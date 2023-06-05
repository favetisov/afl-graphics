import type { NextPage } from 'next';
import { PageLayout } from '@/layout/PageLayout';
import { IgraphicsVideoPage } from '@/pages-components/igraphics/IgraphicsVideoPage';

const page: NextPage = () => {
  return (
    <PageLayout>
      <IgraphicsVideoPage />
    </PageLayout>
  );
};

export default page;
