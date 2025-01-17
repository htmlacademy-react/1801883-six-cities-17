import { SortType } from '../../consts';
import { Offer } from '../../types';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/use-app-selector';
import classNames from 'classnames';
import TabsList from '../../components/tabs-list/tabs-list';
import OfferCardsList from '../../components/offer-cards-list/offer-cards-list';
import Map from '../../components/map/map';


export default function MainPage(): JSX.Element {
  const sortType = useAppSelector((state) => state.sortType);
  const offers = [...useAppSelector((state) => state.offers[state.currentCity])];
  offers.sort(SortType[sortType].sortMethod);
  const currentCity = useAppSelector((state) => state.currentCity);
  const isEmptyList = offers.length === 0;

  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  return (
    <main className={classNames('page__main page__main--index', {'page__main--index-empty': isEmptyList})}>
      <h1 className="visually-hidden">Cities</h1>
      <TabsList currentCity={ currentCity }/>

      <div className="cities">
        <div className={classNames('cities__places-container container', {'cities__places-container--empty': isEmptyList})}>
          <OfferCardsList offers={ offers } isEmptyList={ isEmptyList } currentCity={ currentCity } handleOfferMouseOver={ setSelectedOffer }/>
          <div className="cities__right-section">
            {isEmptyList || <Map offers={ offers } selectedOffer={ selectedOffer } />}
          </div>
        </div>
      </div>
    </main>
  );
}
