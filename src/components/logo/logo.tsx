import { AppRoute } from '../../consts';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { memo } from 'react';

type LogoProps = {
  logoType: keyof typeof LogoSettings;
  isActive?: boolean;
}

const LogoSettings = {
  header: {
    width: 81,
    height: 41
  },
  footer: {
    width: 64,
    height: 33
  }
} as const;


function BaseLogo({logoType, isActive = false}: LogoProps): JSX.Element {
  const linkClass = classNames(`${logoType}__logo-link`, {
    'header__logo-link--active': isActive
  });

  return (
    <Link to={ AppRoute.Main.Path } className={ linkClass } title={ AppRoute.Main.TitleLink }>
      <img
        className={ `${logoType}__logo` }
        src="img/logo.svg"
        alt="6 cities logo"
        width={ LogoSettings[logoType].width }
        height={ LogoSettings[logoType].height }
      />
    </Link>
  );
}

export const Logo = memo(BaseLogo);
