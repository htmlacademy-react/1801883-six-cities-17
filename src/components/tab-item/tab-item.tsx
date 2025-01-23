import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { changeCity } from '../../store/action';
import { memo } from 'react';
import classNames from 'classnames';
import { Cities } from '../../types';
import { AppRoute } from '../../consts';

type TabItemProps = {
  city: Cities;
  isListItem?: boolean;
  isActive?: boolean;

}


function BaseTabItem({city, isListItem, isActive = false}: TabItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  const classLink = classNames('locations__item-link', {
    'tabs__item': isListItem,
    'tabs__item--active': isListItem && isActive
  });
  const Tag = isListItem ? 'li' : 'div';

  const handleLocationClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    if (isListItem) {
      evt.preventDefault();
    }
    dispatch(changeCity({city: city}));
  };

  return (
    <Tag className="locations__item">
      <Link to={ AppRoute.Main.Path } className={ classLink } onClick={ handleLocationClick }>
        <span>{city}</span>
      </Link>
    </Tag>
  );
}

export const TabItem = memo(BaseTabItem);
