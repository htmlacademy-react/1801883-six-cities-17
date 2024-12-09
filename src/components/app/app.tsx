import { Offer, User } from '../../types';
import MainPage from '../../pages/main-page/main-page';

type AppProps = {
  offers: Offer[];
  favoriteOffers: Offer[];
  user?: User;
}


export default function App ({offers, favoriteOffers, user}: AppProps): JSX.Element {
  return (
    <MainPage
      offers={ offers }
      favoriteOffers={ favoriteOffers }
      user={ user }
    />
  );
}
