import { Stage, StageFormat } from '@/shared/schema/src/models/stage.model';
import { joiResolver, useForm } from '@mantine/form';

import s from './StageForm.module.scss';
import { Button, Divider, Group, Select, Switch, TextInput } from '@mantine/core';
import { forwardRef } from 'react';
import { Flag } from '@/shared/shared-frontend/components/Flag/Flag';
import Joi from 'joi';
import { Champ } from '../../shared/schema/src/models/champ.model';

export const StageForm = ({ stage }: { stage: Stage }) => {
  const form = useForm({
    initialValues: {
      name: stage?.name || '',
      format: stage?.format || '',
      season: stage?.season?._id || '',
      show: stage?.show || false,
    },
    validate: joiResolver(
      Joi.object({
        name: Joi.string().required(),
        format: Joi.string().required(),
        season: Joi.allow(),
      }),
    ),
  });

  const SelectChampItem = forwardRef<HTMLDivElement, { flag: string; label: string }>(({ flag, label, ...others }: { flag: string; label: string }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Flag flag={flag} width={25} height={25} />
        {label}
      </Group>
    </div>
  ));

  const stageFormats = [
    { label: 'Кубок', value: StageFormat.cup },
    { label: 'Лига', value: StageFormat.league },
    { label: 'Свободная форма', value: StageFormat.free },
  ];

  const onSaveInfo = () => {};

  const champs = stage?.champ?.country?.champs;

  return (
    <form className={s.infoFrom} onSubmit={form.onSubmit(values => onSaveInfo())}>
      <TextInput size={'xs'} my={'sm'} required label="Имя" placeholder="Имя" {...form.getInputProps('name')} />
      <Select size={'xs'} required data={stageFormats} my={'sm'} label="Формат" placeholder="Имя" {...form.getInputProps('format')} />
      <Select
        size={'xs'}
        searchable
        data={champs ? champs.map((c: Champ) => ({ value: c._id, label: c.name, flag: c.country?.flag })) : []}
        label="Чемпионат"
        itemComponent={SelectChampItem}
        my={'sm'}
        {...form.getInputProps('season')}
      />
      <Switch mt={'sm'} {...form.getInputProps('show')} label="Show" />

      <Divider variant={'dashed'} my={'md'} />
      <Button size={'xs'} fullWidth type="submit" mb={'md'}>
        Save info
      </Button>
    </form>
  );
};
