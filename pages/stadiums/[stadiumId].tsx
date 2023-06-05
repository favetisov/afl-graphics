import { useRouter } from 'next/router';
import { PageLayout } from '@/layout/PageLayout';
import { StadiumPage } from '@/pages-components/stadiums/stadium/StadiumPage';

const Stadium = () => {
  const router = useRouter();
  const stadiumId = parseInt(router.query?.stadiumId + '');

  return (
    <PageLayout>
      <StadiumPage stadiumId={stadiumId} />
    </PageLayout>
  );
};

export default Stadium;
