import { useRouter } from 'next/router';
import { PageLayout } from '@/layout/PageLayout';
import { StagePage } from '@/pages-components/stage/StagePage';

const Season = () => {
  const router = useRouter();
  const stageId = parseInt(router?.query?.stageId + '');

  return (
    <PageLayout>
      <StagePage stageId={stageId} />
    </PageLayout>
  );
};

export default Season;
