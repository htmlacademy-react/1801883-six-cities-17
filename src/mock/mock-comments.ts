import { flipCoin, getRandomElement } from './utils';
import { generateRandomNumber } from '../utils';
import { Comment } from '../types';

const COMMENTS = [
  'Great place, definitely coming back!',
  'Clean, cozy, and conveniently located.',
  'Excellent service and friendly staff.',
  'Really enjoyed it, highly recommend!',
  'Everything was top-notch!',
  'Quiet place, perfect for relaxation.',
  'Great value for money!',
  'Comfortable beds and spacious rooms.',
  'Everything matched the description, thank you!',
  'Wonderful place for a family vacation.'
] as const;
const NAMES = [
  'Jason Statham',
  'Jon Snow',
  'Ivan Ivanov',
  'James Bond',
  'Tyrion Lannister',
] as const;
const AvatarRange = { Min: 0, Max: 70 } as const;
const RatingRange = { Min: 1, Max: 5 } as const;
const CommentsNumber = { Min: 0, Max: 15 } as const;


const generateComment = (): Comment => (
  {
    id: crypto.randomUUID(),
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: getRandomElement([...NAMES]),
      avatarUrl: `https://i.pravatar.cc/150?img=${generateRandomNumber(AvatarRange.Min, AvatarRange.Max)}.jpg`,
      isPro: flipCoin()
    },
    comment: getRandomElement([...COMMENTS]),
    rating: generateRandomNumber(RatingRange.Min, RatingRange.Max),
  }
);

export const generateComments = (): Comment[] => Array.from({length: generateRandomNumber(CommentsNumber.Min, CommentsNumber.Max)}, () => generateComment());
