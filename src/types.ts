import { CITIES, OFFER_TYPES, AppRoute, AuthorizationStatus, LoadingStatus, SortType } from './consts';
import { sortOffersByCity } from './utils';

type Cities = typeof CITIES[number];

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

type Offer = {
  id: string;
  title: string;
  type: typeof OFFER_TYPES[number];
  price: number;
  previewImage: string;
  city: {
    name: Cities;
    location: Location;
  };
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

type FullOffer = Omit<Offer, 'previewImage'> & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: UserShort;
  images: string[];
  maxAdults: number;
}

type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
}

type UserShort = Omit<User, 'email' | 'token'>;

type Comment = {
  id: string;
  date: string;
  user: UserShort;
  comment: string;
  rating: number;
}

type Page = keyof typeof AppRoute;

type SortingType = keyof typeof SortType;

type Authorization = typeof AuthorizationStatus[keyof typeof AuthorizationStatus];

type LoginData = {
  email: string;
  password: string;
};

type CommentData = {
  comment: string;
  rating: number;
};

type LoadedData<T> = {
  data: T;
  status: typeof LoadingStatus[keyof typeof LoadingStatus];
}

type AppState = {
  offers: ReturnType<typeof sortOffersByCity>;
  currentCity: Cities;
  sortType: SortingType;
  authorizationStatus: Authorization;
  user: LoadedData<User | undefined>;
  loadedOffers: LoadedData<Offer[]>;
  loadedFullOffer: LoadedData<FullOffer | undefined>;
  loadedFavoriteOffers: LoadedData<Offer[]>;
  loadedNearOffers: LoadedData<Offer[]>;
  loadedComments: LoadedData<Comment[]>;
  isNewCommentLoading: boolean;
}

export type { Offer, FullOffer, Cities, Location, User, UserShort, Comment, Page, SortingType, Authorization, LoginData, CommentData, LoadedData, AppState };
