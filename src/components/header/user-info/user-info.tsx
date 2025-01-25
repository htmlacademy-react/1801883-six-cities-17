import { AppRoute } from '../../../consts';
import { logout } from '../../../store/user/user-thunks';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { Link } from 'react-router-dom';
import { Avatar } from '../../avatar/avatar';

type UserInfoProps = {
  isLogged?: boolean;
  email?: string;
  avatarUrl?: string;
  favoriteCount?: number;
}


export default function UserInfo({isLogged = false, email, avatarUrl, favoriteCount}: UserInfoProps): JSX.Element {
  const linkRoute = isLogged ? AppRoute.Favorites : AppRoute.Login;
  const dispatch = useAppDispatch();

  const handleSignOutClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(logout());
  };


  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link to={ linkRoute.Path } title={ linkRoute.Title } className="header__nav-link header__nav-link--profile">
            <Avatar type='Header' avatarUrl={ avatarUrl }/>

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
            <Link to='' className="header__nav-link" onClick={ handleSignOutClick }>
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
