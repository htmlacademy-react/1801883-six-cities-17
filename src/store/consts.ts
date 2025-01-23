const MAX_NEAR_OFFERS_NUMBER = 3;

const APIRoute = {
  Offers: '/offers',
  Login: '/login',
  Logout: '/logout',
  Favorite: '/favorite',
  Comments: '/comments'
} as const;

const LoadingStatus = {
  Unknown: 'Unknown',
  Loading: 'Loading',
  Loaded: 'Loaded',
  Error: 'Error'
} as const;

const SliceName = {
  App: 'APP',
  Offers: 'OFFERS',
  Offer: 'FULL_OFFER',
  User: 'USER',
} as const;

export { MAX_NEAR_OFFERS_NUMBER, APIRoute, LoadingStatus, SliceName };
