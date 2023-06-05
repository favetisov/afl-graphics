import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { PageLayout } from '@/layout/PageLayout';
import { TeamPage } from '@/pages-components/teams/team/TeamPage';

const page = observer(() => {
  const router = useRouter();
  const teamId = parseInt(router.query.teamId + '');

  return (
    <PageLayout>
      <TeamPage teamId={teamId} />
    </PageLayout>
  );
});
export default page;
