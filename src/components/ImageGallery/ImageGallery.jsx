import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, handleTakeLargeImage }) => {
  return (
    <div>
      {Array.isArray(images) && images.length === 0 && <p>Sorry, no images!</p>}
      <ul className={css.ImageGallery}>
        {images &&
          Array.isArray(images) &&
          images.map(image => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              handleTakeLargeImage={handleTakeLargeImage}
            />
          ))}
      </ul>
    </div>
  );
};
