import { capitalizeFirstLetter } from '../../../utils';
import { memo } from 'react';

type TypeProps = {
  type: string;
}


function BaseType({type}: TypeProps): JSX.Element {
  return (
    <p className="place-card__type">{capitalizeFirstLetter(type)}</p>
  );
}

export const Type = memo(BaseType);
