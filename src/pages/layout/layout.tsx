import { AppRoute } from '../../consts';
import { User } from '../../types';
import { getPageName } from '../../utils';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Header from '../../components/header/header';

type LayoutProps = {
  favoriteCount: number;
  user: User | null;
}


export default function Layout({favoriteCount, user}: LayoutProps): JSX.Element {
  const currentPagePath = useLocation().pathname;
  const currentPageName = getPageName(currentPagePath);

  return (
    <div className="page page--gray page--main">
      <Header isLoginHidden={ currentPageName === 'Login' } user={ user } favoriteCount={ favoriteCount } />

      <Outlet />

      {currentPageName === 'Favorites' &&
      (
        <footer className="footer container">
          <Link to={ AppRoute.Main.Path } className="footer__logo-link" title={ AppRoute.Main.TitleLink } >
            <img
              className="footer__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width="64"
              height="33"
            />
          </Link>
        </footer>
      )}

    </div>
  );
}
