import { useForm } from '@mantine/form';
import { forwardRef, useEffect } from 'react';
import { ColorInput, Divider, Grid, Group, Switch, Textarea, TextInput, Text } from '@mantine/core';
import s from './TeamForm.module.scss';
import { DatePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import { Team } from '../../shared/schema/src/models/team.model';
// import { TeamLogo } from '@/shared/shared-frontend/components/TeamLogo/TeamLogo';
import { userState } from 'ftb-models';
require('dayjs/locale/ru');

// const LogoItem = forwardRef(({ label, ...others }, ref) => {
//   const team = new Team();
//   team.logo = label;
//   return (
//     <div ref={ref} {...others}>
//       <Group noWrap className={s.logoSelectItem}>
//         <TeamLogo team={team} height={20} />
//         {label}
//       </Group>
//     </div>
//   );
// });

export const TeamForm = forwardRef(({ team }: { team: Team }, ref: any) => {
  // const teamsDataStore = useTeamsDataStore();
  // const logosDataStore = useLogosDataStore();
  // const userUiStore = useUserUiStore();
  // const team = teamsDataStore.teams[teamId];
  //
  // useSwr(userUiStore.u?.league?._id ? `leagues-teams-${userUiStore.u?.league._id}` : null, () => {
  //   teamsDataStore.loadLeagueTeams(userUiStore.u?.league._id);
  // });

  // useSwr('logos', () => logosDataStore.loadLogos());

  // const JoiE = Joi.extend(joiPhoneNumber);

  const form = useForm({
    initialValues: {
      show: team?.show || true,
      name: team?.name || '',
      shortName: team?.shortName || '',
      // serviceInfo: team?.serviceInfo,
      color: team?.color || '',
      reserveTeamId: team?.reserveTeam?._id || null,
      parentTeamId: team?.parentTeam?._id || null,
      founded: team?.founded ? dayjs(team.founded).locale(userState.language).format('DD.MM.YYYY') : '',
      // rating: team?.rating,
      description: team?.description || '',
      email: team?.email || '',
      phone: team?.phone || '',
      website: team?.website || '',
      address: team?.address || '',
      stadium: team?.stadium || '',
      logo: team?.logo || '',
      uniform: team?.uniform || [],
    },
    // validate: joiResolver(
    //   JoiE.object({
    //     show: Joi.boolean().required(),
    //     name: Joi.string().required(),
    //     shortName: Joi.string().min(2).max(3).required(),
    //     founded: Joi.date().allow('').min('01.01.1900').max(new Date()),
    //     color: Joi.allow(''),
    //     reserveTeamId: Joi.allow(null),
    //     parentTeamId: Joi.allow(null),
    //     description: Joi.string().allow(''),
    //     phone: JoiE.string().phoneNumber().allow(''),
    //     email: Joi.string()
    //       .allow('')
    //       .email({ tlds: { allow: false } }),
    //     website: Joi.string().allow('').uri(),
    //     address: Joi.string().allow('').empty(''),
    //     stadium: Joi.optional(),
    //     logo: Joi.allow(),
    //     uniform: Joi.array().allow(),
    //   }),
    // ),
  });

  // const parentReserveTeams = sortBy(
  //   Object.values(teamsDataStore.teams)
  //     .filter(t => t.show == true && t.league._id == userUiStore.u?.league?._id && t._id != team?._id)
  //     .map(t => ({ value: t._id, label: t.name })),
  //   ['label'],
  // );

  // useEffect(() => {
  //   if (teamsDataStore.teams) {
  //     return reaction(
  //       () => teamsDataStore.teams,
  //       (v, reaction) => {
  //         if (!team || (v[teamId] && Object.keys(team).some(k => team[k] != v[teamId][k]))) {
  //           for (const k in v[teamId]) {
  //             if (k == 'founded') {
  //               form.setFieldValue('founded', dayjs(v[teamId][k]).toDate());
  //             } else if (k in form.values) {
  //               form.setFieldValue(k, v[teamId][k] || '');
  //             }
  //           }
  //         }
  //       },
  //     );
  //   }
  // });

  useEffect(() => {
    if (ref?.current) {
      ref.current.getValue = () => (form.validate().hasErrors ? null : form.values);
    }
  });

  return (
    <form ref={ref}>
      <Switch label="Show in app and website" checked={form.values['show']} onChange={() => form.setFieldValue('show', !form.values['show'] as any)} size={'xs'} />
      <Divider my={'xs'} variant={'dashed'} />
      <Group>
        <TextInput size={'xs'} placeholder={'Team name'} {...form.getInputProps('name')} label={'Name'} className={s.name} required />
        <TextInput size={'xs'} placeholder={'SHO'} {...form.getInputProps('shortName')} label={'Short name'} className={s.shortName} required maxLength={3} />
      </Group>
      <Grid mt={0} mx={0}>
        <Grid.Col xs={12} sm={4} px={2}>
          {/*<LogoSelect team={team} onLogo={logo => form.setFieldValue('logo', logo)} />*/}
        </Grid.Col>
        <Grid.Col xs={6} sm={4} px={2}>
          <DatePicker size={'xs'} inputFormat={'DD.MM.YYYY'} labelFormat={'DD.MM.YYYY'} allowFreeInput label="Founded" {...form.getInputProps('founded')} className={s.founded} />
        </Grid.Col>
        <Grid.Col xs={6} sm={4} px={2}>
          <ColorInput label={'Background color'} {...form.getInputProps('color')} size={'xs'} className={s.color} />
        </Grid.Col>
      </Grid>
      <Grid mx={0}>
        <Grid.Col xs={12} sm={6} px={2}>
          {/*<Select label={'Reserve team'} data={parentReserveTeams} {...form.getInputProps('reserveTeamId')} size={'xs'} className={s.reserveTeam} searchable />*/}
        </Grid.Col>
        <Grid.Col xs={12} sm={6} px={2}>
          {/*<Select label={'Parent team'} data={parentReserveTeams} {...form.getInputProps('parentTeamId')} size={'xs'} className={s.reserveTeam} searchable />*/}
        </Grid.Col>
      </Grid>
      <Divider mt={'lg'} mb={'sm'} variant={'dashed'} />
      <Textarea size={'xs'} classNames={s.description} autosize placeholder={'Some info about team history'} label={'About'} minRows={2} {...form.getInputProps('description')} />
      <Divider mt={'lg'} mb={'sm'} variant={'dashed'} />
      <Text size={'xs'} mb={'xs'}>
        Uniform
      </Text>
      {/*<TeamUniform team={team} onFormSet={u => form.setFieldValue('uniform', u)} />*/}
      <Divider mt={'lg'} mb={'sm'} variant={'dashed'} />
      <Grid mx={0}>
        <Grid.Col xs={12} sm={6} px={2}>
          <TextInput placeholder={'your_mail@mail.ru'} {...form.getInputProps('email')} label={'Email'} size={'xs'} className={s.additionalInfo} />
        </Grid.Col>
        <Grid.Col xs={12} sm={6} px={2}>
          <TextInput placeholder={'+7 111 111 1111'} {...form.getInputProps('phone')} label={'Phone'} size={'xs'} className={s.additionalInfo} />
        </Grid.Col>
        <Grid.Col xs={12} sm={6} px={2}>
          <TextInput placeholder={'https://team.com'} {...form.getInputProps('website')} label={'Website'} size={'xs'} className={s.additionalInfo} />
        </Grid.Col>
        <Grid.Col xs={12} sm={6} px={2}>
          <TextInput placeholder={'Zampa Road London SE16 3LN'} {...form.getInputProps('address')} label={'Address'} size={'xs'} className={s.additionalInfo} />
        </Grid.Col>
      </Grid>
    </form>
  );
});
