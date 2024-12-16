import { Offer, Cities } from '../../types';
import classNames from 'classnames';
import { useState } from 'react';
import MainListInfo from './components/main-list-info';
import OfferCard from '../offer-card/offer-card';

type OfferCardsListProps = {
  offers: Offer[];
  currentCity: Cities;
  listType?: keyof typeof ListClassName;
};

const ListClassName = {
  Main: {
    Section: {
      FilledList: 'cities__places places',
      EmptyList: 'cities__no-places'
    },
    Div: 'cities__places-list tabs__content'
  },
  Near: {
    Section: 'near-places places',
    Div: 'near-places__list'
  }
} as const;


export default function OfferCardsList({offers, currentCity, listType = 'Main'}: OfferCardsListProps): JSX.Element {
  const [, setSelectedOffer] = useState<string | null>(null);
  const isEmptyList = offers.length === 0;
  const sectionClass = classNames({
    [ListClassName.Main.Section.FilledList]: listType === 'Main' && !isEmptyList,
    [ListClassName.Main.Section.EmptyList]: listType === 'Main' && isEmptyList,
    [ListClassName.Near.Section]: listType === 'Near'
  });

  return (
    <section className={ sectionClass }>
      {listType === 'Near' && <h2 className="near-places__title">Other places in the neighbourhood</h2>}
      {listType === 'Main' && <MainListInfo offersNumber={ offers.length } currentCity={ currentCity } />}

      {isEmptyList || (
        <div className={ classNames('places__list', ListClassName[listType].Div) }>

          {offers.map((offer: Offer) => <OfferCard key={ offer.id } offer={ offer } cardType={ listType } handleOfferMouseOver={ setSelectedOffer }/>)}

        </div>
      )}
    </section>
  );
}
