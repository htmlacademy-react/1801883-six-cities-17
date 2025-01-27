import { SortType } from '../../consts';
import { Offer, Cities } from '../../types';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getSortType } from '../../store/app-slice/app-selectors';
import { memo, useMemo, useRef, useEffect } from 'react';
import { MainListInfo } from './main-list-info/main-list-info';
import { OfferCard } from '../offer-card/offer-card';


type OfferCardsListProps = {
  offers: Offer[];
  isEmptyList: boolean;
  currentCity: Cities;
  listType?: keyof typeof ListClassName;
  onMouseOver?: (id: Offer | null) => void;
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


function BaseOfferCardsList({offers, isEmptyList, currentCity, listType = 'Main', onMouseOver}: OfferCardsListProps): JSX.Element {
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    if (section.current) {
      section.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [currentCity]);

  const sortType = useAppSelector(getSortType);
  const sortedOffers = useMemo(() => [...offers].sort(SortType[sortType].SortMethod), [offers, sortType]);

  const sectionClass = classNames({
    [ListClassName.Main.Section.FilledList]: listType === 'Main' && !isEmptyList,
    [ListClassName.Main.Section.EmptyList]: listType === 'Main' && isEmptyList,
    [ListClassName.Near.Section]: listType === 'Near'
  });

  return (
    <section className={ sectionClass } ref={ section }>
      {listType === 'Near' && <h2 className="near-places__title">Other places in the neighbourhood</h2>}
      {listType === 'Main' && <MainListInfo offersNumber={ sortedOffers.length } currentCity={ currentCity } />}

      {isEmptyList || (
        <div className={ classNames('places__list', ListClassName[listType].Div) }>
          {sortedOffers.map((offer: Offer) => <OfferCard key={ offer.id } offer={ offer } cardType={ listType } onMouseOver={ onMouseOver }/>)}
        </div>
      )}
    </section>
  );
}

export const OfferCardsList = memo(BaseOfferCardsList);
