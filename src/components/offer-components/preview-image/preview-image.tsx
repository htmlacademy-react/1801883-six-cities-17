type PreviewImageProps = {
  link: string;
  isSmall: boolean;
}

const Size = {
  Default: {
    width: 260,
    height: 200
  },
  Small: {
    width: 150,
    height: 110
  }
} as const;


export default function PreviewImage({link, isSmall}: PreviewImageProps): JSX.Element {
  const {width, height} = isSmall ? Size.Small : Size.Default;

  return (
    <img
      className="place-card__image"
      src={ link }
      width={ width }
      height={ height }
      alt="Place image"
    />
  );
}
