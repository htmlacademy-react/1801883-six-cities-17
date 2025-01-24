import { memo } from 'react';

type PremiumProps = {
  isBigElement?: boolean;
}

function BasePremium({isBigElement = false}: PremiumProps): JSX.Element {
  return (
    <div className={isBigElement ? 'offer__mark' : 'place-card__mark'}>
      <span>Premium</span>
    </div>
  );
}

export const Premium = memo(BasePremium);
