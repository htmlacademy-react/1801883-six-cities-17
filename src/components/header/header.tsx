import Logo from '../logo/logo';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getAuthorizationStatus, getUser } from '../../store/user/user-selectors';
import UserInfo from './user-info/user-info';

type HeaderProps = {
  isLoginHidden?: boolean;
  isMainPage?: boolean;
  favoriteCount: number;
}


export default function Header({isLoginHidden = false, isMainPage = false, favoriteCount}: HeaderProps): JSX.Element {
  const isAuthorized = useAppSelector(getAuthorizationStatus) === 'AUTH';
  const user = useAppSelector(getUser);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo logoType='header' isActive={ isMainPage } />
          </div>

          {isLoginHidden || (
            isAuthorized && user
              ? <UserInfo isLogged email={ user.email } avatarUrl={ user.avatarUrl } favoriteCount={ favoriteCount } />
              : <UserInfo />
          )}
        </div>
      </div>
    </header>
  );
}
