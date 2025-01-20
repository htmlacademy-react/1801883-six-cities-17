import Logo from '../logo/logo';
import { useAppSelector } from '../../hooks/use-app-selector';
import UserInfo from './components/user-info';

type HeaderProps = {
  isLoginHidden?: boolean;
  isMainPage?: boolean;
  favoriteCount: number;
}


export default function Header({isLoginHidden = false, isMainPage = false, favoriteCount}: HeaderProps): JSX.Element {
  const user = useAppSelector((state) => state.user.data);
  const isAuthorized = useAppSelector((state) => state.authorizationStatus === 'AUTH');

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo logoType='header' isActive={ isMainPage } />
          </div>

          {isLoginHidden || (
            isAuthorized && user
              ? <UserInfo isLogged email={ user.email } favoriteCount={ favoriteCount } />
              : <UserInfo />
          )}
        </div>
      </div>
    </header>
  );
}
