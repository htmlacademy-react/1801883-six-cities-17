import { Cities } from '../../types';
import { CITIES } from '../../consts';
import TabsItem from '../tab-item/tab-item';

type TabsListProps = {
  currentCity: Cities;
  handleTabCLick: (city: Cities) => void;
}


export default function TabsList({currentCity, handleTabCLick}: TabsListProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) =>
            <TabsItem key={ city } isListItem city={ city } isActive={ city === currentCity } handleTabCLick={ handleTabCLick }/>
          )}
        </ul>
      </section>
    </div>
  );
}
