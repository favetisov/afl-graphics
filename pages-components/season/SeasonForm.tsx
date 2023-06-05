import { Season } from '@/shared/schema/src/models/season.model';
import { joiResolver, useForm } from '@mantine/form';

import s from './SeasonForm.module.scss';
import { Button, Divider, Group, Select, Switch, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { Champ } from '@/shared/schema/src/models/champ.model';
import { Flag } from '@/shared/shared-frontend/components/Flag/Flag';
import { forwardRef } from 'react';
import Joi from 'joi';

export const SeasonForm = ({ season }: { season: any }) => {
  const form = useForm({
    initialValues: {
      name: season?.name || '',
      startingAt: season?.startingAt || '',
      endingAt: season?.endingAt || '',
      champ: season?.champ?._id || null,
      show: season?.show || false,
    },
    validate: joiResolver(
      Joi.object({
        name: Joi.string().required(),
        startingAt: Joi.date().allow('').min('01.01.1900').empty(null),
        endingAt: Joi.date().allow('').min('01.01.1900').empty(null),
        champ: Joi.allow().empty(null),
      }),
    ),
  });

  const onSaveInfo = () => {};

  const SelectChampItem = forwardRef<HTMLDivElement, { flag: string; label: string }>(({ flag, label, ...others }: { flag: string; label: string }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Flag flag={flag} width={25} height={25} />
        {label}
      </Group>
    </div>
  ));

  const champs = season?.champ?.country?.champs;

  return (
    <form className={s.infoFrom} onSubmit={form.onSubmit(values => onSaveInfo())}>
      <TextInput size={'xs'} my={'sm'} required label="Имя" placeholder="Имя" {...form.getInputProps('name')} />
      <DatePicker size={'xs'} my={'sm'} inputFormat={'DD.MM.YYYY'} labelFormat={'DD.MM.YYYY'} allowFreeInput required label="Дата старта" {...form.getInputProps('startingAt')} />
      <DatePicker size={'xs'} my={'sm'} inputFormat={'DD.MM.YYYY'} labelFormat={'DD.MM.YYYY'} allowFreeInput required label="Дата окончания" {...form.getInputProps('endingAt')} />
      <Select
        size={'xs'}
        required
        searchable
        data={champs ? champs.map((c: Champ) => ({ value: c._id, label: c.name, flag: c.country?.flag })) : []}
        label="Чемпионат"
        itemComponent={SelectChampItem}
        my={'sm'}
        {...form.getInputProps('champ')}
      />
      <Switch mt={'sm'} {...form.getInputProps('show')} label="Show" />

      <Divider variant={'dashed'} my={'md'} />
      <Button size={'xs'} fullWidth type="submit" mb={'md'}>
        Save info
      </Button>
    </form>
  );
};
