import { colorSchemes } from '../colorSchemes';

export const statsComponentsList = [
  {
    key: 'standings',
    label: 'Standings',
    componentName: 'IgraphicsTableComponent',
    controls: season => [
      { key: 'image-title', type: 'hidden', value: season.champ.name + ' - ' + season.name + ' - Standings' },
      {
        key: 'scheme',
        label: 'Color scheme',
        type: 'select',
        options: colorSchemes,
      },
      {
        key: 'pattern',
        label: 'Background pattern',
        type: 'select',
        options: [
          { label: 'Net', value: 'lfl_net' },
          { label: 'Sparks', value: 'lfl_sparks' },
        ],
      },
      { key: 'stages', label: 'Stages', type: 'multi-select', options: season.stages.map(s => ({ value: s._id, label: s.name })) },
    ],
  },
  {
    key: 'players',
    label: 'Players',
    componentName: 'IgraphicsPlayersComponent',
    controls: season => [
      { key: 'image-title', type: 'hidden', value: season.champ.name + ' - ' + season.name + ' - Players' },
      {
        key: 'scheme',
        label: 'Color scheme',
        type: 'select',
        options: colorSchemes,
      },
      { key: 'stages', label: 'Stages', type: 'multi-select', options: season.stages.map(s => ({ value: s._id, label: s.name })) },
      {
        key: 'pattern',
        label: 'Background pattern',
        type: 'select',
        options: [
          { label: 'Net', value: 'lfl_net' },
          { label: 'Sparks', value: 'lfl_sparks' },
        ],
      },
    ],
  },
  // {
  //   key: 'calendar',
  //   label: 'Calendars',
  //   componentName: 'IgraphicsCalendarComponent',
  //   controls: season => [
  //     { key: 'image-title', type: 'hidden', value: season.champ.name + ' - ' + season.name + ' - Players' },
  //     {
  //       key: 'scheme',
  //       label: 'Color scheme',
  //       type: 'select',
  //       options: colorSchemes,
  //     },
  //     { key: 'stages', label: 'Stages', type: 'multi-select', options: season.stages.map(s => ({ value: s._id, label: s.name })) },
  //     {
  //       key: 'pattern',
  //       label: 'Background pattern',
  //       type: 'select',
  //       options: [
  //         { label: 'Net', value: 'lfl_net' },
  //         { label: 'Sparks', value: 'lfl_sparks' },
  //       ],
  //     },
  //   ],
  // },
  {
    key: 'results',
    label: 'Results',
    componentName: 'IgraphicsResultsComponent',
    controls: season => [
      { key: 'image-title', type: 'hidden', value: season.champ.name + ' - ' + season.name + ' - Players' },
      {
        key: 'scheme',
        label: 'Color scheme',
        type: 'select',
        options: colorSchemes,
      },
      { key: 'stages', label: 'Stages', type: 'multi-select', options: season.stages.map(s => ({ value: s._id, label: s.name })) },
      {
        key: 'pattern',
        label: 'Background pattern',
        type: 'select',
        options: [
          { label: 'Net', value: 'lfl_net' },
          { label: 'Sparks', value: 'lfl_sparks' },
        ],
      },
    ],
  },
  {
    key: 'schedule',
    label: 'Schedule',
    componentName: 'IgraphicsScheduleComponent',
    controls: season => [
      { key: 'image-title', type: 'hidden', value: season.champ.name + ' - ' + season.name + ' - Players' },
      {
        key: 'scheme',
        label: 'Color scheme',
        type: 'select',
        options: colorSchemes,
      },
      { key: 'stages', label: 'Stages', type: 'multi-select', options: season.stages.map(s => ({ value: s._id, label: s.name })) },
      {
        key: 'pattern',
        label: 'Background pattern',
        type: 'select',
        options: [
          { label: 'Net', value: 'lfl_net' },
          { label: 'Sparks', value: 'lfl_sparks' },
        ],
      },
    ],
  },
  {
    key: 'cards',
    label: 'Cards',
    componentName: 'IgraphicsCardsComponent',
    controls: season => [
      { key: 'image-title', type: 'hidden', value: season.champ.name + ' - ' + season.name + ' - Players' },
      {
        key: 'scheme',
        label: 'Color scheme',
        type: 'select',
        options: colorSchemes,
      },
      { key: 'stages', label: 'Stages', type: 'multi-select', options: season.stages.map(s => ({ value: s._id, label: s.name })) },
      {
        key: 'pattern',
        label: 'Background pattern',
        type: 'select',
        options: [
          { label: 'Net', value: 'lfl_net' },
          { label: 'Sparks', value: 'lfl_sparks' },
        ],
      },
    ],
  },
  {
    key: 'calendar',
    label: 'Calendar',
    componentName: 'IgraphicsCalendarComponent',
    controls: season => [
      { key: 'image-title', type: 'hidden', value: season.champ.name + ' - ' + season.name + ' - Players' },
      {
        key: 'scheme',
        label: 'Color scheme',
        type: 'select',
        options: colorSchemes,
      },
      { key: 'stages', label: 'Stages', type: 'multi-select', options: season.stages.map(s => ({ value: s._id, label: s.name })) },
      {
        key: 'pattern',
        label: 'Background pattern',
        type: 'select',
        options: [
          { label: 'Net', value: 'lfl_net' },
          { label: 'Sparks', value: 'lfl_sparks' },
        ],
      },
    ],
  },
  {
    key: 'birthdays',
    label: 'Birthdays',
    componentName: 'IgraphicsBirthdaysComponent',
    controls: season => [
      { key: 'image-title', type: 'hidden', value: season.champ.name + ' - ' + season.name + ' - Players' },
      {
        key: 'scheme',
        label: 'Color scheme',
        type: 'select',
        options: colorSchemes,
      },
      { key: 'stages', label: 'Stages', type: 'multi-select', options: season.stages.map(s => ({ value: s._id, label: s.name })) },
      {
        key: 'pattern',
        label: 'Background pattern',
        type: 'select',
        options: [
          { label: 'Net', value: 'lfl_net' },
          { label: 'Sparks', value: 'lfl_sparks' },
        ],
      },
    ],
  },
];
