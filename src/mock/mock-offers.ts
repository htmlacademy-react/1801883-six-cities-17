import { flipCoin, getRandomElement } from './utils';
import { generateRandomNumber } from '../utils';
import { CITIES, OFFER_TYPES, RatingRange } from '../consts';
import { Offer, Location } from '../types';

const CityLocation = {
  Paris: {latitude: 48.85661, longitude: 2.351499, zoom: 13},
  Cologne: {latitude: 50.938361, longitude: 6.959974, zoom: 13},
  Brussels: {latitude: 50.846557, longitude: 4.351697, zoom: 13},
  Amsterdam: {latitude: 52.37454, longitude: 4.897976, zoom: 13},
  Hamburg: {latitude: 53.550341, longitude: 10.000654, zoom: 13},
  Dusseldorf: {latitude: 51.225402, longitude: 6.776314, zoom: 13}
} as const;

const TITLES = [
  'The Joshua Tree House',
  'Beautiful & luxurious apartment at great location',
  'The Pondhouse - A Magical Place',
  'Nice, cozy, warm big bed apartment',
  'Perfectly located Castro',
  'Canal View Prinsengracht',
] as const;
const ImageRange = { Min: 1, Max: 20 } as const;
const LocationRange = { Min: 0.04, Max: 0.04, Zoom: 16 } as const;
const OFFERS_NUMBER = 20;


const generateLocation = (cityLocation: Location): Location => (
  {
    latitude: generateRandomNumber(cityLocation.latitude - LocationRange.Min, cityLocation.latitude + LocationRange.Max, false),
    longitude: generateRandomNumber(cityLocation.longitude - LocationRange.Min, cityLocation.longitude + LocationRange.Max, false),
    zoom: LocationRange.Zoom,
  }
);

const generateOffer = (): Offer => {
  const city = getRandomElement([...CITIES]);

  return {
    id: crypto.randomUUID(),
    title: getRandomElement([...TITLES]),
    type: getRandomElement([...OFFER_TYPES]),
    price: generateRandomNumber(),
    city: {
      name: city,
      location: CityLocation[city],
    },
    location: generateLocation(CityLocation[city]),
    isFavorite: flipCoin(),
    isPremium: flipCoin(),
    rating: generateRandomNumber(RatingRange.Min, RatingRange.Max, false),
    previewImage: `https://16.design.htmlacademy.pro/static/hotel/${generateRandomNumber(ImageRange.Min, ImageRange.Max)}.jpg`
  };
};

export const generateOffers = (): Offer[] => Array.from({length: OFFERS_NUMBER}, () => generateOffer());
