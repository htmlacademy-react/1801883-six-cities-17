import { Offer } from '../../types';
import { AppRoute } from '../../consts';
import { Link } from 'react-router-dom';
import { memo, useMemo } from 'react';
import classNames from 'classnames';
import { Premium } from '../offer-components/premium/premium';
import { PreviewImage } from '../offer-components/preview-image/preview-image';
import { Price } from '../offer-components/price/price';
import BookmarkButton from '../offer-components/bookmark-button/bookmark-button';
import { Rating } from '../offer-components/rating/rating';
import { Title } from '../offer-components/title/title';
import { Type } from '../offer-components/type/type';

type OfferCardProps = {
  offer: Offer;
  cardType: keyof typeof CardClass;
  handleOfferMouseOver?: (id: Offer | null) => void;
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


function BaseOfferCard({offer, cardType, handleOfferMouseOver}: OfferCardProps): JSX.Element {
  const {id, title, type, price, isFavorite, isPremium, rating, previewImage} = offer;
  const currentLink = useMemo(() => ({
    path: AppRoute.Offer.Path.replace(':id', id),
    title: AppRoute.Offer.TitleLink
  }), [id]);

  const cardHandlers = (cardType === 'Main' && handleOfferMouseOver) && {
    onMouseEnter: () => handleOfferMouseOver(offer),
    onMouseLeave: () => handleOfferMouseOver(null)
  };

  return (
    <article className={classNames('place-card', CardClass[cardType].Article)} {...cardHandlers}>
      {isPremium && <Premium />}

      <div className={classNames('place-card__image-wrapper', CardClass[cardType].DivImage)}>
        <Link to={ currentLink.path } title={ currentLink.title }>
          <PreviewImage link={ previewImage } isSmall={ cardType === 'Favorite' } />
        </Link>
      </div>

      <div className={classNames('place-card__info', {'favorites__card-info': cardType === 'Favorite'})}>
        <div className="place-card__price-wrapper">
          <Price price={ price }/>
          <BookmarkButton id={ id } isFavorite={ isFavorite } />
        </div>

        <Rating rating={ rating } />
        <Title title={ title } link={ currentLink }/>
        <Type type={ type } />
      </div>
    </article>
  );
}

export const OfferCard = memo(BaseOfferCard);
