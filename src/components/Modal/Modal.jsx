import React, { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  handleKeyPress = e => {
    if (e.code === 'Escape') {
      this.props.handleCloceModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.handleCloceModal();
    }
  };

  render() {
    const { modalData } = this.props;

    return (
      <div className={css.Overlay} onClick={this.handleOverlayClick}>
        <img className={css.Modal} src={modalData} alt="" />
      </div>
    );
  }
}
