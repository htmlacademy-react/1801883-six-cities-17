import { flipCoin, getRandomElement, getUniqRandomElement } from './utils';
import { generateRandomNumber } from '../utils';
import { Offer, FullOffer } from '../types';

const DESCRIPTION = [
  'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  'Cozy two-room apartment with modern furniture and appliances. Shops, restaurants, and attractions nearby.',
  'Spacious room with a balcony and ocean view. Breakfast and pool access included.',
  'Bright studio with large windows, fully equipped kitchen, and modern interior. Close to the park and transport.',
  'Three-room apartment with a cozy atmosphere and all amenities. Quiet neighborhood, near public transport stops.',
  'Cozy room with air conditioning and free Wi-Fi. Walking distance to main attractions and restaurants.',
] as const;
const GOODS = [
  'Free Wi-Fi',
  'Air Conditioning',
  'Fully Equipped Kitchen',
  'Washing Machine',
  'Balcony',
  'Swimming Pool Access',
  'Complimentary Breakfast',
  'Pet-Friendly',
  'Parking Space',
  'Gym Access'
] as const;
const AvatarRange = { Min: 0, Max: 70 } as const;
const ImageRange = { Min: 2, Max: 8 } as const;
const BedroomsNumber = { Min: 0, Max: 5 } as const;
const AdultsNumber = { Min: 1, Max: 5 } as const;


export const generateFullOffer = (offer: Offer): FullOffer => {
  const getGoods = getUniqRandomElement([...GOODS]);
  const { previewImage, ...offerWithoutPreviewImage } = offer;
  previewImage.toLowerCase();

  return {
    ... offerWithoutPreviewImage,
    description: getRandomElement([...DESCRIPTION]),
    bedrooms: generateRandomNumber(BedroomsNumber.Min, BedroomsNumber.Max),
    goods: Array.from({length: generateRandomNumber(0, GOODS.length)}, () => getGoods()),
    host: {
      name: 'Ivan Ivanov',
      avatarUrl: `https://i.pravatar.cc/150?img=${generateRandomNumber(AvatarRange.Min, AvatarRange.Max)}.jpg`,
      isPro: flipCoin()
    },
    images: Array.from({length: generateRandomNumber(ImageRange.Min, ImageRange.Max)}, () => `https://picsum.photos/id/${generateRandomNumber()}/260/200`),
    maxAdults: generateRandomNumber(AdultsNumber.Min, AdultsNumber.Max),
  };
};
