import { Link } from 'react-router-dom';

type TitleProps = {
  title: string;
  link: {
    path: string;
    title: string;
  };
}


export default function Title({title, link}: TitleProps): JSX.Element {
  return (
    <h2 className="place-card__name">
      <Link to={ link.path } title={ link.title }>{title}</Link>
    </h2>
  );
}
