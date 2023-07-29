import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import styles from './App.module.css';

const API_KEY = '37181386-1c0d920a7929ae22641c44c4d';
const BASE_URL = 'https://pixabay.com/api/';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    selectedImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  handleFormSubmit = query => {
    this.setState({ searchQuery: query, page: 1, images: [] });
  };

  fetchImages = () => {
    const { searchQuery, page } = this.state;
    const url = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    this.setState({ isLoading: true });

    axios
      .get(url)
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          page: prevState.page + 1,
        }));
      })
      .catch(error => console.error('Error fetching images:', error))
      .finally(() => this.setState({ isLoading: false }));
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  handleImageClick = imageUrl => {
    this.setState({ selectedImage: imageUrl });
    this.toggleModal();
  };

  render() {
    const { images, isLoading, showModal, selectedImage } = this.state;
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={this.handleImageClick} />
        )}
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.fetchImages} />
        )}
        {showModal && (
          <Modal
            open={showModal}
            imageSrc={selectedImage}
            alt=""
            largeImageUrl={selectedImage}
            onClose={this.toggleModal}
          />
        )}
      </div>
    );
  }
}

export default App;
