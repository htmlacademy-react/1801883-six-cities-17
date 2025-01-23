import { sortByPriceLow, sortByPriceHigh, sortByRating } from './utils';

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

const OFFER_TYPES = ['room', 'house', 'hotel', 'apartment'] as const;

const AppRoute = {
  Main: {
    Path: '/',
    Title: '6 Cities',
    TitleLink: 'to main page',
    AdditionalClass: 'page--gray page--main'
  },
  Login: {
    Path: '/login',
    Title: '6 Cities: Authorization',
    TitleLink: 'login',
    AdditionalClass: 'page--gray page--login'
  },
  Favorites: {
    Path: '/favorites',
    Title: '6 Cities: Favorites offers',
    TitleLink: 'to favorites offers',
    AdditionalClass: 'page--favorites-empty'
  },
  Offer: {
    Path: '/offer/:id',
    Title: '6 Cities: Offer',
    TitleLink: 'to the offer',
    AdditionalClass: ''
  },
} as const;

const AuthorizationStatus = {
  Auth: 'AUTH',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN'
} as const;

const RatingRange = { Min: 0, Max: 5 } as const;

const SortType = {
  Popular: {
    Name: 'Popular',
    sortMethod: () => 0,
  },
  PriceLow: {
    Name: 'Price: low to high',
    sortMethod: sortByPriceLow,
  },
  PriceHigh: {
    Name: 'Price: high to low',
    sortMethod: sortByPriceHigh,
  },
  Rated: {
    Name: 'Top rated first',
    sortMethod: sortByRating,
  }
} as const;

export { CITIES, OFFER_TYPES, AppRoute, AuthorizationStatus, RatingRange, SortType };
