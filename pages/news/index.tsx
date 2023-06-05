import { PageLayout } from '@/layout/PageLayout';
import { NewsPage } from '@/pages-components/news/NewsPage';
import type { NextPage } from 'next';

const News: NextPage = () => {
  return (
    <PageLayout>
      <NewsPage />
    </PageLayout>
  );
};

export default News;
