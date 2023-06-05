import { schema } from '../../schema';
import { env } from './../../../../env/env';

const userState = { language: 'ru' };

const headers = () => {
  const h = new Headers();
  h.append('AppKey', env.appKey);
  h.append('AppVersion', env.coreVersion);
  h.append('ClientLanguage', userState.language);
  h.append('Content-Type', 'application/json');
  return h;
};

export const loadItem = async (eName: string, _id: number) => {
  return (
    await fetch(env.plainApiHost + '/item/' + eName.toLowerCase() + '/' + _id, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: headers(),
      redirect: 'error',
    })
  ).json();
};

// todo add load via streams
// const decoder = new TextDecoder('utf-8');
// https:/www.loginradius.com/blog/engineering/guest-post/http-streaming-with-nodejs-and-fetch-api/

// export const loadList = async (
//   entities: { eName: string; ids: number[] }[],
//   onChunk: (eName: string, row: Array<any>) => any,
// ) => {
export const loadList = async (entities: any, onChunk: any) => {
  const response = await fetch(env.plainApiHost + '/list', {
    method: 'POST',
    body: JSON.stringify(entities),
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    headers: headers(),
    redirect: 'error',
  });

  const reader = response.body.getReader();

  let receivedLength = 0;
  let chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    receivedLength += value.length;
  }

  // todo парсить текст на этапе работы с чанком, разбивать на куски по '][' делать onChunk для всех имеющихся, остальное добавлять к строчке
  let chunksAll = new Uint8Array(receivedLength);
  let position = 0;
  for (let chunk of chunks) {
    chunksAll.set(chunk, position);
    position += chunk.length;
  }

  let result = new TextDecoder('utf-8').decode(chunksAll);

  const parsed = JSON.parse('[' + result.replace(new RegExp('\\]\\[', 'g'), '],[') + ']');
  parsed.forEach(row => {
    const entityName = Object.keys(schema)[parseInt(row[0])];
    onChunk(entityName, row[1]);
  });
};

export const loadLastUpdate = async () => {
  return (
    await fetch(env.plainApiHost + '/last_update', {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: headers(),
      redirect: 'error',
    })
  ).json();
};

export const loadUpdates = async (lastUpdateId: number) => {
  return (
    await fetch(env.plainApiHost + '/updates_since/' + lastUpdateId, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: headers(),
      redirect: 'error',
    })
  ).json();
};

export const getPlain = async url => {
  return (
    await fetch(env.plainApiHost + url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: headers(),
      redirect: 'error',
    })
  ).json();
};

export const searchPlain = async (query: string) => {
  return (
    await fetch(env.plainApiHost + '/search/' + query, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: headers(),
      redirect: 'error',
    })
  ).json();
};

export const recommendationsPlain = async (leagueId: number) => {
  return (
    await fetch(env.plainApiHost + '/recommendations/' + leagueId, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: headers(),
      redirect: 'error',
    })
  ).json();
};

export const newsPlain = async (tags: string) => {
  return (
    await fetch(env.plainApiHost + '/news?tags=' + tags, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: headers(),
      redirect: 'error',
    })
  ).json();
};

export const getLastUpdate = async () => {
  return (
    await fetch(env.plainApiHost + '/last_update', {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: headers(),
      redirect: 'error',
    })
  ).json();
};

export const getUpdatesSince = async (lastUpdateId: number) => {
  return (
    await fetch(env.plainApiHost + '/updates_since/' + lastUpdateId, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: headers(),
      redirect: 'error',
    })
  ).json();
};
