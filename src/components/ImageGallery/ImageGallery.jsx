import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={styles.gallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          imageUrl={webformatURL}
          largeImageUrl={largeImageURL}
          alt={tags}
          onImageClick={() => onImageClick(largeImageURL)}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
