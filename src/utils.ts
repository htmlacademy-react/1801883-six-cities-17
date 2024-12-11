import { AppRoute } from './consts';
import { Page } from './types';


const capitalizeFirstLetter = (inputWord: string): string => inputWord[0].toUpperCase() + inputWord.slice(1);

const getPageName = (path: string): Page | null => {
  const processedPath = path.replace(/\/offer\/[^/]+/, '/offer/:id');

  for (const key in AppRoute) {
    if (AppRoute[key as Page].Path === processedPath) {
      return key as Page;
    }
  }
  return null;
};

export { capitalizeFirstLetter, getPageName };
