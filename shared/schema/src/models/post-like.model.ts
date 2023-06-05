import { AbstractModel } from './base/abstract.model';
import { Post } from './post.model';
import { User } from './user.model';

export class PostLike extends AbstractModel {
  post: Post;
  user: User;
}
