import { useState } from 'react';
import RatingStar from './components/rating-star';

const StarSetting = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' },
] as const;

const TextLimit = {Min: 50, Max: 300} as const;


export default function CommentForm(): JSX.Element {
  const [userComment, setUserComment] = useState({rating: 0, text: ''});
  const isSubmitEnable = userComment.text.length >= TextLimit.Min && userComment.text.length <= TextLimit.Max && Boolean(userComment.rating);

  const handleStarChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUserComment({...userComment, rating: Number(evt.target.value)});
  };

  const handleTextChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserComment({...userComment, text: evt.target.value});
  };


  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          StarSetting.map(({value, title}) => <RatingStar key={ title } value={ value } title={ title } handleStarChange={ handleStarChange }/>)
        }
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={ userComment.text }
        onChange={ handleTextChange }
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{TextLimit.Min} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={ !isSubmitEnable }>Submit</button>
      </div>
    </form>
  );
}
