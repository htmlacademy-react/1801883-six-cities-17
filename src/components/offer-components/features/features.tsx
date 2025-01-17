import { OFFER_TYPES } from '../../../consts';
import { capitalizeFirstLetter, checkPluralRule } from '../../../utils';

type FeaturesProps = {
  type: typeof OFFER_TYPES[number];
  bedrooms: number;
  maxAdults: number;
}


export default function Features({type, bedrooms, maxAdults}: FeaturesProps): JSX.Element {
  return (
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire">{capitalizeFirstLetter(type)}</li>
      <li className="offer__feature offer__feature--bedrooms">{checkPluralRule(bedrooms, 'Bedroom')}</li>
      <li className="offer__feature offer__feature--adults">{`Max ${checkPluralRule(maxAdults, 'adult')}`}</li>
    </ul>
  );
}
