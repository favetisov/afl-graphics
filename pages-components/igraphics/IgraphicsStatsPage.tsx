import { Button, Divider, Group, Loader, Select, Text, Title } from '@mantine/core';
import { useMemo, useRef, useState } from 'react';
import { IgraphicsTableComponent } from './components/IgraphicsTableComponent/IgraphicsTableComponent';
import { IgrSchemaSelect } from './components/shared-components/IgrSchemaSelect';
import { IgrSeasonSelect } from './components/shared-components/IgrSeasonSelect';
import { DatePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import { IgraphicsPlayersComponent } from './components/IgraphicsPlayersComponent/IgraphicsPlayersComponent';
import { IgraphicsResultsComponent } from './components/IgraphicsResultsComponent/IgraphicsResultsComponent';
import { IgraphicsCalendarComponent } from './components/IgraphicsCalendarComponent/IgraphicsCalendarComponent';
import { IgraphicsBirthdaysComponent } from './components/IgraphicsBirthdaysComponent/IgraphicsBirthdaysComponent';
import { useModel } from '@/tools/model-hooks';
import { LeaguesSelect } from '@/shared/shared-frontend/components/LeaguesSelect/LeaguesSelect';
import { env } from '@/shared/env/env';
import { AugmentedReality as AugmentedRealityIcon } from 'tabler-icons-react';
import { Season } from '@/shared/schema/src/models/season.model';
import { League } from '@/shared/schema/src/models/league.model';
import { IgraphicsStageCupComponent } from '@/pages-components/igraphics/components/IgraphicsStageCupComponent/IgraphicsStageCupComponent';
import { StageFormat } from '@/shared/schema/src/models/stage.model';
import s from './IgraphicsStatsPage.module.scss';
import { IgraphicsTop5PlayersComponent } from '@/pages-components/igraphics/components/IgraphicsTop5PlayersComponent/IgraphicsTop5PlayersComponent';
import { IgraphicsTop5PhotoPlayersComponent } from '@/pages-components/igraphics/components/IgraphicsTop5PhotoPlayersComponent/IgraphicsTop5PhotoPlayersComponent';
import { IgrTeamLogo } from '@/pages-components/igraphics/components/shared-components/IgrTeamLogo';
import { TeamLogo } from '@/shared/shared-frontend/components/TeamLogo/TeamLogo';

const components = [
  { value: 'standings', label: 'Standings' },
  { value: 'cup', label: 'Stage Cup' },
  { value: 'top5', label: 'Top 5 players' },
  { value: 'top5_photo', label: 'Top 5 players + photo' },
  { value: 'players', label: 'Players' },
  { value: 'cards', label: 'Cards' },
  { value: 'schedule', label: 'Schedule' },
  { value: 'results', label: 'Results' },
  { value: 'calendar', label: 'Calendar' },
  { value: 'birthdays', label: 'Birthdays' },
];

const headers = () => {
  const h = new Headers();
  h.append('Content-Type', 'application/json');
  return h;
};

export const IgraphicsStatsPage = () => {
  const [league, setLeague] = useState<League>();
  const [downloading, setDownloading] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(components[0]);
  const [fromDateBirthdays, setFromDateBirthdays] = useState(dayjs().toDate());
  const [toDateBirthdays, setToDateBirthdays] = useState(dayjs().add(7, 'd').toDate());
  const [fromDateResults, setFromDateResults] = useState(dayjs().subtract(7, 'd').toDate());
  const [toDateResults, setToDateResults] = useState(dayjs().add(7, 'd').toDate());
  const [currentStage, setCurrentStage] = useState(null);
  const [category, setCategory] = useState<'goals' | 'assists' | 'goals_assists'>('goals');
  const [seasonId, setSeasonId] = useState();

  const [schema, setSchema] = useState();
  const [pattern, setPattern] = useState();
  const season: Season = useModel('Season', seasonId);
  const containerRef = useRef();

  const exportAsImage = async filename => {
    setDownloading(true);
    const head = window.document.head.innerHTML.replace(new RegExp('href="/', 'g'), 'href="' + env.localhost + '/');
    const content = (containerRef.current as any)?.firstChild?.innerHTML;

    const response = await fetch(env.igrHost, {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      method: 'POST',
      redirect: 'error',
      headers: headers(),
      body: JSON.stringify({ head, content }),
    });

    // const elements = domToJSON((containerRef.current as any)?.firstChild);
    // console.log(elements);

    // const elements = [
    //   { type: 'div', style: { color: 'lime', backgroundColor: 'white' } },
    //   { type: 'div', style: { color: 'red', backgroundColor: 'white' } },
    // ];

    // const response = await fetch('http://localhost:3005/plain/img', {
    // mode: 'cors',
    // cache: 'no-cache',
    // credentials: 'omit',
    // method: 'POST',
    // redirect: 'error',
    // headers: headers(),
    // method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    // body: JSON.stringify({ head, content }),
    // body: JSON.stringify({ elements }),
    // });
    const reader = new FileReader();
    reader.readAsDataURL(await response.blob());
    reader.onloadend = function () {
      downloadImage(reader.result, filename);
    };
  };

  const downloadImage = (img, fileName) => {
    const fakeLink: any = window.document.createElement('a');
    fakeLink.style = 'display:none;';
    fakeLink.download = fileName;
    fakeLink.href = img;
    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);
    fakeLink.remove();
    setDownloading(false);
  };

  const scaleContainer = (el, contentWidth) => {
    if (el) {
      const scale = el.clientWidth / contentWidth;
      el.style['transform'] = `scale(${scale})`;
      Array.from(el.querySelectorAll('.control')).forEach((e: any) => {
        e.style['transform'] = `scale(${1 / scale})`;
      });
    }
  };

  const currentElement = useMemo(() => {
    if (!season || season?._id != seasonId) return;
    if (currentComponent.value == 'standings') {
      return (
        <>
          <Divider variant="dashed" my={'sm'} />
          <div ref={containerRef}>
            {/*<div style={{ display: 'flex' }} className={s.test}>*/}
            {/*  <TeamLogo team={{ logo: 'Millwall' }} />*/}
            {/*  <IgrTeamLogo team={{ logo: 'Millwall' }} />*/}
            {/*  <input defaultValue={'Hi im input'} />*/}
            {/*</div>*/}
            <div ref={el => scaleContainer(el, 4000)} className={s.imgContainer}>
              <IgraphicsTableComponent season={season} schema={schema} pattern={pattern} key={(schema as any)?.value + pattern + season?._id} />
            </div>
          </div>
        </>
      );
    } else if (currentComponent.value == 'players') {
      return (
        <>
          <Divider variant="dashed" my={'sm'} />
          <div ref={containerRef}>
            <div ref={el => scaleContainer(el, 4000)} className={s.imgContainer}>
              <IgraphicsPlayersComponent season={season} schema={schema} pattern={pattern} mode={'points'} />
            </div>
          </div>
        </>
      );
    } else if (currentComponent.value == 'cards') {
      return (
        <>
          <Divider variant="dashed" my={'sm'} />
          <div ref={containerRef}>
            <div ref={el => scaleContainer(el, 4000)} className={s.imgContainer}>
              <IgraphicsPlayersComponent season={season} schema={schema} pattern={pattern} mode={'cards'} />
            </div>
          </div>
        </>
      );
    } else if (currentComponent.value == 'schedule') {
      return (
        <>
          <Divider variant={'dashed'} my={'md'} />
          <Group>
            <Text size={'xs'}>From:</Text>
            <DatePicker inputFormat={'DD.MM.YYYY'} labelFormat={'DD.MM.YYYY'} size={'xs'} defaultValue={fromDateResults} onChange={s => setFromDateResults(s)} />
            <Text size={'xs'}>To:</Text>{' '}
            <DatePicker inputFormat={'DD.MM.YYYY'} labelFormat={'DD.MM.YYYY'} size={'xs'} defaultValue={toDateResults} onChange={s => setToDateResults(s)} />
          </Group>
          <Divider variant="dashed" my={'sm'} />
          <div ref={containerRef}>
            <div ref={el => scaleContainer(el, 4000)} className={s.imgContainer}>
              <IgraphicsResultsComponent season={season} schema={schema} pattern={pattern} fromDate={fromDateResults} toDate={toDateResults} mode={'schedule'} />
            </div>
          </div>
        </>
      );
    } else if (currentComponent.value == 'results') {
      return (
        <>
          <Divider variant={'dashed'} my={'md'} />
          <Group>
            <Text size={'xs'}>From:</Text>{' '}
            <DatePicker inputFormat={'DD.MM.YYYY'} labelFormat={'DD.MM.YYYY'} size={'xs'} defaultValue={fromDateResults} onChange={s => setFromDateResults(s)} />
            <Text size={'xs'}>To:</Text>{' '}
            <DatePicker inputFormat={'DD.MM.YYYY'} labelFormat={'DD.MM.YYYY'} size={'xs'} defaultValue={toDateResults} onChange={s => setToDateResults(s)} />
          </Group>
          <Divider variant="dashed" my={'sm'} />
          <div ref={containerRef}>
            <div ref={el => scaleContainer(el, 4000)} className={s.imgContainer}>
              <IgraphicsResultsComponent season={season} schema={schema} pattern={pattern} fromDate={fromDateResults} toDate={toDateResults} mode={'results'} />
            </div>
          </div>
        </>
      );
    } else if (currentComponent.value == 'calendar') {
      return (
        <>
          <Divider variant={'dashed'} my={'md'} />
          <div ref={containerRef}>
            <div ref={el => scaleContainer(el, 6000)} className={s.imgContainer}>
              <IgraphicsCalendarComponent season={season} schema={schema} pattern={pattern} mode={'calendar'} />
            </div>
          </div>
        </>
      );
    } else if (currentComponent.value == 'birthdays') {
      return (
        <>
          <Divider variant={'dashed'} my={'md'} />
          <Group>
            <Text size={'xs'}>From:</Text>{' '}
            <DatePicker inputFormat={'DD.MM.YYYY'} labelFormat={'DD.MM.YYYY'} size={'xs'} defaultValue={fromDateBirthdays} onChange={s => setFromDateBirthdays(s)} />
            <Text size={'xs'}>To:</Text>{' '}
            <DatePicker inputFormat={'DD.MM.YYYY'} labelFormat={'DD.MM.YYYY'} size={'xs'} defaultValue={toDateBirthdays} onChange={s => setToDateBirthdays(s)} />
          </Group>
          <Divider variant={'dashed'} my={'md'} />
          <div ref={containerRef}>
            <div ref={el => scaleContainer(el, 4000)} className={s.imgContainer}>
              <IgraphicsBirthdaysComponent season={season} schema={schema} pattern={pattern} mode={'birthdays'} fromDate={fromDateBirthdays} toDate={toDateBirthdays} />
            </div>
          </div>
        </>
      );
    } else if (currentComponent.value == 'cup') {
      const stages = season.stages?.filter(s => s.format == StageFormat.cup);

      if (!stages.length) {
        return;
      }

      setCurrentStage(stages[0]);
      currentStage?.calculate();

      return (
        <>
          {/*{stages.length > 1 && (*/}
          {/*  <>*/}
          {/*    <Divider variant={'dashed'} my={'md'} />*/}
          {/*    <Group>*/}
          {/*      <Text size={'xs'}>Stage:</Text>*/}
          {/*      <Select*/}
          {/*        data={stages?.map(stage => ({*/}
          {/*          value: stage._id,*/}
          {/*          label: stage.name,*/}
          {/*        }))}*/}
          {/*        onChange={v => setCurrentStage(stages.find(l => l._id == v))}*/}
          {/*        value={currentStage?._id}*/}
          {/*        size={'xs'}*/}
          {/*        mt={'xs'}*/}
          {/*        placeholder={'stage'}*/}
          {/*      />*/}
          {/*    </Group>*/}
          {/*  </>*/}
          {/*)}*/}
          <Divider variant={'dashed'} my={'md'} />
          <div ref={containerRef}>
            <div ref={el => scaleContainer(el, 4000)} className={s.imgContainer}>
              {currentStage && <IgraphicsStageCupComponent key={currentStage?._id} stage={currentStage} schema={schema} pattern={pattern} />}
            </div>
          </div>
        </>
      );
    } else if (currentComponent.value == 'top5_photo') {
      return (
        <>
          <Divider variant={'dashed'} my={'md'} />
          <Group>
            <Text size={'xs'}>Category:</Text>
            <Select
              data={[
                { value: 'goals', label: 'Goals' },
                { value: 'assists', label: 'Assists' },
                { value: 'goals_assists', label: 'Goals + Assists' },
              ]}
              onChange={v => setCategory(v as 'goals' | 'assists' | 'goals_assists')}
              value={category}
              size={'xs'}
              mt={'xs'}
              placeholder={'stage'}
            />
          </Group>
          <div ref={containerRef} style={{ marginTop: '20px' }}>
            <div ref={el => scaleContainer(el, 4000)} className={s.imgContainer + ' igr-container'}>
              <IgraphicsTop5PhotoPlayersComponent category={category} league={league} schema={schema} pattern={pattern} season={season} key={season._id + (schema as any)?.value} />
            </div>
          </div>
        </>
      );
    } else if (currentComponent.value == 'top5') {
      return (
        <>
          <Divider variant={'dashed'} my={'md'} />
          <Group>
            <Text size={'xs'}>Category:</Text>
            <Select
              data={[
                { value: 'goals', label: 'Goals' },
                { value: 'assists', label: 'Assists' },
                { value: 'goals_assists', label: 'Goals + Assists' },
              ]}
              onChange={v => setCategory(v as 'goals' | 'assists' | 'goals_assists')}
              value={category}
              size={'xs'}
              placeholder={'stage'}
            />
          </Group>
          <div ref={containerRef} style={{ marginTop: '20px' }}>
            <div ref={el => scaleContainer(el, 4000)} className={s.imgContainer + ' igr-container'}>
              <IgraphicsTop5PlayersComponent category={category} league={league} schema={schema} pattern={pattern} season={season} key={season._id + (schema as any)?.value} />
            </div>
          </div>
        </>
      );
    }
  }, [
    currentComponent.value,
    (schema as any)?.value,
    pattern,
    season ? (season as any)._id : null,
    fromDateResults,
    toDateResults,
    fromDateBirthdays,
    toDateBirthdays,
    currentStage,
    category,
  ]);

  const renderContent = () => {
    return (
      <div>
        <Select
          icon={<AugmentedRealityIcon size={14} />}
          data={components}
          onChange={v => setCurrentComponent(components.find(l => l.value == v))}
          value={currentComponent.value}
          size={'xs'}
          mt={'xs'}
        />
        <IgrSchemaSelect season={season} onSchemaSelect={setSchema} onPatternSelect={setPattern} />
        {currentElement}
      </div>
    );
  };

  return (
    <>
      <Title order={2} my={'sm'}>
        <Group position={'apart'}>
          Igraphics stats
          <Button mt={'md'} onClick={() => exportAsImage(currentComponent.value + '.png')} disabled={downloading || !season}>
            DOWNLOAD IMAGE
            {downloading && <Loader size={16} ml={'sm'} />}
          </Button>
        </Group>
      </Title>
      <LeaguesSelect onLeagueChange={setLeague} />
      <IgrSeasonSelect
        leagueId={league?._id}
        onSeasonChange={s => {
          setSeasonId(s._id);
        }}
      />
      {season && renderContent()}
    </>
  );
};
//
// const cssWL = {
//   'display': v => ['flex, none'].includes(v),
//   'top': v => v != 'auto',
//   'bottom': v => v != 'auto',
//   'left': v => v != 'auto',
//   'right': v => v != 'auto',
//   'height': () => true,
//   'width': () => true,
//   'min-height': v => !['auto', 'none'].includes(v),
//   'min-width': v => !['auto', 'none'].includes(v),
//   'max-height': v => !['auto', 'none'].includes(v),
//   'max-width': v => !['auto', 'none'].includes(v),
//   'align-items': () => true,
//   'justify-content': v => v != 'normal',
//   'background-color': () => true,
//   'border-bottom-color': () => true,
//   'border-bottom-left-radius': () => true,
//   'border-bottom-right-radius': () => true,
//   'border-bottom-style': () => true,
//   'border-bottom-width': () => true,
//   'border-top-color': () => true,
//   'border-top-left-radius': () => true,
//   'border-top-right-radius': () => true,
//   'border-top-style': () => true,
//   'border-top-width': () => true,
//   'border-left-color': () => true,
//   'border-left-style': () => true,
//   'border-left-width': () => true,
//   'border-right-color': () => true,
//   'border-right-style': () => true,
//   'border-right-width': () => true,
//   'box-sizing': () => true,
//   'color': () => true,
//   'd': () => true,
//   'fill': () => true,
//   'stroke': () => true,
//   'font-family': () => true,
//   'font-size': () => true,
//   'font-style': () => true,
//   'font-weight': () => true,
//   'margin-top': () => true,
//   'margin-right': () => true,
//   'margin-left': () => true,
//   'margin-bottom': () => true,
//   'padding-top': () => true,
//   'padding-right': () => true,
//   'padding-left': () => true,
//   'padding-bottom': () => true,
//   'position': v => ['absolute', 'relative'].includes(v),
//   'object-fit': () => true,
//   'object-position': () => true,
//   'opacity': () => true,
//   'text-align': () => true,
//   'text-transform': () => true,
//   'transform': v => v != 'none',
//   'transform-origin': () => true,
//   'transform-style': () => true,
//   'z-index': v => v != 'auto',
// };
//
// // @ts-ignore
// function domToJSON(node, parent?) {
//   let propFix = { for: 'htmlFor', class: 'className' };
//   let specialGetters = {
//     style: node => node.style.cssText,
//   };
//   let attrDefaultValues = { style: '' };
//   let obj = {
//     nodeType: node.nodeType,
//     type: node.tagName?.toLowerCase(),
//     props: {
//       style: {},
//       children: [],
//       value: '',
//     },
//   };
//
//   if (node.tagName) {
//     const styles = getComputedStyle(node);
//     const parentStyles = parent ? getComputedStyle(parent) : {};
//     for (const key in Object.keys(styles)) {
//       if (styles[key] != parentStyles[key]) {
//         if (key in cssWL && cssWL[key](styles[key])) {
//           obj.props.style[key] = styles[key];
//         }
//         // if (key != 'transform') {
//         //   obj.props.style[key] = styles[key];
//         // }
//       }
//     }
//     if (obj.type == 'div' && !obj.props.style['display']) {
//       obj.props.style['display'] = 'flex';
//       obj.props.style['flex-direction'] = 'column';
//     }
//   } else if (node.nodeName) {
//     if (node.nodeName == '#text') {
//       return node.nodeValue;
//     }
//     obj.nodeName = node.nodeName;
//   }
//   if (node.nodeValue) {
//     obj.nodeValue = node.nodeValue;
//   }
//   let attrs = node.attributes;
//   if (attrs) {
//     let defaultValues = new Map();
//     for (let i = 0; i < attrs.length; i++) {
//       let name = attrs[i].nodeName;
//       if (name != 'class' && name != 'style') {
//         defaultValues.set(name, attrDefaultValues[name]);
//       }
//     }
//     // Add some special cases that might not be included by enumerating
//     // attributes above. Note: this list is probably not exhaustive.
//     switch (obj.type) {
//       case 'input': {
//         if (node.type === 'checkbox' || node.type === 'radio') {
//           defaultValues.set('checked', false);
//         } else if (node.type !== 'file') {
//           // Don't store the value for a file input.
//           defaultValues.set('value', '');
//         }
//         break;
//       }
//       case 'option': {
//         defaultValues.set('selected', false);
//         break;
//       }
//       case 'textarea': {
//         defaultValues.set('value', '');
//         break;
//       }
//     }
//     let arr = [];
//     for (let [name, defaultValue] of defaultValues) {
//       let propName = propFix[name] || name;
//       let specialGetter = specialGetters[propName];
//       let value = specialGetter ? specialGetter(node) : node[propName];
//       if (value !== defaultValue) {
//         if (name == 'value') {
//           obj.props.children = value;
//         }
//         arr.push([name, value]);
//       }
//     }
//     if (arr.length) {
//       obj.props.attributes = arr;
//     }
//   }
//   let childNodes = node.childNodes;
//   // Don't process children for a textarea since we used `value` above.
//   if (obj.tagName !== 'textarea' && childNodes && childNodes.length) {
//     let arr = (obj.props.children = []);
//     for (let i = 0; i < childNodes.length; i++) {
//       arr[i] = domToJSON(childNodes[i], node);
//     }
//   }
//   return obj;
// }
