import { CITIES } from '../../consts';
import { Cities } from '../../types';
import TabsItem from '../tab-item/tab-item';
import { memo } from 'react';

type TabsListProps = {
  currentCity: Cities;
}


function BaseTabsList({currentCity}: TabsListProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) =>
            <TabsItem key={ city } city={ city } isActive={ city === currentCity } isListItem />
          )}
        </ul>
      </section>
    </div>
  );
}

export const TabsList = memo(BaseTabsList);
