const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

const OFFER_TYPES = ['room', 'house', 'hotel', 'apartment'] as const;

const RatingRange = { Min: 0, Max: 5 } as const;

const SortTypes = {
  Popular: {
    name: 'Popular'
  },
  PriceLow: {
    name: 'Price: low to high'
  },
  PriceHigh: {
    name: 'Price: high to low'
  },
  Rated: {
    name: 'Top rated first'
  }
} as const;

export { CITIES, OFFER_TYPES, RatingRange, SortTypes };
