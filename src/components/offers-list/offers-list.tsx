import SortingForm from '../sorting-form/sorting-form';
import OfferItem from '../offer-item/offer-item';

export default function OffersList(): JSX.Element {
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">312 places to stay in Amsterdam</b>
      <SortingForm />

      <div className="cities__places-list places__list tabs__content">
        <OfferItem />
        <OfferItem />
        <OfferItem />
        <OfferItem />
        <OfferItem />
      </div>
    </section>
  );
}
