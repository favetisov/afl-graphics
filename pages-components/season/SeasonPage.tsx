import { Grid, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { getModelManager } from '@/shared/schema/src/models/manager/model-manager';
import { SeasonInfoForm } from '@/pages-components/season/SeasonInfoForm';
import { SeasonStagesForm } from './SeasonStagesForm';
import { Season } from '@/shared/schema/src/models/season.model';

export const SeasonPage = ({ seasonId }: { seasonId: number }) => {
  const [season, setSeason] = useState<Season>();

  useEffect(() => {
    if (!season && seasonId) {
      getModelManager().then(m => {
        m.getModel('League', 1).then(l => {
          l.countries.forEach(country => {
            country.champs.forEach(ch => {
              ch.seasons.forEach(s => {
                if (s._id == seasonId) {
                  setSeason(s);
                }
              });
            });
          });
        });
      });
    }
  });

  if (!season) {
    return;
  }

  return (
    <>
      <Title>{season.name}</Title>
      <Grid>
        <Grid.Col span={3}>
          <SeasonInfoForm season={season} />
        </Grid.Col>
        <Grid.Col span={9}>
          <SeasonStagesForm season={season} />
        </Grid.Col>
      </Grid>
    </>
  );
};
