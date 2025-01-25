import { memo } from 'react';

type PriceProps = {
  price: number;
  isBigElement?: boolean;
}

const PriceClass = {
  Default: 'place-card',
  BigElement: 'offer'
} as const;


function BasePrice({price, isBigElement = false}: PriceProps): JSX.Element {
  const extraClass = isBigElement ? PriceClass.BigElement : PriceClass.Default;

  return (
    <div className={`${extraClass}__price`}>
      <b className={`${extraClass}__price-value`}>&euro;{price}</b>
      <span className={`${extraClass}__price-text`}>{!isBigElement && ' /'}&nbsp;night</span>
    </div>
  );
}

export const Price = memo(BasePrice);
