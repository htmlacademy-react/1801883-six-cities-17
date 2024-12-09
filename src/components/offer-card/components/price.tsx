type PriceProps = {
  price: number;
}

export default function Price({price}: PriceProps): JSX.Element {
  return (
    <div className="place-card__price">
      <b className="place-card__price-value">&euro;{price}</b>
      <span className="place-card__price-text">&#47;&nbsp;night</span>
    </div>
  );
}
