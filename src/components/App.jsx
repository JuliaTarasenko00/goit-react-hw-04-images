import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SearchBar } from './Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import Api from './Api';
import { Loader } from 'components/Loader/Loader';
import { Modal } from './Modal/Modal';
import { ImageGallery } from './ImageGallery/ImageGallery';

import css from './App.module.css';

export const App = () => {
  const [name, setName] = useState('');
  const [img, setImg] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({
    isOpen: false,
    imgModal: null,
    tags: '',
  });

  useEffect(() => {
    if (!name) {
      return;
    }

    setIsLoading(true);
    Api.images(name, page)
      .then(images => {
        if (images.hits.length === 0) {
          setIsLoading(false);
          toast.error(
            `Oops😳...Your ${name} was not found. You need to make a new request🥰`
          );
          return;
        }
        page === 1 &&
          toast.success(`Wow found ${images.totalHits} pictures `, {
            position: 'top-right',
          });

        setImg(prevState => {
          return page === 1 ? images.hits : [...prevState, ...images.hits];
        });
        setTotalPages(Math.floor(images.totalHits / 12));
        setIsLoading(false);
      })
      .catch(error => setError(error.message));
  }, [name, page]);

  const onSubmit = name => {
    setName(name);
    setPage(1);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const onClickModalOpen = (img, tags) => {
    setModal({ isOpen: true, imgModal: img, tags });
  };

  const onClickModalCloys = () => {
    setModal({ isOpen: false, imgModal: null, tags: '' });
  };

  const clickBtn = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={onSubmit} />
      {img.length === 0 && (
        <h1 className={css.title}>
          Your pictures will be here if you enter the data in the form 🥰
        </h1>
      )}
      {modal.isOpen && (
        <Modal
          onCloys={onClickModalCloys}
          imgModal={modal.imgModal}
          modalTags={modal.tags}
        />
      )}
      {error && (
        <p className={css.title}>
          Oops, some error. Please, try again later. Error: {error}
        </p>
      )}
      <ImageGallery openModal={onClickModalOpen} items={img} />
      <Button
        onClick={clickBtn}
        img={img}
        totalPages={totalPages}
        page={page}
      />
      <Loader isLoading={isLoading} />
      <ToastContainer position="top-center" theme="colored" />
    </div>
  );
};
