import { CITIES, AppRoute } from './consts';
import { Offer, Cities, Page } from './types';


const generateRandomNumber = (min: number = 0, max: number = 1000, isInteger: boolean = true): number => {
  let processedMin: number = Math.min(min, max);
  let processedMax: number = Math.max(min, max);

  if (isInteger) {
    processedMin = Math.ceil(processedMin);
    processedMax = Math.floor(processedMax);
    return Math.floor(Math.random() * (processedMax - processedMin + 1) + processedMin);
  }

  return Math.round((Math.random() * (processedMax - processedMin) + processedMin) * 1000) / 1000;
};

const capitalizeFirstLetter = (inputWord: string): string => inputWord[0].toUpperCase() + inputWord.slice(1);

const checkPluralRule = (itemsNumber: number, itemsName: string): string => `${itemsNumber} ${itemsName}${itemsNumber > 1 ? 's' : ''}`;

const getPageName = (path: string): Page => {
  const processedPath = path.replace(/\/offer\/[^/]+/, '/offer/:id');

  for (const key in AppRoute) {
    if (AppRoute[key as Page].Path === processedPath) {
      return key as Page;
    }
  }
  return 'Main';
};

const sortOffersByCity = (offers: Offer[]) =>
  offers.reduce<Record<Cities, Offer[]>>(
    (groupedOffers, offer) => {
      const key = offer.city.name;
      const group = groupedOffers[key];
      group.push(offer);
      return { ...groupedOffers, [key]: group };
    },
    Object.fromEntries(CITIES.map((city) => [ city, [] as Offer[] ])) as Record<Cities, Offer[]>
  );


export { generateRandomNumber, capitalizeFirstLetter, checkPluralRule, getPageName, sortOffersByCity };
