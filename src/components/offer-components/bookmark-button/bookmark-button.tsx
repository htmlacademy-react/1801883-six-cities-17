import { AuthorizationStatus, AppRoute } from '../../../consts';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { useAppSelector } from '../../../hooks/use-app-selector';
import { getAuthorizationStatus } from '../../../store/user-slice/user-selectors';
import { postFavorite } from '../../../store/favorites-slice/favorites-thunks';
import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';


type BookmarkButtonProps = {
  id: string;
  isFavorite: boolean;
  isBigElement?: boolean;
}

const IconSetting = {
  Default: {
    Size: {width: 18, height: 19},
    Class: 'place-card'
  },
  Big: {
    Size: {width: 31, height: 30},
    Class: 'offer'
  }
} as const;


export default function BookmarkButton({id, isFavorite, isBigElement = false}: BookmarkButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const {Size, Class} = useMemo(() => isBigElement ? IconSetting.Big : IconSetting.Default, [isBigElement]);

  const handleButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (authorizationStatus === AuthorizationStatus.Auth) {
      setIsLoading(true);
      dispatch(postFavorite({id: id, value: !isFavorite})).then(() => setIsLoading(false));
    } else {
      navigate(AppRoute.Login.Path);
    }
  };

  return (
    <button
      className={ `${Class}__bookmark-button ${isFavorite ? `${Class}__bookmark-button--active` : ''} button` }
      type="button"
      onClick={ handleButtonClick }
      disabled={ isLoading }
    >
      <svg className={ `${Class}__bookmark-icon` } width={ Size.width } height={ Size.height }>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}
