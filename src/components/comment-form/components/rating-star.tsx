type RatingStarProps = {
  value: number;
  title: string;
  handleStarChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function RatingStar({value, title, handleStarChange}: RatingStarProps): JSX.Element {
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={value}
        id={ `${value}-stars` }
        type="radio"
        onChange={ handleStarChange }
      />

      <label htmlFor={ `${value}-stars` } className="reviews__rating-label form__rating-label" title={ title }>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}
