import { Champ } from '@/shared/schema/src/models/champ.model';
import { Button, Divider, Group, Select, Switch, TextInput } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import Joi from 'joi';
import { forwardRef, useEffect, useState } from 'react';
import { Country } from '@/shared/schema/src/models/country.model';
import { Flag } from '@/shared/shared-frontend/components/Flag/Flag';
import { ModelManager } from '../../shared/schema/src/models/manager/model-manager';
import { League } from '@/shared/schema/src/models/league.model';

export const ChampForm = ({ champ }: { champ: any }) => {
  const [league, setLeague] = useState<League>();

  const form = useForm({
    initialValues: {
      name: champ?.name || '',
      country: champ?.country?._id || '',
      show: champ?.show || false,
    },
    validate: joiResolver(
      Joi.object({
        name: Joi.string().required().min(3).max(30),
        country: Joi.allow().required(),
      }),
    ),
  });

  const manager = new ModelManager();
  useEffect(() => {
    if (!league) {
      manager.getModel('League', 1).then(l => {
        setLeague(l);
      });
    }
  });

  const onSaveInfo = () => {
    // setLoading(true);
  };

  const SelectCountryItem = forwardRef<HTMLDivElement, { flag: string; label: string }>(({ flag, label, ...others }: { flag: string; label: string }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Flag flag={flag} width={25} height={25} />
        {label}
      </Group>
    </div>
  ));

  return (
    <form onSubmit={form.onSubmit(values => onSaveInfo())}>
      <TextInput size={'xs'} required label="Имя" placeholder="Имя" my={'sm'} {...form.getInputProps('name')} />
      <Select
        size={'xs'}
        required
        searchable
        data={league ? league?.countries?.map((c: Country) => ({ value: c._id, label: c.name, flag: c.flag })) : []}
        label="Чемпионат"
        itemComponent={SelectCountryItem}
        my={'sm'}
        {...form.getInputProps('country')}
      />
      <Switch mt={'sm'} {...form.getInputProps('show')} label="Show" />

      <Divider variant={'dashed'} my={'md'} />
      <Button size={'xs'} fullWidth type="submit" mb={'md'}>
        Save info
      </Button>
    </form>
  );
};
