import { Post } from '@/shared/schema/src/models/post.model';
import { Divider, Group, Switch, Text, Textarea, TextInput } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import PostEditor from '@/pages-components/post/PostEditor';
import { NodeHtmlMarkdown } from 'node-html-markdown';

import s from './PostForm.module.scss';
import { useForm } from '@mantine/form';
import { useState } from 'react';

export const PostForm = ({ post }: { post?: any }) => {
  const [title, setTitle] = useState(post?.title);
  const [preview, setPreview] = useState(post?.preview);
  const form = useForm({
    initialValues: {
      title: post?.title || '',
      preview: post?.preview || '',
    },
  });

  let body = '';
  const onEditorChange = e => {
    body = NodeHtmlMarkdown.translate(e);
  };

  const date = post ? post.dt.toDate() : new Date();

  return (
    <div>
      <Group position={'apart'}>
        <Group spacing={'xs'}>
          <Text size={'sm'}>Publish at:</Text>
          <DatePicker size={'xs'} placeholder={'Now'} allowFreeInput className={s.dateInput} labelFormat={'DD.MM.YYYY'} inputFormat={'DD.MM.YYYY'} value={date} clearable={false} />
          <TimeInput size={'xs'} defaultValue={date} className={s.timeInput} value={date} />
        </Group>
        <Switch key={'show'} value={post?.show} checked={post?.show} size={'xs'} label={'Display on website and app'} />
      </Group>
      <Divider variant={'dashed'} my={'md'} />
      <TextInput size={'xs'} defaultValue={post?.title} value={title} onChange={e => setTitle(e.currentTarget?.value)} placeholder={'Post title'} />
      <Divider variant={'dashed'} my={'md'} />
      <Textarea size={'xs'} defaultValue={post?.preview} value={preview} onChange={e => setPreview(e.currentTarget?.value)} placeholder="Post preview" required />
      <Divider variant={'dashed'} my={'md'} />
      <PostEditor
        className={s.postEditor}
        value={post?.body}
        onChange={onEditorChange}
        placeholder={'enter post body'}
        controls={[
          ['bold', 'italic', 'underline', 'link', 'image', 'video'],
          ['h1', 'h2', 'h3'],
        ]}
      />
    </div>
  );
};
