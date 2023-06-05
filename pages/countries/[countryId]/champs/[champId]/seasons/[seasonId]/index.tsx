import { useRouter } from 'next/router';
import React from 'react';
import { PageLayout } from '@/layout/PageLayout';
import { SeasonPage } from '@/pages-components/season/SeasonPage';

const Season = () => {
  const router = useRouter();
  const seasonId = parseInt(router?.query?.seasonId + '');

  return (
    <PageLayout>
      <SeasonPage seasonId={seasonId} />
    </PageLayout>
  );
};

export default Season;
