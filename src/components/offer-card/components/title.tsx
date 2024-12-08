type TitleProps = {
  title: string;
}


export default function Title({title}: TitleProps): JSX.Element {
  return (
    <h2 className="place-card__name">
      <a href="#">{title}</a>
    </h2>
  );
}
