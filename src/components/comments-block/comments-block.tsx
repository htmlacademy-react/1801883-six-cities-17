import { Comment, Authorization } from '../../types';
import CommentItem from '../comment-item/comment-item';
import CommentForm from '../comment-form/comment-form';

type CommentsBlockProps = {
  authorizationStatus: Authorization;
  getComments: () => Comment[];
}

const MAX_COMMENTS_NUMBER = 10;


export default function CommentsBlock({authorizationStatus, getComments}: CommentsBlockProps): JSX.Element {
  const comments = getComments();

  if (comments.length > MAX_COMMENTS_NUMBER) {
    comments.splice(MAX_COMMENTS_NUMBER);
  }

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      {comments.length > 0 && (
        <ul className="reviews__list">
          {comments.map((comment) => <CommentItem key={ comment.id } userComment={ comment } />)}
        </ul>
      )}

      {(authorizationStatus === 'AUTH') && <CommentForm />}
    </section>
  );
}
