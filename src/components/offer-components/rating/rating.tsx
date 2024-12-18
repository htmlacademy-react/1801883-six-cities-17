import { RatingRange } from '../../../consts';

type RatingProps = {
  rating: number;
  type?: keyof typeof RatingClass;
}

const RatingClass = {
  Base: 'place-card',
  BigElement: 'offer',
  Comment: 'reviews'
} as const;


export default function Rating({rating, type = 'Base'}: RatingProps): JSX.Element {
  const ratingInPercent: number = (Math.round(rating) / (RatingRange.Max - RatingRange.Min)) * 100;

  return (
    <div className={ `${RatingClass[type]}__rating rating` }>
      <div className={ `${RatingClass[type]}__stars rating__stars` }>
        <span style={{ width: `${ratingInPercent}%` }}></span>
        <span className="visually-hidden">Rating</span>
      </div>

      {(type === 'BigElement') && <span className="offer__rating-value rating__value">{rating}</span>}
    </div>
  );
}
