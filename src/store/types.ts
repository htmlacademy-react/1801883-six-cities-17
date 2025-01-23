import { LoadingStatus } from './consts';
import { Offer, FullOffer, Cities, User, SortingType, Authorization } from '../types';
import { sortOffersByCity } from '../utils';
import { AxiosInstance } from 'axios';
import { AppDispatch } from '../hooks/use-app-dispatch';
import { State } from '../hooks/use-app-selector';

type ThunkApiConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
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

type LoginData = {
  email: string;
  password: string;
};

type CommentData = {
  comment: string;
  rating: number;
};

export type { ThunkApiConfig, AppState, LoadedData, LoginData, CommentData };
