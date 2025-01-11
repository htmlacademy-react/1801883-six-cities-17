import { Offer } from '../../types';
import classNames from 'classnames';

type MapProps = {
  offers: Offer[];
  selectedOffer: string | null;
  isOfferPage?: boolean;
}


export default function Map({offers, selectedOffer, isOfferPage = false}: MapProps): JSX.Element {
  return (
    <section className={classNames('map', {'offer__map': isOfferPage, 'cities__map': !isOfferPage})}></section>
  );
}
