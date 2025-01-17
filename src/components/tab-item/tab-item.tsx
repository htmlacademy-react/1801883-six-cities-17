import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { changeCity } from '../../store/action';
import classNames from 'classnames';
import { Cities } from '../../types';
import { AppRoute } from '../../consts';

type TabItemProps = {
  city: Cities;
  isListItem?: boolean;
  isActive?: boolean;

}


export default function TabItem({city, isListItem, isActive = false}: TabItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  const classLink = classNames('locations__item-link', {
    'tabs__item': isListItem,
    'tabs__item--active': isListItem && isActive
  });
  const Tag = isListItem ? 'li' : 'div';

  return (
    <Tag className="locations__item">
      <Link to={ AppRoute.Main.Path } className={ classLink } onClick={ () => dispatch(changeCity({city: city})) }>
        <span>{city}</span>
      </Link>
    </Tag>
  );
}

