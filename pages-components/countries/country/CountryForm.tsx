import { Button, Divider, Group, LoadingOverlay, TextInput, Text, Select, Switch } from '@mantine/core';

import s from './CountryForm.module.scss';
import { forwardRef, useState } from 'react';
import { Country } from '@/shared/schema/src/models/country.model';
import { DatePicker } from '@mantine/dates';
import { Photo as PhotoIcon } from 'tabler-icons-react';
import { joiResolver, useForm } from '@mantine/form';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import Image from 'next/image';
import { Flag } from '@/shared/shared-frontend/components/Flag/Flag';

import { dialCodes } from '@/tools/dial-codes';
import Joi from 'joi';

export const CountryForm = ({ country }: { country: Country }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string>('');

  const form = useForm({
    initialValues: {
      name: country?.name || '',
      flag: country?.flag || '',
      founded: country?.founded || null,
      socialVk: country?.socialVk || '',
      socialFb: country?.socialFb || '',
      socialIg: country?.socialIg || '',
      show: country?.show || false,
    },
    validate: joiResolver(
      Joi.object({
        name: Joi.string().required().min(3).max(30),
        flag: Joi.allow().required(),
        founded: Joi.date().allow('').min('01.01.1900').max(new Date()).empty(null),
        socialVk: Joi.string().uri().empty(''),
        socialFb: Joi.string().uri().empty(''),
        socialIg: Joi.string().uri().empty(''),
      }),
    ),
  });

  const onSaveInfo = () => {};

  const onLoadPhoto = (files: File[]) => {
    const file = files[0];
    const imageUrl = URL.createObjectURL(file);

    setPhoto(imageUrl);
  };

  const SelectFlagItem = forwardRef<HTMLDivElement, { flag: string; label: string }>(({ label, flag, ...others }: { flag: string; label: string }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Flag flag={flag} width={20} height={20} />
        <Text>{label}</Text>
      </Group>
    </div>
  ));

  return (
    <form className={s.infoForm} onSubmit={form.onSubmit(values => onSaveInfo())}>
      <LoadingOverlay visible={loading} />
      <Group spacing={'sm'}>
        <Dropzone mt={'sm'} onDrop={onLoadPhoto} className={s.fullWidth} onReject={files => console.log('rejected files', files)} maxSize={3 * 1024 ** 2} accept={IMAGE_MIME_TYPE}>
          {photo ? (
            <Image src={photo} width={170} height={170} objectFit={'contain'} />
          ) : (
            <Group className={s.fullWidth} position={'center'} style={{ minHeight: 175, pointerEvents: 'none', width: '100%' }}>
              <PhotoIcon width={100} height={100} />
              <Text size="sm" color="dimmed" inline>
                Кликните сюда или перетащите файл
              </Text>
            </Group>
          )}
        </Dropzone>
        <Group className={s.fullWidth} spacing={'sm'}>
          <TextInput size={'xs'} className={s.fullWidth} required label="Имя" placeholder="Имя" {...form.getInputProps('name')} />
          <Select
            size={'xs'}
            className={s.fullWidth}
            required
            searchable
            label="Флаг"
            itemComponent={SelectFlagItem}
            data={dialCodes.map(i => ({
              value: i.code,
              label: i.name,
              flag: i.name,
            }))}
            {...form.getInputProps('flag')}
          />
          <DatePicker size={'xs'} className={s.fullWidth} inputFormat={'DD.MM.YYYY'} labelFormat={'DD.MM.YYYY'} allowFreeInput label="Основан" {...form.getInputProps('founded')} />
        </Group>
      </Group>
      <Group spacing={'sm'} mt={'sm'}>
        <TextInput size={'xs'} className={s.fullWidth} label="Вконтакте" placeholder="http://vk.com/your_link" {...form.getInputProps('socialVk')} />
        <TextInput size={'xs'} className={s.fullWidth} label="Фейсбук" placeholder="http://vk.com/your_link" {...form.getInputProps('socialFb')} />
        <TextInput size={'xs'} className={s.fullWidth} label="Инстаграм" placeholder="http://vk.com/your_link" {...form.getInputProps('socialIg')} />
      </Group>
      <Switch mt={'sm'} {...form.getInputProps('show')} label="Show" />

      <Divider variant={'dashed'} my={'md'} />
      <Button fullWidth={true} type={'submit'} mb={'md'}>
        {'Edit country info'}
      </Button>
    </form>
  );
};
