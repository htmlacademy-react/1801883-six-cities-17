import { Offer, User } from '../../types';
import MainPage from '../../pages/main-page/main-page';

type AppProps = {
  offers: Offer[];
  favorites: Offer[];
  user?: User;
}


export default function App ({offers, favorites, user}: AppProps): JSX.Element {
  return (
    <MainPage
      offers={ offers }
      favorites={ favorites }
      user={ user }
    />
  );
}
