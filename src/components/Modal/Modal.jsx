import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { open, imageSrc, alt } = this.props;

    if (!open) {
      return null;
    }

    return createPortal(
      <div className={styles.overlay} onClick={this.handleOverlayClick}>
        <div className={styles.modal}>
          <img src={imageSrc} alt={alt} />
        </div>
      </div>,
      document.getElementById('modal-root')
    );
  }
}

export default Modal;
