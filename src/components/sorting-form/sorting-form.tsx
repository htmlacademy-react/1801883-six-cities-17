import { SortType } from '../../consts';
import { SortingType } from '../../types';
import { changeSortType } from '../../store/action';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useState } from 'react';
import classNames from 'classnames';


export default function SortingForm(): JSX.Element {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const currentSortingType = useAppSelector((state) => state.sortType);
  const dispatch = useAppDispatch();

  const handleSortTypeClick = (selectedSortType: SortingType) => {
    setIsOpened((prevIsOpened) => !prevIsOpened);
    if (currentSortingType !== selectedSortType) {
      dispatch(changeSortType({sortType: selectedSortType}));
    }
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by&nbsp;</span>
      <span className="places__sorting-type" tabIndex={0} onClick={ () => setIsOpened((prevIsOpened) => !prevIsOpened) }>
        {SortType[currentSortingType].Name}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul className={ classNames('places__options places__options--custom', {'places__options--opened': isOpened}) }>
        {Object.entries(SortType).map(([sortKey, sortType]) =>(
          <li
            key={ sortKey }
            className={ classNames('places__option', {'places__option--active': sortKey === currentSortingType}) }
            tabIndex={ 0 }
            onClick={ () => handleSortTypeClick(sortKey as SortingType) }
          >
            {sortType.Name}
          </li>
        ))}
      </ul>
    </form>
  );
}
