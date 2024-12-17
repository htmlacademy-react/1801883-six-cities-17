import { Offer, FullOffer, Comment, Authorization } from '../../types';
import { capitalizeFirstLetter, checkPluralRule } from '../../utils';
import { useParams } from 'react-router-dom';
import ErrorPage from '../error-page/error-page';
import Gallery from '../../components/offer-components/gallery/gallery';
import Premium from '../../components/offer-components/premium/premium';
import BookmarkButton from '../../components/offer-components/bookmark-button/bookmark-button';
import Rating from '../../components/offer-components/rating/rating';
import Price from '../../components/offer-components/price/price';
import HostInformation from '../../components/host-information/host-information';
import CommentsBlock from '../../components/comments-block/comments-block';
import Map from '../../components/map/map';
import OfferCardsList from '../../components/offer-cards-list/offer-cards-list';

type OfferPageProps = {
  nearOffers: Offer[];
  authorizationStatus: Authorization;
  getFullOffer: (id: string) => FullOffer | null;
  getComments: () => Comment[];
}


export default function OfferPage({nearOffers, authorizationStatus, getFullOffer, getComments}: OfferPageProps): JSX.Element {
  const offerId = useParams().id;
  const displayedOffer = offerId ? getFullOffer(offerId) : null;

  if(displayedOffer) {
    const {title, type, price, isFavorite, isPremium, rating, bedrooms, goods, images, maxAdults} = displayedOffer;

    return (
      <main className="page__main page__main--offer">
        <section className="offer">
          <Gallery images={ images } />

          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && <Premium isBigElement />}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                <BookmarkButton isFavorite={ isFavorite } isBigElement />
              </div>

              <Rating rating={ rating } type='BigElement'/>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{capitalizeFirstLetter(type)}</li>
                <li className="offer__feature offer__feature--bedrooms">{checkPluralRule(bedrooms, 'Bedroom')}</li>
                <li className="offer__feature offer__feature--adults">{`Max ${checkPluralRule(maxAdults, 'adult')}`}</li>
              </ul>

              <Price price={ price } isBigElement />
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {
                    goods.map((good) => (<li className="offer__inside-item" key={ good }>{good}</li>))
                  }
                </ul>
              </div>

              <HostInformation />
              <CommentsBlock authorizationStatus={ authorizationStatus } getComments={ getComments } />
            </div>
          </div>

          <Map offers={ nearOffers } isOfferPage />
        </section>

        <div className="container">
          <OfferCardsList offers={ nearOffers } currentCity={ displayedOffer.city.name } listType={ 'Near' } />
        </div>
      </main>
    );
  }

  return <ErrorPage />;
}
