import { Offer } from '../../types';
import TabsList from '../../components/tabs-list/tabs-list';
import OfferCardsList from '../../components/offer-cards-list/offer-cards-list';
import Map from '../../components/map/map';

type MainPageProps = {
  offers: Offer[];
}


export default function MainPage({offers}: MainPageProps): JSX.Element {
  //addClass: page__main--index-empty
  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <TabsList />

      <div className="cities">
        <div className="cities__places-container container">
          <OfferCardsList offers={ offers }/>
          <Map />
        </div>
      </div>
    </main>
  );
}
