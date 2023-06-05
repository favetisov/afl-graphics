import { Divider, Grid, Group, Switch, TextInput, Textarea } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import Joi from 'joi';

import s from './StadiumForm.module.scss';
import { Stadium } from '@/shared/schema/src/models/stadium.model';

export const StadiumForm = ({ stadium }: { stadium: any }) => {
  console.log('stadium', stadium);

  const initialValues = {
    show: stadium?.show || true,
    name: stadium?.name || '',
    address: stadium?.address || '',
    description: stadium?.description || '',
    lat: stadium?.lat || '',
    long: stadium?.long || '',
    pitchSize: stadium?.pitchSize || '',
    pitchCover: stadium?.pitchCover || '',
    capacity: stadium?.capacity || '',
    photo: '',
  };
  const form = useForm({
    initialValues,
    validate: joiResolver(
      Joi.object({
        show: Joi.boolean().required(),
        name: Joi.string().required(),
        address: Joi.string().required(),
        description: Joi.string().allow(''),
        lat: Joi.number().required(),
        long: Joi.number().required(),
        pitchSize: Joi.string().empty(null),
        pitchCover: Joi.string().empty(null),
        capacity: Joi.number().empty(null),
        photo: Joi.string().required(),
      }),
    ),
  });

  return (
    <form className={s.form}>
      <Grid className={s.grid} align={'center'} m={0}>
        <Grid.Col span={12}>
          <Switch label="Show" checked={form.values['show']} onChange={() => form.setFieldValue('show', !form.values['show'])} />
          <Divider variant={'dotted'} mt={'xl'} />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput size={'xs'} required label={'Name'} placeholder={'Emirates'} mb={'md'} {...form.getInputProps('name')} />
          <Group noWrap mb={'md'}>
            <TextInput size={'xs'} required label={'Lat'} placeholder={'51.5548918'} {...form.getInputProps('lat')} className={s.coord} />
            <TextInput size={'xs'} required label={'Long'} placeholder={'-0.110632'} {...form.getInputProps('long')} className={s.coord} />
          </Group>
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput size={'xs'} required label={'Address'} placeholder={'Highbury House, 75 Drayton Park, London'} mb={'md'} {...form.getInputProps('address')} />
          <Textarea size={'xs'} label={'Description'} autosize placeholder={'FC Arsenal home stadium'} mb={'md'} {...form.getInputProps('description')} minRows={3} />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput size={'xs'} label={'Pitch size'} placeholder={'105x68'} mb={'md'} {...form.getInputProps('pitchSize')} className={s.pitch} />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput size={'xs'} label={'Pitch cover'} placeholder={'Natural grass'} mb={'md'} {...form.getInputProps('pitchCover')} className={s.pitch} />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput size={'xs'} label={'Capacity'} placeholder={'60260'} mb={'md'} {...form.getInputProps('capacity')} className={s.pitch} />
        </Grid.Col>
      </Grid>
    </form>
  );
};
