import { AppRoute } from '../../consts';
import { User } from '../../types';
import { getPageName } from '../../utils';
import { Helmet } from 'react-helmet-async';
import classNames from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/header/header';
import Logo from '../../components/logo/logo';

type LayoutProps = {
  favoriteCount: number;
  user: User | null;
}


export default function Layout({favoriteCount, user}: LayoutProps): JSX.Element {
  const currentPagePath = useLocation().pathname;
  const currentPageName = getPageName(currentPagePath);
  const isAdditionalClass = currentPageName === 'Main' || currentPageName === 'Login' || currentPageName === 'Favorites' && favoriteCount === 0;

  const divClass = classNames('page', {
    [AppRoute[currentPageName].AdditionalClass]: isAdditionalClass
  });

  return (
    <div className={ divClass }>
      <Helmet>
        <title>{ AppRoute[currentPageName].Title }</title>
      </Helmet>

      <Header isLoginHidden={ currentPageName === 'Login' } isMainPage={ currentPageName === 'Main' } user={ user } favoriteCount={ favoriteCount } />

      <Outlet />

      {currentPageName === 'Favorites' &&
      (
        <footer className="footer container">
          <Logo logoType='footer' />
        </footer>
      )}
    </div>
  );
}
