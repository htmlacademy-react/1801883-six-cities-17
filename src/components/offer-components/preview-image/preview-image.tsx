import { memo, useMemo } from 'react';

type PreviewImageProps = {
  link: string;
  isSmall: boolean;
}

const Size = {
  Default: {Width: 260, Height: 200},
  Small: {Width: 150, Height: 110}
} as const;


function BasePreviewImage({link, isSmall}: PreviewImageProps): JSX.Element {
  const size = useMemo(() => isSmall ? Size.Small : Size.Default, [isSmall]);

  return (
    <img
      className="place-card__image"
      src={ link }
      width={ size.Width }
      height={ size.Height }
      alt="Place image"
    />
  );
}

export const PreviewImage = memo(BasePreviewImage);
