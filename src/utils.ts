import { CITIES, AppRoute } from './consts';
import { Offer, Cities, Page } from './types';


const capitalizeFirstLetter = (inputWord: string): string => inputWord[0].toUpperCase() + inputWord.slice(1);

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


export { capitalizeFirstLetter, getPageName, sortOffersByCity };
