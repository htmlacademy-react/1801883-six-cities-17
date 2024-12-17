import { RatingRange } from '../../consts';

type RatingProps = {
  rating: number;
}


export default function Rating({rating}: RatingProps): JSX.Element {
  const ratingInPercent: number = (Math.round(rating) / (RatingRange.Max - RatingRange.Min)) * 100;

  return (
    <div className="place-card__rating rating">
      <div className="place-card__stars rating__stars">
        <span style={{ width: `${ratingInPercent}%` }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
}
