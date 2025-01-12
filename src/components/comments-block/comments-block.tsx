import { Comment, Authorization } from '../../types';
import CommentItem from '../comment-item/comment-item';
import CommentForm from '../comment-form/comment-form';

type CommentsBlockProps = {
  authorizationStatus: Authorization;
  getComments: () => Comment[];
}

const MAX_COMMENTS_NUMBER = 10;

const sortComments = (commentA: Comment, commentB: Comment) => new Date(commentB.date).getTime() - new Date(commentA.date).getTime();


export default function CommentsBlock({authorizationStatus, getComments}: CommentsBlockProps): JSX.Element {
  const comments = getComments();
  const commentsNumber = comments.length;

  comments.splice(MAX_COMMENTS_NUMBER).sort(sortComments);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{commentsNumber}</span></h2>
      {commentsNumber > 0 && (
        <ul className="reviews__list">
          {comments.map((comment) => <CommentItem key={ comment.id } userComment={ comment } />)}
        </ul>
      )}

      {(authorizationStatus === 'AUTH') && <CommentForm />}
    </section>
  );
}
