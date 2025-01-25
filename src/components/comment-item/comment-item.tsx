import { Comment } from '../../types';
import { memo } from 'react';
import { Avatar } from '../avatar/avatar';
import { Rating } from '../offer-components/rating/rating';

type CommentItemProps = {
  userComment: Comment;
}


function BaseCommentItem({userComment}: CommentItemProps): JSX.Element {
  const {date, user, comment, rating} = userComment;
  const formattedDate = new Intl.DateTimeFormat('en-US', {month: 'long', year: 'numeric'}).format(new Date(date));
  const dateTime = date.split('T')[0];

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <Avatar type='Comment' avatarUrl={ user.avatarUrl } isPro={ user.isPro } />
        <span className="reviews__user-name">{user.name}</span>
      </div>

      <div className="reviews__info">
        <Rating rating={ rating } type='Comment'/>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={ dateTime }>{formattedDate}</time>
      </div>
    </li>
  );
}

export const CommentItem = memo(BaseCommentItem);
