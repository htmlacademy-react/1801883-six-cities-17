import Header from '../../components/header/header';
import TabsList from '../../components/tabs-list/tabs-list';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';

export default function MainPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <TabsList />

        <div className="cities">
          <div className="cities__places-container container">
            <OffersList />
            <Map />
          </div>
        </div>
      </main>
    </div>
  );
}
