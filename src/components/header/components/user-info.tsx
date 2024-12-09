import Avatar from '../../avatar/avatar';

type UserInfoProps = {
  isLogged?: boolean;
  email?: string;
  favoritesNumber?: number;
}


export default function UserInfo({isLogged = false, email, favoritesNumber}: UserInfoProps): JSX.Element {
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <a className="header__nav-link header__nav-link--profile" href="#">
            <Avatar />

            {isLogged
              ?
              <>
                <span className="header__user-name user__name">{email}</span>
                <span className="header__favorite-count">{favoritesNumber}</span>
              </>
              :
              <span className="header__login">Sign in</span>}
          </a>
        </li>

        {isLogged &&
          (
            <li className="header__nav-item">
              <a className="header__nav-link" href="#">
                <span className="header__signout">Sign out</span>
              </a>
            </li>
          )}
      </ul>
    </nav>
  );
}
