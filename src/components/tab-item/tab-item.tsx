import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Cities } from '../../types';
import { AppRoute } from '../../consts';

type TabItemProps = {
  city: Cities;
  isListItem?: boolean;
  isActive?: boolean;
  handleTabCLick: (city: Cities) => void;
}


export default function TabItem({city, isListItem, isActive, handleTabCLick}: TabItemProps): JSX.Element {
  const classLink = classNames('locations__item-link', {
    'tabs__item': isListItem,
    'tabs__item--active': isListItem && isActive
  });
  const Tag = isListItem ? 'li' : 'div';

  return (
    <Tag className="locations__item">
      <Link to={ AppRoute.Main.Path } className={ classLink } onClick={ ()=> handleTabCLick(city) }>
        <span>{city}</span>
      </Link>
    </Tag>
  );
}

