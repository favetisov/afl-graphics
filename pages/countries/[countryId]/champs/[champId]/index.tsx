import { useRouter } from 'next/router';
import React from 'react';
import { PageLayout } from '@/layout/PageLayout';
import { ChampPage } from '@/pages-components/champs/ChampPage';

const Champ = () => {
  const router = useRouter();
  const champId = parseInt(router?.query?.champId + '');

  return (
    <PageLayout>
      <ChampPage champId={champId} />
    </PageLayout>
  );
};

export default Champ;
