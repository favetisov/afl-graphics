import { getModelManager, ModelManager } from '@/shared/schema/src/models/manager/model-manager';
import { Post } from '@/shared/schema/src/models/post.model';
import { Button, Divider, Group, Paper, Title } from '@mantine/core';
import { useState, useEffect } from 'react';

import { PostForm } from '@/pages-components/post/PostForm';

export const PostPage = ({ postId }: { postId: number }) => {
  const [post, setPost] = useState<Post>();
  const manager = new ModelManager();

  useEffect(() => {
    if (postId) {
      getModelManager().then(m => {
        m.getModel('Post', postId).then(p => {
          setPost(p);
        });
      });
    }
  }, [postId]);

  return (
    <Paper withBorder p={'sm'} my={'md'}>
      <Group position={'apart'} py={'md'}>
        <Title order={4}>Edit post</Title>
      </Group>
      <Divider variant={'dashed'} mb={'md'} />
      <PostForm post={post} />
      <Divider variant={'dashed'} mt={'md'} />
      <Group position={'apart'} pt={'md'}>
        <Button color={'red'} variant={'subtle'}>
          Delete post
        </Button>
        <Button>Save changes</Button>
      </Group>
    </Paper>
  );
};
