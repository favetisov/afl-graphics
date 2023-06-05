import { Grid, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { getModelManager } from '@/shared/schema/src/models/manager/model-manager';
import { StageInfoForm } from '@/pages-components/stage/StageInfoForm';
import { StageTeamsForm } from '@/pages-components/stage/StageTeamsForm';
import { StageEvents } from './StageEvents';
import { StageGamesForm } from '@/pages-components/stage/StageGamesForm';
import { Stage } from '@/shared/schema/src/models/stage.model';

export const StagePage = ({ stageId }: { stageId: number }) => {
  const [stage, setStage] = useState<Stage>();

  useEffect(() => {
    if (!stage && stageId) {
      getModelManager().then(m => {
        m.getModel('League', 1).then(l => {
          l.countries.forEach(country => {
            country.champs.forEach(champ => {
              champ.seasons.forEach(season => {
                season.stages.forEach(stg => {
                  setStage(stg);
                });
              });
            });
          });
        });
      });
    }
  });

  if (!stage) {
    return;
  }

  return (
    <>
      <Title>{stage.name}</Title>
      <Grid>
        <Grid.Col span={3}>
          <StageInfoForm stage={stage} />
        </Grid.Col>
        <Grid.Col span={4}>
          <StageTeamsForm stage={stage} />
          <StageEvents stage={stage} />
        </Grid.Col>
        <Grid.Col span={4}>
          <StageGamesForm stage={stage} />
        </Grid.Col>
      </Grid>
    </>
  );
};
