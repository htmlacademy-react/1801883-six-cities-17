import { User } from '../../types';
import UserInfo from './components/user-info';

type HeaderProps = {
  isLoginHidden?: boolean;
  user?: User;
  favoritesNumber?: number;
}


export default function Header({isLoginHidden = false, user, favoritesNumber}: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </a>
          </div>

          {!isLoginHidden && (
            user
              ? <UserInfo isLogged email={ user.email } favoritesNumber={ favoritesNumber } />
              : <UserInfo />
          )}
        </div>
      </div>
    </header>
  );
}
