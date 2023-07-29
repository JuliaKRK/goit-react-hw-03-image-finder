import React from 'react';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ imageUrl, onImageClick, largeImageUrl, alt }) => {
  const handleClick = () => {
    onImageClick(largeImageUrl);
  };

  return (
    <li className={styles.galleryItem}>
      <img
        src={imageUrl}
        alt={alt}
        onClick={handleClick}
        className={styles.galleryImage}
      />
    </li>
  );
};

export default ImageGalleryItem;
