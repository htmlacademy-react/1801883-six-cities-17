import { postComment } from '../../store/api-actions';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { RatingStar } from './components/rating-star';

const DEFAULT_RATING = 0;

const StarSetting = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' }
] as const;

const TextLimit = {Min: 50, Max: 300} as const;


export default function CommentForm(): JSX.Element {
  const offerId = useParams().id;
  const [userRating, setUserRating] = useState(DEFAULT_RATING);
  const [userComment, setUserComment] = useState('');
  const isLoading = useAppSelector((state) => state.isNewCommentLoading);
  const isSubmitEnable = userComment.length >= TextLimit.Min && userComment.length <= TextLimit.Max && Boolean(userRating);
  const dispatch = useAppDispatch();

  const handleStarChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setUserRating(Number(evt.target.value));
    }, []);

  const handleTextChange = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      setUserComment(evt.target.value);
    }, []);

  const handleFormSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    if (offerId) {
      dispatch(postComment({id: offerId, data: {rating: userRating, comment: userComment} }))
        .then(({meta}) => {
          if (meta.requestStatus === 'rejected') {
            toast.error('Failed to send review');
          } else {
            setUserRating(DEFAULT_RATING);
            setUserComment('');
          }
        });
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={ handleFormSubmit }>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          StarSetting.map(({value, title}) => (
            <RatingStar
              key={ title }
              value={ value }
              title={ title }
              isChecked={ userRating === value }
              isDisabled={ isLoading }
              handleStarChange={ handleStarChange }
            />
          ))
        }
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={ userComment }
        disabled={ isLoading }
        onChange={ handleTextChange }
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{TextLimit.Min} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isLoading || !isSubmitEnable}>Submit</button>
      </div>
    </form>
  );
}
