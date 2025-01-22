import { Offer } from '../../types';
import { useState, useCallback } from 'react';
import { useAppSelector } from '../../hooks/use-app-selector';
import classNames from 'classnames';
import { TabsList } from '../../components/tabs-list/tabs-list';
import { OfferCardsList } from '../../components/offer-cards-list/offer-cards-list';
import Map from '../../components/map/map';
import Spinner from '../../components/spinner/spinner';


export default function MainPage(): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const offers = useAppSelector((state) => state.offers[state.currentCity]);
  const loadingStatus = useAppSelector((state) => state.loadedOffers.status);
  const currentCity = useAppSelector((state) => state.currentCity);
  const isEmptyList = offers.length === 0;

  const handleOfferMouseOver = useCallback(
    (id: Offer | null) => setSelectedOffer(id), []
  );

  return (
    <main className={classNames('page__main page__main--index', {'page__main--index-empty': isEmptyList})}>
      <h1 className="visually-hidden">Cities</h1>
      <TabsList currentCity={ currentCity }/>

      {loadingStatus === 'Loading'
        ? <Spinner />
        : (
          <div className="cities">
            <div className={classNames('cities__places-container container', {'cities__places-container--empty': isEmptyList})}>
              <OfferCardsList offers={ offers } isEmptyList={ isEmptyList } currentCity={ currentCity } handleOfferMouseOver={ handleOfferMouseOver }/>
              <div className="cities__right-section">
                {isEmptyList || <Map offers={ offers } selectedOffer={ selectedOffer } />}
              </div>
            </div>
          </div>
        )}
    </main>
  );
}
