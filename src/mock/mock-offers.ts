import { generateRandomNumber, flipCoin, getRandomElement } from './utils';
import { CITIES, OFFER_TYPES, RatingRange } from '../consts';
import { Offer, Location } from '../types';

const TITLES = [
  'The Joshua Tree House',
  'Beautiful & luxurious apartment at great location',
  'The Pondhouse - A Magical Place',
  'Nice, cozy, warm big bed apartment',
  'Perfectly located Castro',
  'Canal View Prinsengracht',
] as const;
const ImageRange = { Min: 1, Max: 20 } as const;
const LocationRange = { Min: 0, Max: 60, Zoom: { Min: 0, Max: 16 } } as const;
const OFFERS_NUMBER = 5;


const generateLocation = (): Location => (
  {
    latitude: generateRandomNumber(LocationRange.Min, LocationRange.Max, false),
    longitude: generateRandomNumber(LocationRange.Min, LocationRange.Max, false),
    zoom: generateRandomNumber(LocationRange.Zoom.Min, LocationRange.Zoom.Max),
  }
);

const generateOffer = (): Offer => (
  {
    id: crypto.randomUUID(),
    title: getRandomElement([...TITLES]),
    type: getRandomElement([...OFFER_TYPES]),
    price: generateRandomNumber(),
    city: {
      name: getRandomElement([...CITIES]),
      location: generateLocation(),
    },
    location: generateLocation(),
    isFavorite: flipCoin(),
    isPremium: flipCoin(),
    rating: generateRandomNumber(RatingRange.Min, RatingRange.Max, false),
    previewImage: `https://16.design.htmlacademy.pro/static/hotel/${generateRandomNumber(ImageRange.Min, ImageRange.Max)}.jpg`
  }
);

export const generateOffers = (): Offer[] => Array.from({length: OFFERS_NUMBER}, () => generateOffer());
