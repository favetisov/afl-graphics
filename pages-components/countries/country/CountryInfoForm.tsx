import { Divider, Paper, Title } from '@mantine/core';
import { CountryForm } from '@/pages-components/countries/country/CountryForm';
import { Country } from '@/shared/schema/src/models/country.model';

export const CountryInfoForm = ({ country }: { country: Country }) => {
  return (
    <Paper withBorder px={'sm'} my={'md'}>
      <Title order={4} py={'md'}>
        Country info
      </Title>
      <Divider pt={'md'} variant={'dashed'} />
      <CountryForm country={country} />
    </Paper>
  );
};
