import React, { useState, useEffect } from 'react';
import { requestImgsByQuery } from '../servises/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { STATUSES } from 'utils/constants';
import { ErrorMessage } from './error/error';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(STATUSES.idle);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [modalData, setModalData] = useState(null);
  const [totalImages, setTotalImages] = useState(null);

  useEffect(() => {
    if (!searchTerm) return;

    const fetchImgsByQuery = async () => {
      try {
        setStatus(STATUSES.pending);
        const { hits, total } = await requestImgsByQuery(searchTerm, page);

        if (hits.length === 0) {
          setError(
            STATUSES.error,
            new Error(
              'There are no images matching your request. Please change your request.'
            )
          );
          return;
        }
        setImages(prevImages => [...prevImages, ...hits]);
        setStatus(STATUSES.success);
        setTotalImages(total);
      } catch (error) {
        setError(STATUSES.error, new Error(error.message));
      }
    };
    fetchImgsByQuery();
  }, [searchTerm, page]);

  const handleSearch = (searchTerm, page) => {
    setSearchTerm(searchTerm);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleTakeLargeImage = largeImageUrl => {
    setModalData(largeImageUrl);
  };

  const handleCloseModal = () => {
    setModalData(null);
  };

  return (
    <div>
      <Searchbar onSearch={handleSearch} />
      {status === STATUSES.pending && <Loader />}
      {status === STATUSES.error && <ErrorMessage error={error} />}
      {images.length > 0 && (
        <div>
          <ImageGallery
            images={images}
            handleTakeLargeImage={handleTakeLargeImage}
          />
          {status === STATUSES.success && images.length !== totalImages && (
            <Button onClick={handleLoadMore} />
          )}

          {modalData && (
            <Modal modalData={modalData} handleCloseModal={handleCloseModal} />
          )}
        </div>
      )}
    </div>
  );
};
