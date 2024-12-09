type PreviewImageProps = {
  link: string;
}


export default function PreviewImage({link}: PreviewImageProps): JSX.Element {
  return (
    <img
      className="place-card__image"
      src={link}
      width={260}
      height={200}
      alt="Place image"
    />
  );
}
