import { generateRandomNumber, getUniqRandomElement } from './utils';
import { Offer } from '../types';

const MIN_NUMBER = 0;


export const getFavorites = (offers: Offer[]): Offer[] => {
  const favorites: Offer[] = [];
  const favoritesNumber = generateRandomNumber(MIN_NUMBER, offers.length);
  const getOffer = getUniqRandomElement<Offer>([...offers]);

  for (let i = 0; i < favoritesNumber; i++) {
    favorites.push(getOffer());
  }

  return favorites;
};
