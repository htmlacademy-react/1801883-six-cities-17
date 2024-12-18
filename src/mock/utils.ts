import { generateRandomNumber } from '../utils';

const flipCoin = (): boolean => Boolean(Math.round(Math.random()));

const getRandomElement = <T>(items: T[]): T => items[generateRandomNumber(0, items.length - 1)];

const getUniqRandomElement = <T>(items: T[]): (() => T) => (
  () => {
    const indexElement = generateRandomNumber(0, items.length - 1);
    const element = items[indexElement];
    items.splice(indexElement, 1);

    return element;
  }
);

export{ flipCoin, getRandomElement, getUniqRandomElement };
