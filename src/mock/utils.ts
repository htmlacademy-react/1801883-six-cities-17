const generateRandomNumber = (min: number = 0, max: number = 1000, isInteger: boolean = true): number => {

  let processedMin: number = Math.min(min, max);
  let processedMax: number = Math.max(min, max);

  if (isInteger) {
    processedMin = Math.ceil(processedMin);
    processedMax = Math.floor(processedMax);
    return Math.floor(Math.random() * (processedMax - processedMin + 1) + processedMin);
  }

  return Math.round((Math.random() * (processedMax - processedMin) + processedMin) * 10) / 10;
};

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

export{ generateRandomNumber, flipCoin, getRandomElement, getUniqRandomElement };
