import { Offer } from '../../types';
import SortingForm from '../sorting-form/sorting-form';
import OfferCard from '../offer-card/offer-card';

type OfferCardsListProps = {
  offers: Offer[];
  listType?: keyof typeof ListClassName;
};

const ListClassName = {
  Near: {
    Section: 'near-places places',
    Div: 'near-places__list'
  },
  Default: {
    Section: 'cities__places places',
    Div: 'cities__places-list tabs__content'
  }
} as const;


export default function OfferCardsList({offers, listType = 'Default'}: OfferCardsListProps): JSX.Element {
  return (
    <section className={ ListClassName[listType].Section }>
      {listType === 'Near'
        ? (<h2 className="near-places__title">Other places in the neighbourhood</h2>)
        : (
          <>
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in {'Paris'}</b>
            <SortingForm />
          </>
        )}

      <div className={`${ListClassName[listType].Div} places__list` }>
        {offers.map((offer: Offer) => (
          <OfferCard
            key={ offer.id }
            offer={ offer }
            cardType={ listType }
          />
        ))}
      </div>
    </section>
  );
}
