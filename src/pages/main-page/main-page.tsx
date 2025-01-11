import { Offer, Cities } from '../../types';
import { useState } from 'react';
import classNames from 'classnames';
import TabsList from '../../components/tabs-list/tabs-list';
import OfferCardsList from '../../components/offer-cards-list/offer-cards-list';
import Map from '../../components/map/map';

type MainPageProps = {
  offers: Offer[];
  currentCity: Cities;
  handleTabCLick: (city: Cities) => void;
}


export default function MainPage({offers, currentCity, handleTabCLick}: MainPageProps): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const isEmptyList = offers.length === 0;

  return (
    <main className={classNames('page__main page__main--index', {'page__main--index-empty': isEmptyList})}>
      <h1 className="visually-hidden">Cities</h1>
      <TabsList currentCity={ currentCity } handleTabCLick={ handleTabCLick }/>

      <div className="cities">
        <div className={classNames('cities__places-container container', {'cities__places-container--empty': isEmptyList})}>
          <OfferCardsList offers={ offers } currentCity={ currentCity } handleOfferMouseOver={ setSelectedOffer }/>
          <div className="cities__right-section">
            {isEmptyList || <Map offers={ offers } selectedOffer={ selectedOffer } />}
          </div>
        </div>
      </div>
    </main>
  );
}
