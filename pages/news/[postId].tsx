import { PageLayout } from '@/layout/PageLayout';
import { PostPage } from '@/pages-components/post/PostPage';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Post: NextPage = () => {
  const router = useRouter();
  const postId = parseInt(router.query.postId + '');

  return (
    <PageLayout>
      <PostPage postId={postId} />
    </PageLayout>
  );
};

export default Post;
