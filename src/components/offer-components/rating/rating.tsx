import { memo } from 'react';

type RatingProps = {
  rating: number;
  type?: keyof typeof RatingClass;
}

const RatingRange = {
  Min: 0,
  Max: 5
} as const;

const RatingClass = {
  Base: 'place-card',
  BigElement: 'offer',
  Comment: 'reviews'
} as const;


function BaseRating({rating, type = 'Base'}: RatingProps): JSX.Element {
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

export const Rating = memo(BaseRating);
