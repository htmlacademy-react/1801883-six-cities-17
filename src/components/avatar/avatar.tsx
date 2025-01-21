type AvatarProps = {
  type: keyof typeof AvatarSetting;
  avatarUrl?: string;
  isPro?: boolean;
}

const AvatarSetting = {
  Header: {
    Class: 'header',
    Size: {width: 54, height: 54},
    ImageAlternate: 'User avatar'
  },
  Host: {
    Size: {width: 74, height: 74},
    Class: 'offer',
    ImageAlternate: 'Host avatar'
  },
  Comment: {
    Size: {width: 54, height: 54},
    Class: 'reviews',
    ImageAlternate: 'Reviews avatar'
  },
} as const;


export default function Avatar({type, avatarUrl, isPro = false}: AvatarProps): JSX.Element {
  const baseClass = AvatarSetting[type].Class;

  return (
    <div className={ `${baseClass}__avatar-wrapper user__avatar-wrapper ${isPro && `${baseClass}__avatar-wrapper--pro`}` }>
      {avatarUrl &&
        <img
          className={ `${baseClass}__avatar user__avatar` }
          src={ avatarUrl }
          width={ AvatarSetting[type].Size.width }
          height={ AvatarSetting[type].Size.height }
          alt={ AvatarSetting[type].ImageAlternate }
        />}
    </div>
  );
}
