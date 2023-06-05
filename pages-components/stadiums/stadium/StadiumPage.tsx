import { getModelManager } from '@/shared/schema/src/models/manager/model-manager';
import { useEffect, useState } from 'react';
import { Stadium } from '@/shared/schema/src/models/stadium.model';
import { Grid } from '@mantine/core';
import { StadiumInfo } from '@/pages-components/stadiums/stadium/StadiumInfo';
import { StadiumPitches } from '@/pages-components/stadiums/stadium/StadiumPitches';
import { StadiumGames } from '@/pages-components/stadiums/stadium/StadiumGames';

export const StadiumPage = ({ stadiumId }: { stadiumId: number }) => {
  const [stadium, setStadium] = useState<Stadium>();

  useEffect(() => {
    if (stadiumId) {
      getModelManager().then(m => {
        m.getModel('Stadium', stadiumId).then(s => {
          setStadium(s);
        });
      });
    }
  }, [stadiumId]);

  if (!stadium) {
    return;
  }

  return (
    <Grid>
      <Grid.Col span={5}>
        <StadiumInfo stadium={stadium} />
        <StadiumPitches stadium={stadium} />
      </Grid.Col>
      <Grid.Col span={7}>
        <StadiumGames stadium={stadium} />
      </Grid.Col>
    </Grid>
  );
};
