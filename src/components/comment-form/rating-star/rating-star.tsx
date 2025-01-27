import { memo } from 'react';

type RatingStarProps = {
  value: number;
  title: string;
  isChecked: boolean;
  isDisabled: boolean;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}


function BaseRatingStar({value, title, isChecked, isDisabled, onChange}: RatingStarProps): JSX.Element {
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={value}
        id={ `${value}-stars` }
        type="radio"
        disabled={ isDisabled }
        checked={ isChecked }
        onChange={ onChange }
      />

      <label htmlFor={ `${value}-stars` } className="reviews__rating-label form__rating-label" title={ title }>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export const RatingStar = memo(BaseRatingStar);
