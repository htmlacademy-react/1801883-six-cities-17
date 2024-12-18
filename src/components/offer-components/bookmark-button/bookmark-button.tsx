import classNames from 'classnames';

type BookmarkButtonProps = {
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


export default function BookmarkButton({isFavorite, isBigElement = false}: BookmarkButtonProps): JSX.Element {
  const setting = isBigElement ? IconSetting.Big : IconSetting.Default;
  const {width, height} = setting.Size;
  return (
    <button className={classNames(`${setting.Class}__bookmark-button button`, {'place-card__bookmark-button--active': isFavorite})} type="button">
      <svg className="place-card__bookmark-icon" width={ width } height={ height }>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}
