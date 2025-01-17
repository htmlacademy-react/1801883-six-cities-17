const MAX_IMAGES_NUMBER = 6;

type GalleryProps = {
  images: string[];
}


export default function Gallery({images}: GalleryProps): JSX.Element {
  const trimmedImages = [...images].slice(0, MAX_IMAGES_NUMBER);

  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {trimmedImages.map((image) => (
          <div key={image} className="offer__image-wrapper">
            <img
              className="offer__image"
              src={ image }
              alt="Photo studio"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
