import { Cities } from '../../../types';
import { checkPluralRule } from '../../../utils';
import SortingForm from '../../sorting-form/sorting-form';

type MainListInfoProps = {
  offersNumber: number;
  currentCity: Cities;
}


export default function MainListInfo({offersNumber, currentCity}: MainListInfoProps): JSX.Element {
  if (offersNumber > 0) {
    return (
      <>
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{checkPluralRule(offersNumber, 'place')} to stay in {currentCity}</b>
        <SortingForm />
      </>
    );
  }

  return (
    <div className="cities__status-wrapper tabs__content">
      <b className="cities__status">No places to stay available</b>
      <p className="cities__status-description">We could not find any property available at the moment in {currentCity}</p>
    </div>
  );
}
