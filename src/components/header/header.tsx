import { User } from '../../types';
import Logo from '../logo/logo';
import UserInfo from './components/user-info';

type HeaderProps = {
  isLoginHidden?: boolean;
  isMainPage?: boolean;
  user: User | null;
  favoriteCount: number;
}


export default function Header({isLoginHidden = false, isMainPage = false, user, favoriteCount}: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo logoType='header' isActive={ isMainPage } />
          </div>

          {isLoginHidden || (
            user
              ? <UserInfo isLogged email={ user.email } favoriteCount={ favoriteCount } />
              : <UserInfo />
          )}
        </div>
      </div>
    </header>
  );
}
