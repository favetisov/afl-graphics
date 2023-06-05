import { useState } from 'react';
import { Post } from '@/shared/schema/src/models/post.model';

export const PostPhoto = ({ post, height }: { post: Post; height: number }) => {
  const [error, setError] = useState(false);
  const width = height * 1.75;

  if (!error) {
    const src = 'https://6ff87ac8-1c01-4a5d-8145-f60a24de5ae8.selcdn.net/api/img/news/' + post._id + '.jpg?version=' + post.photoId;
    return (
      <div className="image-border-container">
        <img style={{ height: height + 'px', width: width + 'px' }} src={src} alt={post.title} title={post.title} onError={() => setError(true)} />
      </div>
    );
  } else {
    return <div style={{ height: height + 'px', width: width + 'px' }} className={'post-placeholder'} />;
  }
};
