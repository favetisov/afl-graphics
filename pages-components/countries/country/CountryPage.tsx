import { Grid, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { getModelManager } from '@/shared/schema/src/models/manager/model-manager';
import { CountryInfoForm } from '@/pages-components/countries/country/CountryInfoForm';
import { CountryChampsForm } from '@/pages-components/countries/country/CountryChampsForm';
import { Country } from '@/shared/schema/src/models/country.model';

export const CountryPage = ({ countryId }: { countryId: number }) => {
  const [country, setCountry] = useState<Country>();

  useEffect(() => {
    if (!country && countryId) {
      getModelManager().then(m => {
        m.getModel('League', 1).then(t => {
          setCountry(t.countries.find(c => c._id == countryId));
        });
      });
    }
  });

  if (!country) {
    return;
  }

  return (
    <>
      <Title>{country.name}</Title>
      <Grid>
        <Grid.Col span={3}>
          <CountryInfoForm country={country} />
        </Grid.Col>
        <Grid.Col span={9}>
          <CountryChampsForm country={country} />
        </Grid.Col>
      </Grid>
    </>
  );
};
