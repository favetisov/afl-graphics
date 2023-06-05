import { useState } from 'react';
import Image from 'next/image';
import { Flag3 as FlagIcon } from 'tabler-icons-react';

const aliases = {
  ru: 'russia',
  en: 'united_kingdom',
  eng: 'united_kingdom',
  ua: 'ukraine',
  pl: 'poland',
  es: 'spain',
  fr: 'france',
  th: 'thailand',
  eu: 'european_union',
  esp: 'spain',
  ger: 'germany',
  fra: 'france',
  por: 'portugal',
  bnl: 'belgium',
  ita: 'italy',
  rus: 'russia',
  srb: 'serbia',
  usa: 'united_states',
  ausswi: 'switzerland',
  bel: 'belgium',
  ned: 'netherlands',
  gbr: 'united_kingdom',
  aus: 'austria',
  cis: 'christmas_island',
};

export const Flag = (args: { flag: string; width: number; height: number }) => {
  const [error, setError] = useState(false);
  const { flag, width, height } = args;

  if (!flag) {
    return null;
  }

  let flagAlias = flag.toLowerCase().replace(new RegExp(' ', 'g'), '_');
  if (aliases[flag]) {
    flagAlias = aliases[flag];
  }

  const url = `/flags/${flagAlias}.svg`;

  return <>{error ? <FlagIcon size={width * 0.4} /> : <Image src={url} width={width} height={height} onError={() => setError(true)} />}</>;
};
