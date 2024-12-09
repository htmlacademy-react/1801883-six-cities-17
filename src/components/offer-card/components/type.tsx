import { capitalizeFirstLetter } from '../../../utils';

type TypeProps = {
  type: string;
}


export default function Type({type}: TypeProps): JSX.Element {
  return (
    <p className="place-card__type">{capitalizeFirstLetter(type)}</p>
  );
}
