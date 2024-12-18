import { AppRoute } from '../../../consts';
import { Link } from 'react-router-dom';
import Avatar from '../../avatar/avatar';

type UserInfoProps = {
  isLogged?: boolean;
  email?: string;
  favoriteCount?: number;
}


export default function UserInfo({isLogged = false, email, favoriteCount}: UserInfoProps): JSX.Element {
  const linkRoute = isLogged ? AppRoute.Favorites : AppRoute.Login;

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link to={ linkRoute.Path } title={ linkRoute.Title } className="header__nav-link header__nav-link--profile">
            <Avatar type='Header'/>

            {isLogged
              ?
              <>
                <span className="header__user-name user__name">{email}</span>
                <span className="header__favorite-count">{favoriteCount}</span>
              </>
              :
              <span className="header__login">Sign in</span>}
          </Link>
        </li>

        {isLogged && (
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
