import { AppRoute } from '../../consts';
import { getPageName } from '../../utils';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getFavorites } from '../../store/favorites/favorites-selectors';
import { Helmet } from 'react-helmet-async';
import classNames from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/header/header';
import { Logo } from '../../components/logo/logo';


export default function Layout(): JSX.Element {
  const currentPagePath = useLocation().pathname;
  const currentPageName = getPageName(currentPagePath);
  const favoriteCount = useAppSelector(getFavorites).length;

  const isAdditionalClass = currentPageName === 'Main' || currentPageName === 'Login' || currentPageName === 'Favorites' && favoriteCount === 0;

  const divClass = classNames('page', {
    [AppRoute[currentPageName].AdditionalClass]: isAdditionalClass
  });

  return (
    <div className={ divClass }>
      <Helmet>
        <title>{ AppRoute[currentPageName].Title }</title>
      </Helmet>

      <Header isLoginHidden={ currentPageName === 'Login' } isMainPage={ currentPageName === 'Main' } favoriteCount={ favoriteCount } />

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
