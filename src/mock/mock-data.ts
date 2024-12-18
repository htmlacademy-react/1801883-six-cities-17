import { generateOffers } from './mock-offers';
import { getFavorites } from './mock-favorites';
import { generateFullOffer } from './mock-full-offer';
import { generateComments } from './mock-comments';
import { Offer, FullOffer, User, Comment } from '../types';


export default class MockData {
  #offers: Offer[] = generateOffers();
  #favorites: Offer[] = getFavorites(this.#offers);
  #user: User = {
    name: 'Ivan Ivanov',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    isPro: false,
    email: 'ivan@mail.com',
    token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
  };

  get offers() {
    return this.#offers;
  }

  get favorites() {
    return this.#favorites;
  }

  get user() {
    return this.#user;
  }

  getFullOffer = (id: string): FullOffer | null => {
    const fullOffer = this.#offers.find((offer) => offer.id === id);
    return fullOffer ? generateFullOffer(fullOffer) : null;
  };

  getComments = (): Comment[] => generateComments();
}
