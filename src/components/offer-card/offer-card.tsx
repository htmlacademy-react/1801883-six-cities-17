import { Offer } from '../../types';
import { AppRoute } from '../../consts';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
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
  Main: {
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
  const {id, title, type, price, isFavorite, isPremium, rating, previewImage} = offer;
  const currentLink = {
    path: AppRoute.Offer.Path.replace(':id', id),
    title: AppRoute.Offer.TitleLink
  };

  return (
    <article className={classNames('place-card', CardClass[cardType].Article)}>
      {isPremium && <Premium />}

      <div className={classNames('place-card__image-wrapper', CardClass[cardType].DivImage)}>
        <Link to={ currentLink.path } title={ currentLink.title }>
          <PreviewImage link={ previewImage } isSmall={ cardType === 'Favorite' } />
        </Link>
      </div>

      <div className={classNames('place-card__info', {'favorites__card-info': cardType === 'Favorite'})}>
        <div className="place-card__price-wrapper">
          <Price price={ price }/>
          <BookmarkButton isFavorite={ isFavorite } />
        </div>

        <Rating rating={ rating } />
        <Title title={ title } link={ currentLink }/>
        <Type type={ type } />
      </div>
    </article>
  );
}
