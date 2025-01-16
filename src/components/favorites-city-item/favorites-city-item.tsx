import { Offer, Cities } from '../../types';
import TabItem from '../tab-item/tab-item';
import OfferCard from '../offer-card/offer-card';

type FavoritesListProps = {
  city: Cities;
  favoriteOffers: Offer[];
}


export default function FavoritesCityItem({city, favoriteOffers}: FavoritesListProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <TabItem city={ city }/>
      </div>

      <div className="favorites__places">
        {favoriteOffers.map((offer) => <OfferCard key={ offer.id } offer={ offer } cardType='Favorite' />)}
      </div>
    </li>
  );
}
