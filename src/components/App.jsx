import { Component } from 'react';
import { requestImgsByQuery } from '../servises/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { STATUSES } from 'utils/constants';
import { ErrorMessage } from './error/error';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    status: STATUSES.idle,
    error: null,
    searchTerm: '',
    page: 1,
    modalData: null,
    totalImages: null,
  };

  fetchImgsByQuery = async (searchTerm, page) => {
    try {
      this.setState({ status: STATUSES.pending });

      const { hits, total } = await requestImgsByQuery(searchTerm, page);

      if (hits.length === 0) {
        this.setState({
          status: STATUSES.error,
          error: (
            <>
              There are no images matching your request.
              <br />
              Please change your request.
            </>
          ),
        });
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          status: STATUSES.success,
          totalImages: total,
        }));
      }
    } catch (error) {
      this.setState({ status: STATUSES.error, error: error.message });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchTerm !== this.state.searchTerm ||
      prevState.page !== this.state.page
    ) {
      this.fetchImgsByQuery(this.state.searchTerm, this.state.page);
    }
  }

  handleSearch = (searchTerm, page) => {
    this.setState({ searchTerm, page: 1, images: [] });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleTakeLargeImage = largeImageUrl => {
    this.setState({ modalData: largeImageUrl });
  };

  handleCloceModal = () => {
    this.setState({ modalData: null });
  };

  render() {
    const { status, images, error, modalData } = this.state;
    return (
      <div>
        <Searchbar onSearch={this.handleSearch} />
        {status === STATUSES.pending && <Loader />}
        {status === STATUSES.error && <ErrorMessage error={error} />}
        {images.length > 0 && (
          <div>
            <ImageGallery
              images={images}
              handleTakeLargeImage={this.handleTakeLargeImage}
            />
            {status === STATUSES.success &&
              images.length !== this.state.totalImages && (
                <Button onClick={this.handleLoadMore} />
              )}

            {modalData && (
              <Modal
                modalData={modalData}
                handleCloceModal={this.handleCloceModal}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}
