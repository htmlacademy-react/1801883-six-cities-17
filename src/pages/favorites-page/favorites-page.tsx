import { CITIES } from '../../consts';
import { sortOffersByCity } from '../../utils';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getFavorites } from '../../store/favorites-slice/favorites-selectors';
import classNames from 'classnames';
import FavoritesCityItem from '../../components/favorites-city-item/favorites-city-item';


export default function FavoritesPage(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavorites);
  const isEmptyList = favoriteOffers.length === 0;
  const sortedFavoritesByCity = sortOffersByCity(favoriteOffers);

  return (
    <main className={ classNames('page__main page__main--favorites', {'page__main--favorites-empty': isEmptyList}) }>
      <div className="page__favorites-container container">

        <section className={ classNames('favorites', {'favorites--empty': isEmptyList}) }>
          {isEmptyList
            ?
            <>
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </>
            :
            <>
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {CITIES.map((city) => (sortedFavoritesByCity[city].length > 0) &&
                  <FavoritesCityItem key={ city } city={ city } favoriteOffers={ sortedFavoritesByCity[city] }/>
                )}
              </ul>
            </>}
        </section>

      </div>
    </main>
  );
}
