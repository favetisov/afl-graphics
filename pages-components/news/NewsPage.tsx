import { Divider, Button, Group, Paper, Title, TextInput, Modal } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Search as SearchIcon } from 'tabler-icons-react';
import { NewsTable } from '@/pages-components/news/NewsTable';
import { Post } from '@/shared/schema/src/models/post.model';
import { getModelManager } from '@/shared/schema/src/models/manager/model-manager';

import orderBy from 'lodash-es/orderBy';
import { filter } from '@/shared/tools/helpers';
import { PostForm } from '../post/PostForm';
import { LeaguesSelect } from '@/shared/shared-frontend/components/LeaguesSelect/LeaguesSelect';

export const NewsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [news, setNews] = useState<Post[]>();
  const [leagueId, setLeagueId] = useState();

  useEffect(() => {
    getModelManager().then(m => {
      m.getNews(JSON.stringify([])).then(res => {
        setNews(orderBy(res, ['dt'], ['desc']));
      });
    });
  }, []);

  const newsFiltered = news ? filter(news, searchQuery, ['title']) : null;

  return (
    <Paper withBorder px={'sm'} my={'md'}>
      <Group position={'apart'} p={'md'}>
        <Title order={4}>News</Title>
        <Button onClick={() => setModalOpen(true)} size={'xs'}>
          Create new post (Ctrl + A)
        </Button>
      </Group>
      <Divider variant={'dashed'} />
      <Group>
        <TextInput icon={<SearchIcon size={14} />} placeholder={'Search'} size={'xs'} my={'xs'} style={{ flex: 1 }} onChange={e => setSearchQuery(e.currentTarget.value)} />
        <LeaguesSelect onLeagueChange={l => setLeagueId(l._id)} />
      </Group>
      <Divider variant={'dashed'} mb={'sm'} />
      <NewsTable news={newsFiltered} />

      <Modal centered opened={modalOpen} title={'Create post'} onClose={() => setModalOpen(false)} size={'lg'} overflow={'inside'}>
        <Divider variant={'dashed'} mb={'md'} />
        <PostForm />
        <Divider variant={'dashed'} mt={'md'} />
        <Group position={'apart'} pt={'md'}>
          <Button fullWidth>Create post</Button>
        </Group>
      </Modal>
    </Paper>
  );
};
