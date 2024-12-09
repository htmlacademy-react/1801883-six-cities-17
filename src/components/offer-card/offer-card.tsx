import { Offer } from '../../types';
import Premium from './components/premium';
import PreviewImage from './components/preview-image';
import Price from './components/price';
import BookmarkButton from '../bookmark-button/bookmark-button';
import Rating from '../rating/rating';
import Title from './components/title';
import Type from './components/type';

type OfferCardProps = {
  offer: Offer;
  cardType: keyof typeof CardClass;
}

const CardClass = {
  Default: {
    Article: 'cities__card',
    DivImage: 'cities__image-wrapper'
  },
  Favorite: {
    Article: 'favorites__card',
    DivImage: 'favorites__image-wrapper'
  },
  Near: {
    Article: 'near-places__card',
    DivImage: 'near-places__image-wrapper'
  }
} as const;


export default function OfferCard({offer, cardType}: OfferCardProps): JSX.Element {
  const {title, type, price, isFavorite, isPremium, rating, previewImage} = offer;

  return (
    <article className={`${CardClass[cardType].Article} place-card`}>
      {isPremium && <Premium />}

      <div className={`${CardClass[cardType].DivImage} place-card__image-wrapper`}>
        <a href="#">
          <PreviewImage link={ previewImage } />
        </a>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <Price price={ price }/>
          <BookmarkButton isFavorite={ isFavorite } />
        </div>

        <Rating rating={ rating } />
        <Title title={ title } />
        <Type type={ type } />
      </div>
    </article>
  );
}
