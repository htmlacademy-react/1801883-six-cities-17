import { Link } from 'react-router-dom';
import { memo } from 'react';

type TitleProps = {
  title: string;
  link: {
    path: string;
    title: string;
  };
}


function BaseTitle({title, link}: TitleProps): JSX.Element {
  return (
    <h2 className="place-card__name">
      <Link to={ link.path } title={ link.title }>{title}</Link>
    </h2>
  );
}

export const Title = memo(BaseTitle);
