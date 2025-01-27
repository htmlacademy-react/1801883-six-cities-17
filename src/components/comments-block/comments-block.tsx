import { Comment } from '../../types';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getAuthorizationStatus } from '../../store/user-slice/user-selectors';
import { CommentItem } from '../comment-item/comment-item';
import CommentForm from '../comment-form/comment-form';

type CommentsBlockProps = {
  comments: Comment[];
}

const MAX_COMMENTS_NUMBER = 10;


export default function CommentsBlock({comments}: CommentsBlockProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const trimmedComments = [...comments].slice(0, MAX_COMMENTS_NUMBER);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      {comments.length > 0 && (
        <ul className="reviews__list">
          {trimmedComments.map((comment) => <CommentItem key={ comment.id } userComment={ comment } />)}
        </ul>
      )}

      {(authorizationStatus === 'AUTH') && <CommentForm />}
    </section>
  );
}
