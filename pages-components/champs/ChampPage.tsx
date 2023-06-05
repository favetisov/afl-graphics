import { ChampInfoForm } from '@/pages-components/champs/ChampInfoForm';
import { ChampSeasonsForm } from '@/pages-components/champs/ChampSeasonsForm';
import { Champ } from '@/shared/schema/src/models/champ.model';
import { getModelManager } from '@/shared/schema/src/models/manager/model-manager';
import { Grid, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';

export const ChampPage = ({ champId }: { champId: number }) => {
  const [champ, setChamp] = useState<Champ>();

  useEffect(() => {
    if (!champ && champId) {
      getModelManager().then(m => {
        m.getModel('Champ', champId).then(ch => {
          setChamp(ch);
        });
      });
    }
  });

  if (!champ) {
    return;
  }

  console.log(champ);

  return (
    <>
      <Title>{champ.name}</Title>
      <Grid>
        <Grid.Col span={3}>
          <ChampInfoForm champ={champ} />
        </Grid.Col>
        <Grid.Col span={9}>
          <ChampSeasonsForm champ={champ} />
        </Grid.Col>
      </Grid>
    </>
  );
};
