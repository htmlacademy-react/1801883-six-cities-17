import { generateOffers } from './mock-offers';
import { getFavorites } from './mock-favorites';
import { Offer, User } from '../types';


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
}
