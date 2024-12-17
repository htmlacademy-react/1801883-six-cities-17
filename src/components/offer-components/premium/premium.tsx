type PremiumProps = {
  isBigElement?: boolean;
}

export default function Premium({isBigElement = false}: PremiumProps): JSX.Element {
  return (
    <div className={isBigElement ? 'offer__mark' : 'place-card__mark'}>
      <span>Premium</span>
    </div>
  );
}
