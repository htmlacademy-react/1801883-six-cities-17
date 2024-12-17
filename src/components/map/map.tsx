import { Offer } from '../../types';

type MapProps = {
  offers: Offer[];
  isOfferPage?: boolean;
}


export default function Map({offers, isOfferPage = false}: MapProps): JSX.Element {
  return (
    isOfferPage
      ? <section className="offer__map map"></section>
      : (
        <div className="cities__right-section">
          {offers.length > 0 && <section className="cities__map map"></section>}
        </div>
      )
  );
}
