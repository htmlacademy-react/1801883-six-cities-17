import { AppRoute } from '../../consts';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { memo } from 'react';

type LogoProps = {
  logoType: keyof typeof LogoSetting;
  isActive?: boolean;
}

const LogoSetting = {
  Header: {
    Class: 'header',
    Width: 81,
    Height: 41
  },
  Footer: {
    Class: 'footer',
    Width: 64,
    Height: 33
  }
} as const;


function BaseLogo({logoType, isActive = false}: LogoProps): JSX.Element {
  const linkClass = classNames(`${LogoSetting[logoType].Class}__logo-link`, {'header__logo-link--active': isActive});

  return (
    <Link to={ AppRoute.Main.Path } className={ linkClass } title={ AppRoute.Main.TitleLink }>
      <img
        className={ `${LogoSetting[logoType].Class}__logo` }
        src="img/logo.svg"
        alt="6 cities logo"
        width={ LogoSetting[logoType].Width }
        height={ LogoSetting[logoType].Height }
      />
    </Link>
  );
}

export const Logo = memo(BaseLogo);
