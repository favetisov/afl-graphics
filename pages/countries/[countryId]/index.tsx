import type { NextPage } from 'next';
import React from 'react';
import { PageLayout } from '@/layout/PageLayout';
import { CountryPage } from '@/pages-components/countries/country/CountryPage';
import { useRouter } from 'next/router';

const Country: NextPage = () => {
  const router = useRouter();
  const countryId = parseInt(router.query.countryId + '');

  return (
    <PageLayout>
      <CountryPage countryId={countryId} />
    </PageLayout>
  );
};

export default Country;
