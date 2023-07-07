import { useState } from 'react';
import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

export const SearchBar = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const onChangeInput = event => {
    setName(event.target.value.toLowerCase());
  };

  const submitForm = ev => {
    ev.preventDefault();
    onSubmit(name);
    setName('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={submitForm}>
        <button type={css.submit} className={css.button}>
          <span className={css.button_label}>Search</span>
        </button>

        <input
          onChange={onChangeInput}
          name="name"
          value={name}
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
