import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, handleTakeLargeImage }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => handleTakeLargeImage(image.largeImageURL)}
      />
    </li>
  );
};
