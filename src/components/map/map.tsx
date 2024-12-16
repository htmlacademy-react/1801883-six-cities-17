import { Offer } from '../../types';

type MapProps = {
  offers: Offer[];
}

export default function Map({offers}: MapProps): JSX.Element {
  return (
    <div className="cities__right-section">
      {offers.length > 0 && <section className="cities__map map"></section>}
    </div>
  );
}
