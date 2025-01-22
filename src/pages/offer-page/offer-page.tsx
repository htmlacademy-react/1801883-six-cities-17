import { fetchFullOffer, fetchNearOffers, fetchComments } from '../../store/api-actions';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ErrorPage from '../error-page/error-page';
import Spinner from '../../components/spinner/spinner';
import Gallery from '../../components/offer-components/gallery/gallery';
import Premium from '../../components/offer-components/premium/premium';
import BookmarkButton from '../../components/offer-components/bookmark-button/bookmark-button';
import Rating from '../../components/offer-components/rating/rating';
import Features from '../../components/offer-components/features/features';
import Price from '../../components/offer-components/price/price';
import Goods from '../../components/offer-components/goods/goods';
import HostInformation from '../../components/offer-components/host-information/host-information';
import CommentsBlock from '../../components/comments-block/comments-block';
import Map from '../../components/map/map';
import { OfferCardsList } from '../../components/offer-cards-list/offer-cards-list';


export default function OfferPage(): JSX.Element {
  const {data: offer, status: offerStatus} = useAppSelector((state) => state.loadedFullOffer);
  const {data: comments} = useAppSelector((state) => state.loadedComments);
  const {data: nearOffers} = useAppSelector((state) => state.loadedNearOffers);
  const offerId = useParams().id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (offerId) {
      dispatch(fetchFullOffer({id: offerId}));
      dispatch(fetchNearOffers({id: offerId}));
      dispatch(fetchComments({id: offerId}));
    }
  }, [offerId, dispatch]);

  if (offerStatus === 'Loading') {
    return <Spinner/>;
  }

  if(!offer) {
    return <ErrorPage />;
  }

  const {title, type, price, isFavorite, isPremium, rating, description, bedrooms, goods, host, images, maxAdults} = offer;

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
            <Features type={ type } bedrooms={ bedrooms } maxAdults={ maxAdults }/>
            <Price price={ price } isBigElement />
            <Goods goods={ goods }/>
            <HostInformation host={ host } description={ description }/>
            <CommentsBlock comments={ comments } />
          </div>
        </div>

        <Map offers={ nearOffers } selectedOffer={ offer } isOfferPage />
      </section>

      <div className="container">
        <OfferCardsList offers={ nearOffers } isEmptyList={ nearOffers.length === 0 } currentCity={ offer.city.name } listType={ 'Near' } />
      </div>
    </main>
  );
}
