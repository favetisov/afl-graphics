import { Tag } from './tag.model';
import { User } from './user.model';
import { AbstractModel } from './base/abstract.model';
import dayjs, { Dayjs } from 'dayjs';
import { marked } from 'marked';
import { PostLike } from './post-like.model';

export class Post extends AbstractModel {
  title?: string = '';
  preview?: string = '';
  date?: string;
  body?: string;
  likes: PostLike[] = [];
  private date_mapped: Dayjs;
  get dt() {
    if (this.date && !this.date_mapped) this.date_mapped = dayjs(this.date);
    return this.date_mapped;
  }
  get tokens() {
    if (!this.body) return [];
    try {
      return marked.lexer(this.body, { gfm: true });
    } catch (e) {
      return [{ type: 'text', text: this.body }];
    }
  }

  get likedBy() {
    return this.likes?.map(pl => pl.user._id);
  }

  photoId: number;
  views?: number;
  author: User;
  tags: Tag[] = [];
  relatedPosts?: Post[] = [];
}
